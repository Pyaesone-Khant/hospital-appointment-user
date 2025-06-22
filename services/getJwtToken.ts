import { COOKIE_MAX_AGE, COOKIE_TOKEN_NAME } from "@/constants";
import cookies from "js-cookie";

export const getJwtToken = () => {
    let jwt;

    const _setTokenToCookie = (jwtToken: string) => {
        cookies.set(COOKIE_TOKEN_NAME, jwtToken, {
            expires: COOKIE_MAX_AGE,
            path: "/"
        })
    }

    const removeJwtToken = () => {
        cookies.remove(COOKIE_TOKEN_NAME, {
            path: "/"
        })
    }

    if (cookies.get(COOKIE_TOKEN_NAME)) {
        const parsedJSON = JSON.parse(cookies.get(COOKIE_TOKEN_NAME) as string);

        if (parsedJSON === '{}'
            || parsedJSON === '[]'
            || parsedJSON === '""') {
            removeJwtToken();
        } else {
            jwt = parsedJSON;
        }
    }

    const setJwtToken = (jwtToken: string | JWT) => {
        switch (true) {
            case typeof jwtToken === 'object':
                _setTokenToCookie(JSON.stringify(jwtToken));
                break;
            case typeof jwtToken === 'string':
                _setTokenToCookie(jwtToken);
                break;
        }
    }

    return {
        jwt,
        setJwtToken,
        removeJwtToken
    }

}