import { getUserId } from "./utils";
const BASE_URL = "http://localhost:3000/"

export const API = {
    USER_LOGIN: BASE_URL + "login",
    DOC_GENERATE: BASE_URL + "api/documents/generate",
    GET_CURRENT_CLASS: BASE_URL + `api/professor/currentClass?userId=${getUserId()}`
}