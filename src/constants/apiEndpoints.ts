export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: 'auth/sign-in',
    SIGN_UP: 'auth/sign-up',
    ME: 'users/me',
    SIGN_OUT: 'auth/sign-out',
    UPDATE_PASSWORD: 'auth/update-password',
  },
  USERS: {
    UPDATE_AVATAR: 'users/me/avatar',
    UPDATE_PROFILE: 'users/me/profile',
  },
  SCAN_HISTORY: {
    GET_ALL: 'scan-history',
    CREATE: 'scan-history',
    GET_BY_ID: 'scan-history/:id'
  },
  ECO_POINTS: {
    GET_STREAK: 'eco-points/streak',
    UPDATE: 'eco-points',
  },
  DAILY_TASKS: {
    GET_ALL: 'daily-tasks',
    GET_BY_ID: 'daily-tasks/:id',
    CREATE: 'daily-tasks',
    UPDATE: 'daily-tasks/:id',
    DELETE: 'daily-tasks/:id',
  },

  WASTE_CATEGORIES: {
    GET_ALL: 'waste-categories',
    GET_BY_ID: 'waste-categories/:id',
    CREATE: 'waste-categories',
    UPDATE: 'waste-categories/:id',
    DELETE: 'waste-categories/:id',
  },
  FAQS: {
    GET_PUBLIC: 'faqs/public',
    GET_CREATOR: 'faqs/creator',
    CREATE: 'faqs',
    UPDATE: 'faqs/:id',
    DELETE: 'faqs/:id',
  },

  ADMIN: {
    GET_FAQS: 'faqs/creator',
    GET_DAILY_TASKS: 'daily-tasks',
    GET_SCAN_HISTORY: 'scan-history',
    GET_ECO_POINTS: 'eco-points/streak',
    GET_USERS: 'users',
    DELETE_USER: 'users/:id', // blm ada
  }
} as const;
