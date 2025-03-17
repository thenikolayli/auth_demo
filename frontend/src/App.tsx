import {Route, Router} from "@solidjs/router";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";
import NotFound from "./pages/NotFound.tsx";
import "./app.css"
import Lenis from "lenis";
import {onMount, useContext} from "solid-js";
import UserDataContext from "./util/Context.tsx";

const App = () => {
    // the following code is for the lenis smooth scroll
    let lenis: any
    const context: any = useContext(UserDataContext)

    onMount(() => {
        lenis = new Lenis()
        requestAnimationFrame(raf)

        // runs refresh_token once on app load, initiates loop
        context.refresh_token().finally()

        setInterval(() => {
            context.refresh_token().finally()
        }, 4 * 60 * 1000)
    })

    const raf = (time: any) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    return (
        <Router>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/:username" component={Profile} />
            <Route path="/*" component={NotFound} />
        </Router>
    )
}

export default App