import {createContext, createSignal, onMount} from "solid-js";
import axios from "axios";

const UserDataContext = createContext();

export default UserDataContext;

const UserDataProvider = (props: any) => {
    const [user_data, set_user_data] = createSignal({})

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

    let context_data = {
        user_data: user_data,
        set_user_data: set_user_data,
        logout: logout,
        refresh_token: refresh_token,
    }

    // gets user data on mount, and refreshes the token every 4 minutes
    onMount(() => {
        refresh_token().finally()

        setInterval(() => {
            refresh_token().finally()
        }, 4 * 60 * 1000)
    })

    return (
        <UserDataContext.Provider value={context_data}>
            {props.children}
        </UserDataContext.Provider>
    )
}

export {UserDataProvider}