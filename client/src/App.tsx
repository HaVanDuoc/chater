import { BrowserRouter, Routes, Route } from "react-router-dom"
import { routes } from "./routes"
import NotificationToast from "./components/NotificationToast"
import "react-toastify/dist/ReactToastify.css"
import { Fragment, useEffect } from "react"
import io from "socket.io-client"
import { useSelector } from "react-redux"
import { selectAuth } from "./redux/selectors"
import { useDispatch } from "react-redux"
import { inviteTypes } from "./redux/type/invite.type"
import { inviteActions } from "./redux/slice/invite.slice"
import { chatActions } from "./redux/slice/chat.slice"
import { chatTypes } from "./redux/type/chat.type"

// const socket = io("http://localhost:5000")

function App() {
    const dispatch = useDispatch()
    const logged = useSelector(selectAuth).user

    useEffect(() => {
        if (logged) {
            dispatch(inviteActions[inviteTypes.GET_LIST_INVITES]({}))
            dispatch(chatActions[chatTypes.GET_LIST_CHATS]({}))
        }
    }, [dispatch, logged])

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {routes.map((route, index) => {
                        const path = route.path
                        const Page = route.page || Fragment

                        return (
                            <Route
                                key={index}
                                path={path}
                                element={
                                    <>
                                        <NotificationToast />
                                        <Page />
                                    </>
                                }
                            />
                        )
                    })}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
