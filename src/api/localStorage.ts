// local storage
export const saveTokenLocalStorage = (token: string) => {
    localStorage.setItem("token", token);
};
export const loadTokenLocalStorage = () => {
    let tk = localStorage.getItem("token");
    if (tk === null) {
        tk = "";
    }
    return tk;
};
export const removeTokenLocalStorage = () => {
    localStorage.removeItem("token");
};