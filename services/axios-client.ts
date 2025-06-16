import { BASE_URL } from "@/constants";
import axios from "axios";
import { createApi, setApiToken } from "./api";
import { getJwtToken } from "./getJwtToken";

export const axiosClient = axios.create({
    baseURL: BASE_URL
})

const { jwt } = getJwtToken();

if (jwt && "accessToken" in jwt) {
    setApiToken({
        apiInstance: axiosClient,
        token: jwt.accessToken
    })
}

export const CLIENT_API = createApi(axiosClient)