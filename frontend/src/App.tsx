import {Route, Router} from "@solidjs/router";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";
import "./app.css"
import Lenis from "lenis";
import {onMount} from "solid-js";
import {UserDataProvider} from "./util/Context.tsx";

const App = () => {
    // the following code is for the lenis smooth scroll
    let lenis: any

    onMount(() => {
        lenis = new Lenis()
        requestAnimationFrame(raf)
    })

    const raf = (time: any) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    return (
        <UserDataProvider>
            <Router>
                <Route path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/:username" component={Profile} />
            </Router>
        </UserDataProvider>
    )
}

export default App