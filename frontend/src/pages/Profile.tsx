import {useParams} from "@solidjs/router";
import Sidebar from "../components/Sidebar.tsx";
import gsap from "gsap";
import {createSignal, Match, onMount, Show, Switch, useContext} from "solid-js";
import clsx from "clsx";
import axios from "axios";
import lost from "../../assets/lost.jpg";
import UserDataContext from "../util/Context.tsx";

interface button_fill_params {
    start: boolean,
    bg_selector?: string,
    border_selector?: string,
    text_selector?: string,
    start_border?: string,
    end_border?: string,
    start_text?: string,
    end_text?: string
}

const Profile = () => {
    const params = useParams()
    const username = params.username
    const [show_prompt_signal, set_show_prompt_signal] = createSignal(false)
    const [user_found, set_user_found] = createSignal(true)
    const context: any = useContext(UserDataContext)

    // checks if an account under that username exists
    onMount(async () => {
        try {
            await axios({
                method: "GET",
                url: `/api/account/${username}`
            })
            document.title = `${username} Profile`
        } catch (error: any) {
            set_user_found(false)
            document.title = "Lost"
        }
    })

    const animate_button_fill = ({start, bg_selector, border_selector, text_selector, start_border, end_border, start_text, end_text}: button_fill_params) => {
        const timeline = gsap.timeline({defaults: {duration: .1, ease: "power1.out"}})
        if (bg_selector) {
            timeline.to(bg_selector, {
                transformOrigin: "left center",
                width: start ? "100%" : "0%"
            })
        }

        if (border_selector) {
            timeline.to(border_selector, {
                borderColor: start ? start_border : end_border
            })
        }

        if (text_selector) {
            timeline.to(text_selector, {
                color: start ? start_text : end_text
            })
        }
    }

    const show_prompt = (show: boolean) => {
        // unhides the element so you can see the opening animation
        if (show) {
            set_show_prompt_signal(show)
        }
        const timeline = gsap.timeline({
            defaults: {duration: .15, ease: "power1.out"},
            onComplete: () => {
                // hides the element after the closing animation has finished
                set_show_prompt_signal(show)
            }
        })
        timeline.fromTo(".bg_selector", {
            opacity: show ? "0%" : "100%"
        }, {
            opacity: show ? "100%" : "0%"
        }, show ? 0 : .1)
        timeline.fromTo(".prompt_selector", {
            opacity: show ? "0%" : "100%"
        }, {
            opacity: show ? "100%" : "0%"
        }, show ? .1 : 0)
    }

    const delete_account = async () => {
        const response = await axios({
            method: "DELETE",
            url: "/api/account/",
        })

        if (response.status == 200) {
            await context.logout()
        }
    }

    return (
        <>
            <Sidebar/>
            <Switch>
                <Match when={user_found()}>
                    <div class="max-w-screen min-h-screen">
                        <div class="relative w-full h-screen bg-dark text-xl font-[Newsreader] text-light p-4">
                            <div class="bg-black/10 shadow-lg rounded-lg p-4">
                                <h1 class="text-5xl">{username}</h1>
                                <hr class={"w-full border-1 text-light/50 my-4"}/>
                                <h1 class="text-xl">
                                    This is the profile page,
                                    <br/>
                                    there's nothing on here yet since this is a demo project.
                                </h1>
                                <Show when={context.user_data().username == username}>
                                    <hr class={"w-full border-1 text-light/50 my-4"}/>
                                    <h1 class="text-2xl">Email: {context.user_data().email}</h1>
                                    <h1 class="text-2xl">Roles: {context.user_data().roles.map((role: string, index: number)=> {
                                        // if last value, don't add comma
                                        if (index !== context.user_data().roles.length - 1) {
                                            return `${role}, `
                                        } else {
                                            return `${role}`
                                        }

                                    })}</h1>
                                    <button class="relative mt-4 p-1 border-rose-500 border-2 rounded w-fit overflow-hidden"
                                            onmouseenter={() => animate_button_fill({
                                                start: true,
                                                bg_selector: ".delete-bg"
                                            })}
                                            onmouseleave={() => animate_button_fill({
                                                start: false,
                                                bg_selector: ".delete-bg"
                                            })}
                                            onclick={() => show_prompt(true)}
                                    >
                                        <h1 class="relative z-10 font-medium">Delete Account</h1>
                                        <div class="delete-bg z-0 absolute top-0 left-0 h-full bg-rose-500"/>
                                    </button>
                                </Show>
                            </div>
                        </div>
                    </div>
                    <div class={clsx("fixed flex items-center justify-center top-0 left-0 w-screen h-screen z-10", {
                        "hidden": !show_prompt_signal(),
                    })}>
                        <div class="bg_selector fixed -z-10 w-full h-full backdrop-blur-xs"/>
                        <div
                            class={clsx("prompt_selector bg-black/10 rounded-lg shadow-lg shadow-black/30 font-[Newsreader] text-light p-4 w-fit", {
                                "hidden": !show_prompt_signal(),
                            })}>
                            <h1 class="text-3xl">Are you sure?</h1>
                            <hr class="borded-2 my-4 text-light/50"/>
                            <div class="flex justify-between space-x-2">
                                <button
                                    class="yes-border relative p-1 border-light border-2 rounded w-1/2 overflow-hidden"
                                    onmouseenter={() => animate_button_fill({
                                        start: true,
                                        border_selector: ".yes-border",
                                        bg_selector: ".yes-bg",
                                        start_border: "#376ab4",
                                        end_border: "#cfd5dd",
                                    })}
                                    onmouseleave={() => animate_button_fill({
                                        start: false,
                                        border_selector: ".yes-border",
                                        bg_selector: ".yes-bg",
                                        start_border: "#376ab4",
                                        end_border: "#cfd5dd",
                                    })}
                                    onclick={() => delete_account()}
                                >
                                    <h1 class="relative z-10 text-2xl font-medium">Yes</h1>
                                    <div class="yes-bg z-0 absolute top-0 left-0 h-full bg-primary"/>
                                </button>
                                <button
                                    class="no-border relative p-1 border-light border-2 rounded w-1/2 overflow-hidden"
                                    onmouseenter={() => animate_button_fill({
                                        start: true,
                                        border_selector: ".no-border",
                                        bg_selector: ".no-bg",
                                        start_border: "#376ab4",
                                        end_border: "#cfd5dd",
                                    })}
                                    onmouseleave={() => animate_button_fill({
                                        start: false,
                                        border_selector: ".no-border",
                                        bg_selector: ".no-bg",
                                        start_border: "#376ab4",
                                        end_border: "#cfd5dd",
                                    })}
                                    onclick={() => show_prompt(false)}
                                >
                                    <h1 class="relative z-10 text-2xl font-medium">No</h1>
                                    <div class="no-bg z-0 absolute top-0 left-0 h-full bg-primary"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </Match>
                <Match when={!user_found()}>
                    <div class="w-screen h-screen overflow-hidden items-center justify-center flex">
                        <div
                            class="fixed z-10 p-2 w-fit flex flex-col items-center justify-items-center text-dark font-[Newsreader] backdrop-blur-sm rounded-[2rem]">
                            <h1 class="text-[6rem]">
                                404
                            </h1>
                            <h1 class="text-[3rem]">
                                Not found
                            </h1>
                            <a class="text-[2rem] underline" href="/">
                                go back home
                            </a>
                        </div>
                        <img class="fixed min-h-screen min-w-screen md:bottom-0 object-fill" src={lost}
                             alt="lost image"/>
                    </div>
                </Match>
            </Switch>
        </>
    )
}

export default Profile