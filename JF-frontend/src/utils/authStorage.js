export const saveAuth = (user) => {
    localStorage.setItem("auth", JSON.stringify(user));
};

export const getAuth = () => {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data) : null;
};

export const clearAuth = () => {
    localStorage.removeItem("auth");
};

