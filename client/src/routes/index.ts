import ActivePage from "~/components/pages/Active"
import ChatPage from "~/components/pages/Chat"
import HomePage from "~/components/pages/Home"
import LoginPage from "~/components/pages/Login"

interface IRoutes {
    path?: string
    page?: React.FC
}

interface IRoutesArray extends Array<IRoutes> {}

export const routes: IRoutesArray = [
    { path: "/", page: HomePage },
    { path: "/chat", page: ChatPage },
    { path: "/chat/:chatId", page: ChatPage },
    { path: "/active", page: ActivePage },
    { path: "/login", page: LoginPage },
]
