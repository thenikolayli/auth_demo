import {onMount} from "solid-js";
import Sidebar from "../components/Sidebar.tsx";
import lost from "../../assets/lost.jpg";

const NotFound = () => {
    onMount(() => {
        document.title = "Lost"
    })

    return (
        <>
            <Sidebar/>
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
        </>
    )
}

export default NotFound;