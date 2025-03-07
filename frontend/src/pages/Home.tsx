import Sidebar from "../components/Sidebar.tsx";
import homejpg from "../../assets/home.jpg";
import solidjs from "../../assets/solidjs.png"
import fastapi from "../../assets/fastapi.png"
import mongodb from "../../assets/mongodb.png"
import {onMount} from "solid-js";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

const Home = () => {
    onMount(() => {
        document.title = "Home"

        let y_offset = 0;
        if (window.innerWidth >= 1024) {
            y_offset = 40
        } else if (window.innerWidth >= 768) {
            y_offset = 30
        } else if (window.innerWidth >= 640) {
            y_offset = 20
        } else {
            y_offset = 0
        }


        gsap.fromTo(".home-image", {
            scale: 1.25,
            y: `-${y_offset}%`,
            transformOrigin: "center top"
        }, {
            scale: 1,
                scrollTrigger: {
                trigger: ".home-image",
                    start: `center center`,
                    end: "90% center",
                    scrub: true,
                    // markers: true
            }
        })
    })

    const icon_hover = (event: any, start: boolean) => {
        gsap.to(event.currentTarget, {
            scale: start ? 1.2 : 1,
            ease: "power1.out",
            duration: .1
        })
    }

    return (
        <>
            <Sidebar/>
            <div class="max-w-screen min-h-screen">
                <div class="relative w-full h-[1400px] overflow-hidden">
                    <h1 class="absolute p-1 z-10 top-[10rem] inset-x-0 mx-auto w-fit text-light font-[Newsreader] font-medium text-5xl drop-shadow-lg">
                        Auth Demo Website
                    </h1>
                    <img src={homejpg} alt="home jpg"
                         class="home-image w-full"/>
                </div>
                <div class="h-screen w-full p-4 bg-dark flex items-center">
                    <div class="w-full flex flex-col items-center font-[Newsreader] text-light">
                        <h1 class="text-5xl font-medium w-fit">
                            About This Project
                        </h1>
                        <hr class="w-1/2 lg:w-1/4 xl:w-1/6 my-4 border-2 rounded text-light/50"/>
                        <h1 class="text-3xl w-full lg:w-3/4 xl:w-1/2">
                            This is a side project I made to learn how to use FastAPI, MongoDB, and GSAP.
                            <br/>
                            <br/>
                            When I was working on adding a URL shortener to my website, there was an issue with database
                            migrations and I felt frustrated.
                            <br/>
                            <br/>
                            I looked at my project, and realized that I was using Django just for the API and nothing
                            else,
                            this made me realize that I needed to find an alternative to Django, something smaller.
                        </h1>
                    </div>
                </div>
                <div class="h-screen w-full p-4 bg-[#3e4559] flex items-center">
                    <div class="w-full flex flex-col items-center font-[Newsreader] text-light">
                        <h1 class="text-5xl font-medium w-fit">
                            Tech Stack
                        </h1>
                        <hr class="w-1/2 lg:w-1/4 xl:w-1/6 my-4 border-2 rounded text-light/50"/>
                        <h1 class="text-3xl w-full lg:w-3/4 xl:w-1/2">
                            This brought me to FastAPI and MongoDB.
                            <br/>
                            <br/>
                            I’ve been thinking about using an noSQL database for a while, because they’re faster and can
                            scale horizontally.
                            <br/>
                            <br/>
                            FastAPI was the best API option for me, as Flask wasn’t recommended for large projects and I
                            didn’t want to use Javascript on the backend.
                            <br/>
                            <br/>
                            I chose MongoDB as it was the simplest, due to its use of JSON and easy integration with
                            FastAPI.
                        </h1>
                        <div class="flex space-x-[2rem] mt-[2rem]">
                            <img onmouseenter={(event) => icon_hover(event, true)}
                                 onmouseleave={(event) => icon_hover(event, false)}
                                 class="size-[10rem] rounded-full" src={mongodb} alt="Mongodb"/>
                            <img onmouseenter={(event) => icon_hover(event, true)}
                                 onmouseleave={(event) => icon_hover(event, false)}
                                 class="size-[10rem]" src={solidjs} alt="Solidjs"/>
                            <img onmouseenter={(event) => icon_hover(event, true)}
                                 onmouseleave={(event) => icon_hover(event, false)}
                                 class="size-[10rem]" src={fastapi} alt="Fastapi"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home