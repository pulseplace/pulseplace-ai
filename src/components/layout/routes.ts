
export const ROUTES = {
  HOME: '/',
  DASHBOARD: {
    INDEX: '/',
    QA_SPRINT: '/dashboard/qa-sprint',
    QA_TESTING: '/dashboard/qa-testing',
    DASHBOARD_QA: '/dashboard/dashboard-qa'
  },
  INSIGHTS: {
    INDEX: '/insights'
  },
  TEAMS: {
    INDEX: '/teams',
    TEAM: (id: string) => `/teams/${id}`
  },
  PULSEBOT: '/pulsebot',
  BOOK_DEMO: '/book-demo'
};
