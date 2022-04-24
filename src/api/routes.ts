// Backend Port
export const BASE_URL = "https://localhost:7265";

// Authentication
export const LOGIN_URL = "api/Auth/login";
export const REGISTER_URL = "api/Auth/register";
export const USER_GETMYEMAIL_URL = "api/Auth"; // get my email to query

// User
export const USER_GETALL_URL = "api/Blogger"; // get all
export const USER_GET_URL = "api/Blogger/:email";
export const USER_GETMYSELF_URL = "api/Blogger/myself"; // get
export const USER_PUT_URL = "api/Blogger/:email"; // put
export const USER_DELETE_URL = "api/Blogger/:email"; // delete
export const USER_CHANGEPASS_URL = "api/Blogger/changePassword"; // change Password

// Tags
export const TAGS_GET_URL = "api/Tags"; // get list
export const TAG_POST_URL = "api/Tags/"; // post
export const TAG_GET_URL = "api/Tags/:id"; // get
export const TAG_PUT_URL = "api/Tags/:id"; // put
export const TAG_DELETE_URL = "api/Tags/:id"; // delete
