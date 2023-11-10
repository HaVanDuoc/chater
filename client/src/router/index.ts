import ActiveSider from "~/siders/ActiveSider"
import ChatSider from "~/siders/ChatSider"

interface IRoutes {
    path?: string
    layout?: React.FC
    sider: React.FC
}

interface IRoutesArray extends Array<IRoutes> {}

export const routes: IRoutesArray = [
    { path: "/chat", sider: ChatSider },
    { path: "/active", sider: ActiveSider },
]
