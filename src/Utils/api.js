import { getUserId } from "./utils";
export const BASE_URL = process.env.REACT_APP_SERVER_API_URL

export const API = {
    USER_LOGIN: BASE_URL + "login",
    DOC_GENERATE: BASE_URL + "api/documents/generate",
    GET_CURRENT_CLASS: BASE_URL + `api/professor/currentClass?userId=${getUserId()}`
}