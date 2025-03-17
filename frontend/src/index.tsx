/* @refresh reload */
import { render } from 'solid-js/web'
import App from './App.tsx'
import {UserDataProvider} from "./util/Context.tsx";

const root = document.getElementById('root')

render(() => (
    <UserDataProvider>
        <App />
    </UserDataProvider>
), root!)