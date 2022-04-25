import axios, { config } from "../api/axios";

import {
    USER_GETALL_URL,
    USER_GET_PAGE_URL,
    USER_SEARCH_PAGE_URL,
    REGISTER_URL,
    USER_GET_URL,
    USER_PATCH_URL,
    USER_DELETE_URL,

} from "../api/routes";
import IAccount from "../interfaces/IAccount";
import IPagination from "../interfaces/IPagination";

type getAccountsProps = {
    setIsLoading: any;
}
export const getAccounts = async ({ setIsLoading }: getAccountsProps) => {
    setIsLoading(true);
    let response = null;
    await axios
        .get(USER_GETALL_URL)
        .then((res) => {
            // console.log(res.data)
            response = res.data;

            // let result = res.data.map((obj: any) => {
            //     return ({
            //         id: obj.id,
            //         email: obj.email,
            //         firstName: obj.firstName,
            //         lastName: obj.lastName,
            //         nickName: obj.nickName,
            //         isBanned: obj.isBanned,
            //         role: obj.role,
            //         imageUrl: obj.imageUrl,
            //         bannerUrl: obj.bannerUrl
            //         // pic: obj.pic,
            //     })
            // });
        })
        .catch((err) => {
            console.error(`Accounts getAccounts(): ${err.status}:` + err);
        })
        .finally(() => {
            setIsLoading(false);
        });
    return response
};

type getPageAndSearchAccountsProps = {
    setIsLoading: any;
    setAccounts: any;
    pagination: IPagination;
    setPagination: any
}
export const getPageAccounts = async ({ setIsLoading, setAccounts, pagination, setPagination }: getPageAndSearchAccountsProps) => {
    setIsLoading(true);
    await axios
        .get(USER_GET_PAGE_URL.replace(":page", pagination.currentPage.toString()).replace(":perPage", pagination.perPage.toString()))
        .then(async (res) => {
            setAccounts(res.data.bloggers);
            setPagination((prev: IPagination) => (
                {
                    ...prev,
                    firstPage: res.data.firstPage,
                    lastPage: res.data.lastPage,
                    currentPage: res.data.currentPage,
                    currentTotal: res.data.bloggers.length
                })
            )
            await getAccounts({ setIsLoading }).then((res:any) => {
                setPagination((prev: IPagination) => (
                    {
                        ...prev,
                        total: res.length
                    })
                )
            }).catch((err) => {
                console.error(`Accounts getPageAccounts2(): ${err.status}:` + err);
            })
        })
        .catch((err) => {
            console.error(`Accounts getPageAccounts1(): ${err.status}:` + err);
        })
        .finally(() => {
            setIsLoading(false);
        });
};

export const getSearchAccounts = async ({ setIsLoading, setAccounts, pagination, setPagination }: getPageAndSearchAccountsProps) => {
    setIsLoading(true);
    await axios
        .get(USER_SEARCH_PAGE_URL
            .replace(":search", pagination.search.toString())
            .replace(":page", pagination.currentPage.toString())
            .replace(":perPage", pagination.perPage.toString()))
        .then(async (res) => {
            setAccounts(res.data.bloggers);
            setPagination((prev: IPagination) => (
                {
                    ...prev,
                    firstPage: res.data.firstPage,
                    lastPage: res.data.lastPage,
                    currentPage: res.data.currentPage,
                    currentTotal: res.data.bloggers.length
                })
            )
            await getAccounts(setIsLoading).then((res: any) => {
                setPagination((prev: IPagination) => (
                    {
                        ...prev,
                        total: res.length
                    })
                )
            }).catch((err) => {
                console.error(`Accounts getSearchAccounts2(): ${err.response.status}:` + err);
            })
        })
        .catch((err) => {
            console.error(`Accounts getSearchAccounts1(): ${err.response.status}:` + err);
        })
        .finally(() => {
            setIsLoading(false);
        });
};



type updateAccountProps = {
    setIsLoading: any;
    token: string;
    email: string;
    editFormData: IAccount;
}
export const updateAccount = async ({ token, setIsLoading, email, editFormData }: updateAccountProps) => {
    console.log("UpdateAccount Service!")
    console.log(editFormData)
    setIsLoading(true);
    let result = false;
    await axios
        .patch(USER_PATCH_URL.replace(":email", email), {
            email: editFormData.email,
            firstName: editFormData.firstName,
            lastName: editFormData.lastName,
            nickName: editFormData.firstName + " " + editFormData.lastName,
            role: editFormData.role,
            isBanned: editFormData.isBanned,
            imageUrl: editFormData.imageUrl,
            bannerUrl: editFormData.bannerUrl
        }, config(token))
        .then((res: any) => {
            if (res.status === 200) {
                console.log("update account complete!");
                result = true;
            }
        })
        .catch((err) => {
            console.error(`Accounts updateAccount(): ${err.response.status}:` + err);
            result = false;
        })
        .finally(() => {
            setIsLoading(false);
        });
    return result;
};

type deleteAccountProps = {
    setIsLoading: any;
    token: string;
    email: string;
}
export const deleteAccount = async ({ token, setIsLoading, email }: deleteAccountProps) => {
    setIsLoading(true);
    let result = false;
    await axios
        .delete(USER_DELETE_URL.replace(":email", email), config(token))
        .then((res: any) => {
            if (res.status === 200) {
                console.log("delete account complete!");
                result = true;
            }
        })
        .catch((err) => {
            console.error(`Accounts deleteAccount(): ${err.response.status}:` + err);
            result = false;
        })
        .finally(() => {
            setIsLoading(false);
        });
    return result;
};


// no need -> use register Page instead!

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