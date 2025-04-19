
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
  CERTIFICATION: {
    INDEX: '/certification',
    SHARE: '/certification/share',
    VERIFY: '/certification/verify',
    MANAGE: '/dashboard/certification-engine'
  },
  PULSEBOT: '/pulsebot',
  BOOK_DEMO: '/book-demo'
};
