import { COOKIE_MAX_AGE, COOKIE_USER_KEY } from "@/constants";
import cookies from "js-cookie";

export const getUserData = () => {
    let user;
    const _setUserToCookie = (user: string) => {
        cookies.set(COOKIE_USER_KEY, user, {
            expires: COOKIE_MAX_AGE,
            path: "/"
        })
    }

    const removeUser = () => {
        cookies.remove(COOKIE_USER_KEY, {
            path: "/"
        })
    }

    if (cookies.get(COOKIE_USER_KEY)) {
        const parsedJSON = JSON.parse(cookies.get(COOKIE_USER_KEY) as string);

        if (parsedJSON === '{}'
            || parsedJSON === '[]'
            || parsedJSON === '""') {
            removeUser();
        } else {
            user = parsedJSON;
        }
    }

    const setUser = (newUserData: string | User) => {
        switch (true) {
            case typeof newUserData === 'object':
                _setUserToCookie(JSON.stringify(newUserData));
                break;
            case typeof newUserData === 'string':
                _setUserToCookie(newUserData);
                break;
        }
    }

    return {
        user,
        setUser,
        removeUser
    }

}