import {useParams} from "@solidjs/router";
import Sidebar from "../components/Sidebar.tsx";

const Profile = () => {
    const params = useParams()
    const username = params.username

    return (
        <>
            <Sidebar/>
            <div class="max-w-screen min-h-screen">
                <div class="relative w-full h-screen bg-dark text-xl font-[Newsreader] text-light p-4">
                    {username}
                </div>
            </div>
        </>
    )
}

export default Profile