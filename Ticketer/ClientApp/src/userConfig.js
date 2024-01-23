let user = JSON.parse(localStorage.getItem('user')) || null;

export const setUser = (newUser) => {
    user = newUser;
    localStorage.setItem('user', JSON.stringify(newUser));
};

export const getUser = () => {
    return user;
};