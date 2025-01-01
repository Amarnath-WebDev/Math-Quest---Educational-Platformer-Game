const USER_KEY = 'mathquest_user';

export const saveUsername = (username: string): void => {
  localStorage.setItem(USER_KEY, username);
};

export const getUsername = (): string | null => {
  return localStorage.getItem(USER_KEY);
};

export const clearUsername = (): void => {
  localStorage.removeItem(USER_KEY);
};