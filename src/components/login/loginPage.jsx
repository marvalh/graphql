import { useState } from 'react';
import { login } from '../../api/auth';
import './login.css';

export default function LoginPage({ onLoginSuccess }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const jwt = await login(identifier, password);
      onLoginSuccess(jwt);
    } catch (err) {
      setError(err.message || 'Invalid username/email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-header">
          <div className="login-brand">
            <span className="title">Welcome back</span>
          </div>
          <p className="sub">Sign in to view your profile</p>
        </div>

        <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-error" role="alert">
              {error}
            </div>
          )}

          <div className="field">
            <label htmlFor="identifier" className="field-label">Username / email</label>
            <input
              type="text"
              id="identifier"
              className="field-input"
              placeholder="maralhoda or maralhoda@gmail.com"
              autoComplete="username"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="password" className="field-label">Password</label>
            <div className="field-input-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="field-input"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="field-toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.65 18.65 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <span className="btn-spinner">
                <svg className="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
                  <path d="M21 12a9 9 0 0 0-9-9" />
                </svg>
                &nbsp;Signing in...
              </span>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}