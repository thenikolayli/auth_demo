import {createSignal, onMount} from "solid-js";
import Sidebar from "../components/Sidebar.tsx";
import axios from "axios";
import gsap from "gsap"

const Login = () => {
    const [username, setUsername] = createSignal("");
    const [password, setPassword] = createSignal("");

    onMount(() => {
        document.title = "Login"
    })

    // logs the user in and gets the token
    const login = async (event: any) => {
        event.preventDefault()
        try {
            const response = await axios({
                method: "POST",
                url: "/api/account/login",
                data: {
                    "username": username(),
                    "password": password()
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })

            console.log(response.data)
        } catch (error: any) {
            console.log(error)
        }
    }

    const animate_button_fill = (event: any, bg_selector: any, text_selector: any, mouse_enter: boolean)=> {
        const timeline = gsap.timeline({defaults: {duration: .1, ease: "power1.out"}})
        timeline.to(text_selector, {
            color: mouse_enter ? "#2f374b" : "#cfd5dd"
        })
        timeline.to(bg_selector, {
            transformOrigin: "left center",
            width: mouse_enter ? "100%" : "0%"
        })
    }

    const animate_field_onhover = (event: any, field: any, selector: any, mouse_in_field: boolean) => {
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
        animate_field_onhover(event, field, ref, false)
    }

    return (
        <>
            <Sidebar/>
            <div class="w-full min-h-screen bg-dark flex items-center">
                <div class="flex flex-col items-center w-full text-light font-[Newsreader]">
                    <form onsubmit={login}
                          class="w-fit mt-[1rem] text-2xl text-light p-4 py-5 space-y-[1.5rem] shadow-lg bg-black/10 rounded-lg flex flex-col items-center">
                        <h1 class="text-4xl text-center">Login</h1>
                        <div class="relative flex border-b-2 border-light"
                             onmouseenter={(event) => animate_field_onhover(event, username, ".username", true)}
                             onmouseleave={(event) => animate_field_onhover(event, username, ".username", false)}
                        >
                            <h1 class="username absolute pl-1 z-10">Username</h1>
                            <input class="outline-none pl-1"
                                   oninput={(event) => update_text(event, setUsername, username, ".username")}
                                   type="text" value={username()}/>
                        </div>
                        <div class="relative flex border-b-2 border-light"
                             onmouseenter={(event) => animate_field_onhover(event, password, ".password", true)}
                             onmouseleave={(event) => animate_field_onhover(event, password, ".password", false)}
                        >
                            <h1 class="password absolute pl-1 z-10">Password</h1>
                            <input class="outline-none pl-1"
                                   oninput={(event) => update_text(event, setPassword, password, ".password")}
                                   type="password" value={password()}/>
                        </div>
                        <button class="relative w-fit h-fit border-2 border-light rounded-lg p-1"
                                onmouseenter={(event) => animate_button_fill(event, ".button-bg", ".button-text", true)}
                                onmouseleave={(event) => animate_button_fill(event, ".button-bg", ".button-text", false)}
                        >
                            <h1 class="button-text relative z-10">Submit</h1>
                            <div class="button-bg rounded-sm absolute z-0 top-0 left-0 w-0 h-full bg-light"/>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login