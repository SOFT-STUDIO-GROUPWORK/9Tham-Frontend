// Backend Port
export const BASE_URL = "https://localhost:7265";

// Authentication
export const LOGIN_URL = "api/Auth/login";
export const REGISTER_URL = "api/Auth/register";
export const USER_GETMYEMAIL_URL = "api/Auth"; // get my email to query

// User
export const USER_GETALL_URL = "api/Blogger"; // get all
export const USER_GET_PAGE_URL = "api/Blogger/:page/:perPage"; // get list
export const USER_SEARCH_PAGE_URL = "api/Blogger/:search/:page/:perPage"; // get list

export const USER_GETMYSELF_URL = "api/Blogger/myself"; // get
export const USER_GET_URL = "api/Blogger/:email";
export const USER_PATCH_URL = "api/Blogger/:email"; // put
export const USER_DELETE_URL = "api/Blogger/:email"; // delete
export const USER_CHANGEPASS_URL = "api/Blogger/changePassword"; // change Password

// Tags
export const TAGS_GET_URL = "api/Tags"; // get list
export const TAGS_GET_PAGE_URL = "api/Tags/:page/:perPage"; // get list
export const TAGS_SEARCH_PAGE_URL = "api/Tags/:search/:page/:perPage"; // get list

export const TAG_GET_URL = "api/Tags/:id"; // get
export const TAG_POST_URL = "api/Tags/"; // post
export const TAG_PUT_URL = "api/Tags/:id"; // put
export const TAG_DELETE_URL = "api/Tags/:id"; // delete

//Photo
export const FILE_POST_URL = "api/FileUpload/picture"
export const FILE_DELETE_URL = "api/FileUpload/picture"

//Articles
export const ARTICLES_GETALL_URL = "api/Articles"
export const ARTICLES_GET_PAGE_URL = "api/Articles/:page/:perPage"
export const ARTICLES_SEARCH_PAGE_URL = "api/Articles/:search/:page/:perPage"

export const ARTICLE_GET_URL = "api/Articles/:id"
export const ARTICLE_POST_URL = "api/Articles"
export const ARTICLE_PUT_URL = "api/Articles/:id"
export const ARTICLE_DELETE_URL = "api/Articles/:id"