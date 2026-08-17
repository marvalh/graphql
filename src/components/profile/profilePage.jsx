import { useEffect, useState } from 'react';
import { runQuery } from '../../api/graphql';
import { GET_PROFILE } from '../../api/queries';
import logout from '../../api/auth';
import XPChart from '../charts/xpChart';
import AuditRatio from '../charts/auditRatio';
import Skills from '../charts/skills';
import './profile.css';

export default function ProfilePage({ onLogout }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    runQuery(GET_PROFILE)
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="field-error">{error}</p>;
  if (!data) return <p>Loading...</p>;

  const totalXP = data.xpTotal.aggregate.sum.amount ?? 0;
  const id = data.user[0].id;
  const fn = data.user[0].firstName;
  const ln = data.user[0].lastName;
  const u = data.user[0].login;
  const campus = data.user[0].campus;
  const eventWithCohort = data.user[0].events?.find(
    (e) => e.cohorts && e.cohorts.length > 0
  );
  const level = eventWithCohort?.level ?? 'N/A';
  const cohortName = eventWithCohort?.cohorts?.[0]?.labelName ?? 'N/A';
  const skillsData = [
    { skill: 'algo', value: data.algo[0]?.amount ?? 0 },
    { skill: 'back', value: data.backend[0]?.amount ?? 0 },
    { skill: 'front', value: data.frontend[0]?.amount ?? 0 },
    { skill: 'go', value: data.go[0]?.amount ?? 0 },
    { skill: 'html', value: data.html[0]?.amount ?? 0 },
    { skill: 'docker', value: data.docker[0]?.amount ?? 0 },
  ];

  const progresses = data.user[0].progresses;

  const latestByProject = new Map();
  progresses.forEach((p) => {
    const key = p.object.id;
    const existing = latestByProject.get(key);
    if (!existing || new Date(p.createdAt) > new Date(existing.createdAt)) {
      latestByProject.set(key, p);
    }
  });
  
  const auditsDone = data.auditsUp.aggregate.sum.amount ?? 0;
  const auditsReceived = data.auditsDown.aggregate.sum.amount ?? 0;
  const handleLogout = () => {
    logout();
    onLogout();
  };
  console.log('events:', data.user[0].events);
  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Good to see you alive, prisonerId# {id}</h1>
        <button onClick={handleLogout} id='logout'>Log out</button>
      </div>
      <div className="chart-glass-panel">
        <div className="glass">
          <div className="identity">
            <p>Name: {fn} {ln}</p>
            <p>Username: {u}</p>
            <p>Email: {data.user[0].email}</p>
            <p>Campus: {campus}</p>
            <p>Level: {level}</p>
            <p>Cohort: {cohortName}</p>
          </div>
        </div>
        <div className="chart-row">
          <XPChart history={data.xpHistory} />
          <AuditRatio auditsDone={auditsDone} auditsReceived={auditsReceived} />
        </div>
        <div className="chart-row-two">
          <Skills skills={skillsData} />
        </div>
      </div>
    </div>
  );
}
