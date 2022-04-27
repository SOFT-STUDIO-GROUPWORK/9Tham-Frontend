// local storage
export const saveLocalStorage = (token: string, isAuth: boolean, role: number) => {
    saveTokenLocalStorage(token);
    saveIsAuthLocalStorage(isAuth);
    saveRoleLocalStorage(role);
}

type ILoadLocalStorage = {
    token: string,
    isAuth: boolean,
    role: number,
}
export const loadLocalStorage = (): ILoadLocalStorage => {
    let result: ILoadLocalStorage
    result = {
        token: loadTokenLocalStorage(),
        isAuth: loadIsAuthLocalStorage(),
        role: loadRoleLocalStorage(),
    }
    return result;
}

export const removeLocalStorage = () => {
    removeTokenLocalStorage()
    removeIsAuthLocalStorage()
    removeRoleLocalStorage()
}

// token
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
const removeTokenLocalStorage = () => {
    localStorage.removeItem("token");
};

// isAuth
export const saveIsAuthLocalStorage = (isAuth: boolean) => {
    localStorage.setItem("isAuth", JSON.stringify(isAuth));
};
const loadIsAuthLocalStorage = (): boolean => {
    let isAuth = localStorage.getItem("isAuth");
    let result = false;
    if (isAuth !== null) {
        result = JSON.parse(isAuth)
    }
    return result;
};
const removeIsAuthLocalStorage = () => {
    localStorage.removeItem("isAuth");
};

// role
export const saveRoleLocalStorage = (role: number) => {
    localStorage.setItem("role", JSON.stringify(role));
};
const loadRoleLocalStorage = (): number => {
    let role = localStorage.getItem("role");
    let result = 0;
    if (role !== null) {
        result = JSON.parse(role)
    }
    return result;
};
const removeRoleLocalStorage = () => {
    localStorage.removeItem("role");
};