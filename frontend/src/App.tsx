import {Route, Router} from "@solidjs/router";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import "./app.css"
import Lenis from "lenis";
import {onMount} from "solid-js";

const App = () => {
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
        <Router>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
        </Router>
    )
}

export default App