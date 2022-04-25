import axios, { config } from "../../../api/axios";
import {
    ARTICLES_GETALL_URL,
    ARTICLES_GET_PAGE_URL,
    ARTICLES_SEARCH_PAGE_URL,
    ARTICLE_GET_URL,
    ARTICLE_POST_URL,
    ARTICLE_PUT_URL,
    ARTICLE_DELETE_URL,
} from "../../../api/routes";
import IArticle from "../../../interfaces/IArticle";
import IPagination from "../../../interfaces/IPagination";


type getArticlesProps = {
    setIsLoading: any;
}
export const getArticles = async ({ setIsLoading }: getArticlesProps) => {
    setIsLoading(true);
    let response = null;
    await axios.get(ARTICLES_GETALL_URL).then((res) => {
        response = res.data;
    }).catch((err) => {
        console.error(`Articles getArticles(): ${err.status}:` + err);
    }).finally(() => {
        setIsLoading(false);
    });
    console.log(response)
    return response;
}


type getPageAndSearchArticlesProps = {
    setIsLoading: any;
    setArticles: any;
    pagination: IPagination;
    setPagination: any
}
export const getPageArticles = async ({ setIsLoading, setArticles, pagination, setPagination }: getPageAndSearchArticlesProps) => {
    setIsLoading(true);
    await axios
        .get(ARTICLES_GET_PAGE_URL
            .replace(":page", pagination.currentPage.toString())
            .replace(":perPage", pagination.perPage.toString()))
        .then(async (res) => {
            setArticles(res.data.articles);
            setPagination((prev: IPagination) => (
                {
                    ...prev,
                    firstPage: res.data.firstPage,
                    lastPage: res.data.lastPage,
                    currentPage: res.data.currentPage,
                    currentTotal: res.data.articles.length
                })
            )
            await getArticles({ setIsLoading }).then((res: any) => {
                setPagination((prev: IPagination) => (
                    {
                        ...prev,
                        total: res.length
                    })
                )
            }).catch((err) => {
                console.error(`Articles getPageArticles2(): ${err.status}:` + err);
            })
        })
        .catch((err) => {
            console.error(`Articles getPageArticles1(): ${err.status}:` + err);
        })
        .finally(() => {
            setIsLoading(false);
        });
};

export const getSearchArticles = async ({ setIsLoading, setArticles, pagination, setPagination }: getPageAndSearchArticlesProps) => {
    setIsLoading(true);
    await axios
        .get(ARTICLES_SEARCH_PAGE_URL
            .replace(":search", pagination.search.toString())
            .replace(":page", pagination.currentPage.toString())
            .replace(":perPage", pagination.perPage.toString()))
        .then(async (res) => {
            setArticles(res.data.articles);
            setPagination((prev: IPagination) => (
                {
                    ...prev,
                    firstPage: res.data.firstPage,
                    lastPage: res.data.lastPage,
                    currentPage: res.data.currentPage,
                    currentTotal: res.data.articles.length
                })
            )
            await getArticles(setIsLoading).then((res: any) => {
                setPagination((prev: IPagination) => (
                    {
                        ...prev,
                        total: res.length
                    })
                )
            }).catch((err) => {
                console.error(`Articles getSearchArticles2(): ${err.response.status}:` + err);
            })
        })
        .catch((err) => {
            console.error(`Articles getSearchArticles1(): ${err.response.status}:` + err);
        })
        .finally(() => {
            setIsLoading(false);
        });
};

type getArticleProps = {
    setIsLoading: any;
    articleId: number;
}
export const getArticle = async ({ setIsLoading, articleId }: getArticleProps) => {
    setIsLoading(true);
    let response = null;
    await axios.get(ARTICLE_GET_URL.replace(":id", articleId.toString()))
        .then((res) => {
            response = res.data;
        }).catch((err) => {
            console.error(`Articles getArticle(): ${err.status}:` + err);
        }).finally(() => {
            setIsLoading(false);
        });
    console.log(response)
    return response;
}



type addArticleProps = {
    setIsLoading: any;
    token: string;
    addFormData: IArticle
}
export const addArticle = async ({ token, setIsLoading, addFormData }: addArticleProps) => {
    setIsLoading(true);
    let result: any;
    await axios
        .post(ARTICLE_POST_URL, {
            bloggerId: addFormData.bloggerId,
            title: addFormData.title,
            description: addFormData.description,
            thumbnailUrl: addFormData.thumbnailUrl,
            content: addFormData.content,
            visible: addFormData.visible,
        }, config(token))
        .then((res: any) => {
            console.log("add article complete!");
            result = res.data
        })
        .catch((err) => {
            console.error(`Articles addArticle(): ${err.response.status}:` + err);
            result = null;
        })
        .finally(() => {
            setIsLoading(false);
        });

    console.log(result)
    return result;
};

type updateUpdateProps = {
    setIsLoading: any;
    token: string;
    editArticleId: number;
    editFormData: IArticle;
}
export const updateArticle = async ({ token, setIsLoading, editArticleId, editFormData }: updateUpdateProps) => {
    setIsLoading(true);
    let result = false;
    await axios
        .put(ARTICLE_PUT_URL.replace(":id", editArticleId.toString()), {
            bloggerId: editFormData.bloggerId,
            title: editFormData.title,
            description: editFormData.description,
            thumbnailUrl: editFormData.thumbnailUrl,
            content: editFormData.content,
            visible: editFormData.visible,
        }, config(token))
        .then((res: any) => {
            console.log("update article complete!");
            result = true;
        })
        .catch((err) => {
            console.error(`Articles updateArticle(): ${err.response.status}:` + err);
            result = false;
        })
        .finally(() => {
            setIsLoading(false);
        });
    return result;
};


type deleteArticleProps = {
    setIsLoading: any;
    token: string;
    articleId: number
}
export const deleteArticle = async ({ token, setIsLoading, articleId }: deleteArticleProps) => {
    setIsLoading(true);
    let result = false;
    await axios
        .delete(ARTICLE_DELETE_URL.replace(":id", articleId.toString()), config(token))
        .then((res: any) => {
            if (res.status === 200) {
                console.log("delete article complete!");
                result = true;
            }
        })
        .catch((err) => {
            console.error(`Articles deleteArticle(): ${err.response.status}:` + err);
            result = false;
        })
        .finally(() => {
            setIsLoading(false);
        });
    return result;
};