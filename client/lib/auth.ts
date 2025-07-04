// Admin authentication utilities

export const isAdminAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;

  const isAuth = sessionStorage.getItem("adminAuthenticated");
  const loginTime = sessionStorage.getItem("adminLoginTime");

  if (!isAuth || !loginTime) return false;

  // Session expires after 2 hours
  const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
  const now = Date.now();
  const login = parseInt(loginTime);

  if (now - login > SESSION_DURATION) {
    // Session expired, clear storage
    sessionStorage.removeItem("adminAuthenticated");
    sessionStorage.removeItem("adminLoginTime");
    return false;
  }

  return isAuth === "true";
};

export const logoutAdmin = (): void => {
  if (typeof window === "undefined") return;

  sessionStorage.removeItem("adminAuthenticated");
  sessionStorage.removeItem("adminLoginTime");
};

export const getSessionTimeRemaining = (): number => {
  if (typeof window === "undefined") return 0;

  const loginTime = sessionStorage.getItem("adminLoginTime");
  if (!loginTime) return 0;

  const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours
  const now = Date.now();
  const login = parseInt(loginTime);
  const remaining = SESSION_DURATION - (now - login);

  return Math.max(0, remaining);
};
