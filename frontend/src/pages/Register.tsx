import {createEffect, createSignal, onMount, useContext} from "solid-js";
import Sidebar from "../components/Sidebar.tsx";
import axios from "axios";
import gsap from "gsap"
import UserDataContext from "../util/Context.tsx";

const Register = () => {
    const [username, setUsername] = createSignal("");
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [api_response, set_api_response] = createSignal("")
    const context: any = useContext(UserDataContext)


    onMount(() => document.title = "Register")

    // side effect, runs whenever user_data() is changed
    createEffect(() => {
        if (context.user_data()) {
            location.assign("/")
        }
    })

    // logs the user in and gets the token
    const register = async (event: any) => {
        event.preventDefault()
        try {
            const response = await axios({
                method: "POST",
                url: "/api/account/",
                data: {
                    "username": username(),
                    "email": email(),
                    "password": password()
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })

            set_api_response(response.data)
        } catch (error: any) {
            if (error.response.data.detail) {
                console.log(error.response.data.detail)
                set_api_response(error.response.data.detail)
            } else {
                set_api_response(error.response.data)
            }
        }
    }

    const animate_button_fill = (bg_selector: any, text_selector: any, mouse_enter: boolean)=> {
        const timeline = gsap.timeline({defaults: {duration: .1, ease: "power1.out"}})
        timeline.to(text_selector, {
            color: mouse_enter ? "#2f374b" : "#cfd5dd"
        })
        timeline.to(bg_selector, {
            transformOrigin: "left center",
            width: mouse_enter ? "100%" : "0%"
        })
    }

    const animate_field_onhover = (field: any, selector: any, mouse_in_field: boolean) => {
        gsap.to(selector, {
            // if the username isn't blank (typing) or the mouse if in the field
            // animate to up position, otherwise animate to down position
            scale: field() !== "" || mouse_in_field ? .8 : 1,
            y: field() !== "" || mouse_in_field ? "-60%" : "0%",
            opacity: field() !== "" || mouse_in_field ? .7 : 1,
            ease: "power1.out",
            transformOrigin: "top left",
            duration: .1
        })
    }

    // updates the value and runs the field animation (for if cursor isn't in the field when typing)
    const update_text = (event: any, update_field: any, field: any, ref: any) => {
        update_field(event.target.value)
        animate_field_onhover(field, ref, false)
    }

    return (
        <>
            <Sidebar/>
            <div class="w-full min-h-screen bg-dark flex items-center">
                <div class="flex flex-col items-center w-full text-light font-[Newsreader]">
                    <form onsubmit={register}
                          class="w-fit mt-[1rem] text-2xl text-light p-4 py-5 space-y-[1.5rem] shadow-lg bg-black/10 rounded-lg flex flex-col items-center">
                        <h1 class="text-4xl text-center">Register</h1>
                        <div class="relative flex border-b-2 border-light"
                             onmouseenter={() => animate_field_onhover(username, ".username", true)}
                             onmouseleave={() => animate_field_onhover(username, ".username", false)}
                        >
                            <h1 class="username absolute pl-1 z-10">Username</h1>
                            <input class="outline-none pl-1"
                                   oninput={(event) => update_text(event, setUsername, username, ".username")}
                                   type="text" value={username()}/>
                        </div>

                        <div class="relative flex border-b-2 border-light"
                             onmouseenter={() => animate_field_onhover(email, ".email", true)}
                             onmouseleave={() => animate_field_onhover(email, ".email", false)}
                        >
                            <h1 class="email absolute pl-1 z-10">Email</h1>
                            <input class="outline-none pl-1"
                                   oninput={(event) => update_text(event, setEmail, email, ".email")}
                                   type="email" value={email()}/>
                        </div>

                        <div class="relative flex border-b-2 border-light"
                             onmouseenter={() => animate_field_onhover(password, ".password", true)}
                             onmouseleave={() => animate_field_onhover(password, ".password", false)}
                        >
                            <h1 class="password absolute pl-1 z-10">Password</h1>
                            <input class="outline-none pl-1"
                                   oninput={(event) => update_text(event, setPassword, password, ".password")}
                                   type="password" value={password()}/>
                        </div>
                        <button class="relative w-fit h-fit border-2 border-light rounded-lg p-1"
                                type={"submit"}
                                onmouseenter={() => animate_button_fill(".button-bg", ".button-text", true)}
                                onmouseleave={() => animate_button_fill(".button-bg", ".button-text", false)}
                        >
                            <h1 class="button-text relative z-10">Submit</h1>
                            <div class="button-bg rounded-sm absolute z-0 top-0 left-0 w-0 h-full bg-light"/>
                        </button>
                        <h1 class="text-xl">{api_response()}</h1>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register