export const loginAccount = (account) => {
    return {
        type: "LOGIN",
        payload: account
    }
};

export const logout = (account) => {
    return {
        type: "LOGOUT",
        payload: account
    }
}