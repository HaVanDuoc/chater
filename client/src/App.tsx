import { BrowserRouter, Routes, Route, redirect } from "react-router-dom"
import { routes } from "./routes"
import NotificationToast from "./components/NotificationToast"
import "react-toastify/dist/ReactToastify.css"
import { Fragment, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { selectUser } from "./redux/selectors"
import { actions as userActions } from "./redux/slice/user.slice"
import { types as userTypes } from "./redux/type/user.type"

function App() {
    const dispatch = useDispatch()

    const currentUser = useSelector(selectUser).currentUser

    useEffect(() => {
        dispatch(userActions[userTypes.GET_CURRENT_USER]({})) // Get current user
    }, [dispatch, currentUser])

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
