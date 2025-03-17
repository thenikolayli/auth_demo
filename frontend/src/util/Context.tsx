import {createContext, createSignal} from "solid-js";
import axios from "axios";
const UserDataContext = createContext();

export default UserDataContext;

const UserDataProvider = (props: any) => {
    const [user_data, set_user_data] = createSignal({})

    // refreshed jwt, logs out on invalidation
    const refresh_token = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: "/api/account/refresh_token",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            set_user_data(response.data)
        } catch (error: any) {
            // if the auth token is invalid, log the user out
            if (error.status === 401) {
                await logout()
            }
        }
    }

// sends request to delete auth cookie, clears user data
    const logout = async () => {
        if (Object.keys(user_data()).length > 0) {
            await axios({
                method: "DELETE",
                url: "/api/account/logout",
            })
            set_user_data({})
            location.assign("/login")
        }
    }

    let context_data = {
        user_data: user_data,
        set_user_data: set_user_data,
        refresh_token: refresh_token,
        logout: logout
    }

    return (
        <UserDataContext.Provider value={context_data}>
            {props.children}
        </UserDataContext.Provider>
    )
}

export {UserDataProvider}