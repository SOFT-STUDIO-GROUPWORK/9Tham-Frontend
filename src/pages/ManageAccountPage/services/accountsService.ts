import axios, { config } from "../../../api/axios";

import {
    REGISTER_URL,
    USER_GETALL_URL,
    USER_GET_URL,
    USER_PUT_URL,
    USER_DELETE_URL,
} from "../../../api/routes";
import { IAccount } from "../ManageAccountPage";

type getTagsProps = {
    setIsLoading: any;
    token: string;
    setAccounts: any;
}
export const getAccounts = async ({ token, setIsLoading, setAccounts }: getTagsProps) => {
    setIsLoading(true);
    await axios
        .get(USER_GETALL_URL, config(token))
        .then((res) => {
            console.log(res.data)

            let result = res.data.map((obj:any) => {
                return ({
                    id: obj.id,
                    username: obj.email,
                    name: obj.firstName,
                    surname: obj.lastName,
                    nickName: obj.nickName,
                    isBanned: obj.isBanned,
                    role: obj.role,
                    // pic: obj.pic,
                })
            });

            setAccounts(result);
        })
        .catch((err) => {
            console.error(`ManagementAccount getTags(): ${err.response.status}:` + err);
        })
        .finally(() => {
            setIsLoading(false);
        });
};

// type addTagProps = {
//     setIsLoading: any;
//     token: string;
//     addFormData: IAccount
// }
// export const addAccount = async ({ token, setIsLoading, addFormData }: addTagProps) => {
//     setIsLoading(true);
//     let result: any;
//     await axios
//         .post(REGISTER_URL, {
//             firstName: addFormData.name,
//             lastName: addFormData.surname,
//             nickName: addFormData.nickname,
//             email: addFormData.username,
//             role: 0,
//             isBanned: false,
//         }, config(token))
//         .then((res: any) => {
//             if (res.status === 201) {
//                 console.log("add tag complete!");
//                 result = res.data
//             }
//         })
//         .catch((err) => {
//             console.error(`ManagementAccount addTag(): ${err.response.status}:` + err);
//             result = null;
//         })
//         .finally(() => {
//             setIsLoading(false);
//         });
//     return result;
// };

type updateTagProps = {
    setIsLoading: any;
    token: string;
    editAccountId: number;
    editFormData: IAccount;
}
export const updateAccount = async ({ token, setIsLoading, editAccountId, editFormData }: updateTagProps) => {
    setIsLoading(true);
    let result = false;
    await axios
        .put(USER_PUT_URL.replace(":email", editAccountId.toString()), {
            email: editFormData.username,
            firstName: editFormData.name,
            lastName: editFormData.surname,
            nickName: editFormData.name + " " + editFormData.surname,
            role: editFormData.role,
            isBanned: editFormData.isBanned,
            pic: editFormData.pic,
        }, config(token))
        .then((res: any) => {
            if (res.status === 200) {
                console.log("update account complete!");
                result = true;
            }
        })
        .catch((err) => {
            console.error(`ManagementAccount updateTag(): ${err.response.status}:` + err);
            result = false;
        })
        .finally(() => {
            setIsLoading(false);
        });
    return result;
};

type deleteTagProps = {
    setIsLoading: any;
    token: string;
    accountId: number
}
export const deleteAccount = async ({ token, setIsLoading, accountId }: deleteTagProps) => {
    setIsLoading(true);
    let result = false;
    await axios
        .delete(USER_DELETE_URL.replace(":email", accountId.toString()), config(token))
        .then((res: any) => {
            if (res.status === 200) {
                console.log("delete account complete!");
                result = true;
            }
        })
        .catch((err) => {
            console.error(`ManagementAccount deleteAccount(): ${err.response.status}:` + err);
            result = false;
        })
        .finally(() => {
            setIsLoading(false);
        });
    return result;
};