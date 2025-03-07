import {FiCircle} from "solid-icons/fi";
import {createSignal, Match, onMount, Switch, useContext} from "solid-js";
import UserDataContext from "../util/Context.tsx";
import gsap from "gsap";

const Sidebar = () => {
    let sidebar: any
    let animation: any
    const [showSidebar, setShowSidebar] = createSignal(false)
    const context: any = useContext(UserDataContext)

    onMount(async () => {
        animation = gsap.fromTo(sidebar,
            {x: "100%"},
            {x: "0%", duration: .5, ease: "power2.out", paused: true}
        )

        await context.refresh_token()
    })

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar())

        if (showSidebar()) {
            animation.play()
        } else {
            animation.reverse()
        }
    }

    return (
        <div class="relative z-10">
            <div onmouseenter={toggleSidebar} class="fixed right-0 p-4">
                <FiCircle class="stroke-primary stroke-2 size-8"/>
            </div>

            <div onmouseleave={toggleSidebar} ref={sidebar} class="fixed right-0 w-[18rem] h-[95%] drop-shadow-lg">
                <div
                    class="absolute z-10 pr-2 pt-4 right-0 bg-primary w-[13rem] h-full text-3xl font-[Newsreader] font-medium text-light">
                    <div class="border-b-2 border-light/40 pb-2"><a href={"/"} class={"text-3xl"}>Auth Demo Website</a></div>
                    <ul class={"mt-4 space-y-2"}>
                        <Switch>
                            <Match when={Object.keys(context.user_data()).length == 0}>
                                <li><a
                                    class={"underline decoration-light/0 hover:decoration-light transition duration-200"}
                                    href="/login">Login</a></li>
                                <li><a
                                    class={"underline decoration-light/0 hover:decoration-light transition duration-200"}
                                    href="/register">Register</a></li>
                            </Match>
                            <Match when={Object.keys(context.user_data()).length > 0}>
                                <li><button
                                    class={"underline decoration-light/0 hover:decoration-light transition duration-200"}
                                    onclick={context.logout}>Logout</button></li>
                                <li><a
                                    class={"underline decoration-light/0 hover:decoration-light transition duration-200"}
                                    href={`/${context.user_data().username}`}>{context.user_data().username}</a></li>
                            </Match>
                        </Switch>
                        <li><a class={"underline decoration-light/0 hover:decoration-light transition duration-200"}
                               href="/">Home</a></li>
                    </ul>
                </div>
                <div
                    class="absolute z-0 right-0 bg-primary origin-bottom-left scale-y-110 -rotate-[3deg] w-[13rem] h-full "></div>
            </div>
        </div>
    )
}

export default Sidebar