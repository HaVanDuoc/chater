import ActivePage from "~/pages/Active"
import ChatPage from "~/pages/Chat"
import HomePage from "~/pages/Home"
import LoginPage from "~/pages/Login"

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
