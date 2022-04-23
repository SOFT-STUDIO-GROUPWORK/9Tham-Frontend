// Backend Port
export const BASE_URL = "https://localhost:7265";

// Authentication
export const LOGIN_URL = "api/Auth/login";
export const REGISTER_URL = "api/Auth/register";
export const USER_GETMY_URL = "api/Blogger"; // get my info

// User
export const USER_GET_URL = "api/Blogger/:id"; // get
export const USER_PUT_URL = "api/Blogger/:id"; // put
export const USER_DELETE_URL = "api/Auth/:id"; // delete

// Tags
export const TAGS_GET_URL = "api/Tags"; // get list
export const TAG_POST_URL = "api/Tags/"; // post
export const TAG_GET_URL = "api/Tags/:id"; // get
export const TAG_PUT_URL = "api/Tags/:id"; // put
export const TAG_DELETE_URL = "api/Tags/:id"; // delete