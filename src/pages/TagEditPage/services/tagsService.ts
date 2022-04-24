import axios, { config } from "../../../api/axios";

import { IPagination } from "../TagEditPage"

import {
    TAGS_GET_URL,
    TAG_POST_URL,
    TAG_PUT_URL,
    TAG_DELETE_URL,
    TAGS_GET_PAGE_URL,
    TAGS_SEARCH_PAGE_URL,
} from "../../../api/routes";

type getTagsProps = {
    setIsLoading: any;
    token: string;
    setTags: any;
    pagination: IPagination;
    setPagination: any
}
export const getTags = async ({ token, setIsLoading, setTags, pagination, setPagination }: getTagsProps) => {
    setIsLoading(true);
    await axios
        .get(TAGS_GET_PAGE_URL.replace(":page", pagination.currentPage.toString()).replace(":perPage", pagination.perPage.toString()), config(token))
        .then(async (res) => {
            setTags(res.data.tags);
            setPagination((prev: IPagination) => (
                {
                    ...prev,
                    firstPage: res.data.firstPage,
                    lastPage: res.data.lastPage,
                    currentPage: res.data.currentPage,
                    currentTotal: res.data.tags.length
                })
            )
            await axios.get(TAGS_GET_URL, config(token)).then((res) => {
                setPagination((prev: IPagination) => (
                    {
                        ...prev,
                        total: res.data.length
                    })
                )
            }).catch((err) => {
                console.error(`Tags getTags2(): ${err.response.status}:` + err);
            })
        })
        .catch((err) => {
            console.error(`Tags getTags1(): ${err.response.status}:` + err);
        })
        .finally(() => {
            setIsLoading(false);
        });
};

export const getSearchTags = async ({ token, setIsLoading, setTags, pagination, setPagination }: getTagsProps) => {
    setIsLoading(true);
    await axios
        .get(TAGS_SEARCH_PAGE_URL
            .replace(":search", pagination.search.toString())
            .replace(":page", pagination.currentPage.toString())
            .replace(":perPage", pagination.perPage.toString()), config(token))
        .then(async (res) => {
            setTags(res.data.tags);
            setPagination((prev: IPagination) => (
                {
                    ...prev,
                    firstPage: res.data.firstPage,
                    lastPage: res.data.lastPage,
                    currentPage: res.data.currentPage,
                    currentTotal: res.data.tags.length
                })
            )
            await axios.get(TAGS_GET_URL, config(token)).then((res) => {
                setPagination((prev: IPagination) => (
                    {
                        ...prev,
                        total: res.data.length
                    })
                )
            }).catch((err) => {
                console.error(`Tags getSearchTags2(): ${err.response.status}:` + err);
            })
        })
        .catch((err) => {
            console.error(`Tags getSearchTags1(): ${err.response.status}:` + err);
        })
        .finally(() => {
            setIsLoading(false);
        });
};

type addTagProps = {
    setIsLoading: any;
    token: string;
    addFormData: {
        name: string
    }
}
export const addTag = async ({ token, setIsLoading, addFormData }: addTagProps) => {
    setIsLoading(true);
    let result: any;
    await axios
        .post(TAG_POST_URL, { name: addFormData.name }, config(token))
        .then((res: any) => {
            if (res.status === 201) {
                console.log("add tag complete!");
                result = res.data
            }
        })
        .catch((err) => {
            console.error(`Tags addTag(): ${err.response.status}:` + err);
            result = null;
        })
        .finally(() => {
            setIsLoading(false);
        });
    return result;
};

type updateTagProps = {
    setIsLoading: any;
    token: string;
    editTagId: number;
    newName: string;
}
export const updateTag = async ({ token, setIsLoading, editTagId, newName }: updateTagProps) => {
    setIsLoading(true);
    let result = false;
    await axios
        .put(TAG_PUT_URL.replace(":id", editTagId.toString()), { name: newName }, config(token))
        .then((res: any) => {
            if (res.status === 200) {
                console.log("update tag complete!");
                result = true;
            }
        })
        .catch((err) => {
            console.error(`Tags updateTag(): ${err.response.status}:` + err);
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
    tagId: number
}
export const deleteTag = async ({ token, setIsLoading, tagId }: deleteTagProps) => {
    setIsLoading(true);
    let result = false;
    await axios
        .delete(TAG_DELETE_URL.replace(":id", tagId.toString()), config(token))
        .then((res: any) => {
            if (res.status === 200) {
                console.log("delete tag complete!");
                result = true;
            }
        })
        .catch((err) => {
            console.error(`Tags deleteTag(): ${err.response.status}:` + err);
            result = false;
        })
        .finally(() => {
            setIsLoading(false);
        });
    return result;
};