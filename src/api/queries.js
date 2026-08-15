export const GET_PROFILE = `
{
  user {
    id
    login
    firstName
    lastName
    email
    campus
    createdAt
    discordId
    discordLogin
    githubId
    auditRatio
    auditsAssigned
    attrs
    profile

progresses(
  where: {
    grade: { _is_null: false }
    path: { _like: "%bh-module%" }
    object: { type: { _eq: "project" } }
  }
  order_by: { createdAt: desc }
) {
  grade
  path
  createdAt
  object {
    id
    type
    name
    results {
      id
      grade
      audits {
        id
        grade
        auditorLogin
      }
    }
  }
}

    events {
      level
      cohorts {
        id
        eventId
        labelId
        labelName
        userId
        createdAt
      }
    }
  }

 xpTotal: transaction_aggregate(
  where: {
    type: { _eq: "xp" }
    path: { _like: "%bh-module%", _nlike: "%piscine-js/%" }
  }
) {
  aggregate {
    sum { amount }
    count
  }
}
xpHistory: transaction(
  where: {
    type: { _eq: "xp" }
    path: { _like: "%bh-module%", _nlike: "%piscine-js/%" }
  }
  order_by: { createdAt: asc }
) {
  amount
  createdAt
  path
}

  auditsUp: transaction_aggregate(where: { type: { _eq: "up" } }) {
    aggregate {
      sum { amount }
    }
  }
  auditsDown: transaction_aggregate(where: { type: { _eq: "down" } }) {
    aggregate {
      sum { amount }
    }
  }

  # Skills (latest amount per skill type)
  algo: transaction(where: { type: { _eq: "skill_algo" } }, order_by: { createdAt: desc }, limit: 1) {
    amount
  }
  backend: transaction(where: { type: { _eq: "skill_back-end" } }, order_by: { createdAt: desc }, limit: 1) {
    amount
  }
  frontend: transaction(where: { type: { _eq: "skill_front-end" } }, order_by: { createdAt: desc }, limit: 1) {
    amount
  }
  go: transaction(where: { type: { _eq: "skill_go" } }, order_by: { createdAt: desc }, limit: 1) {
    amount
  }
  html: transaction(where: { type: { _eq: "skill_html" } }, order_by: { createdAt: desc }, limit: 1) {
    amount
  }
  docker: transaction(where: { type: { _eq: "skill_docker" } }, order_by: { createdAt: desc }, limit: 1) {
    amount
  }
}
`;