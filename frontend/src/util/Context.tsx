import {createContext, createEffect, createSignal} from "solid-js";
import axios from "axios";
const UserDataContext = createContext();

export default UserDataContext;

const UserDataProvider = (props: any) => {
    const [user_data, set_user_data] = createSignal<any>(null)
    const [data_loaded, set_data_loaded] = createSignal(false)

    createEffect(() => {
        set_data_loaded(user_data() !== null)
    })

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
            if (error.status === 404) { // invalid token
                await logout()
            } else { // not logged in
                set_user_data({})
            }
        }
    }

// sends request to delete auth cookie, clears user data
    const logout = async () => {
        if (user_data()) {
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
        logout: logout,
        data_loaded: data_loaded
    }

    return (
        <UserDataContext.Provider value={context_data}>
            {props.children}
        </UserDataContext.Provider>
    )
}

export {UserDataProvider}