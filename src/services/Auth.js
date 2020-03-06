export const TOKEN_KEY = 'APP_ADMIN_user/jwt';

export const isAuthenticated = () => {
    const token = localStorage.getItem(TOKEN_KEY);

    return token !== null;
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};