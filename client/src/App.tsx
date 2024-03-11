import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { routes } from "./routes"
import { Fragment } from "react"
import NotificationToast from "./components/NotificationToast"
import SessionProvider from "./components/SessionProvider"
import SocketProvider from "./socket"

function App() {
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
                                        {/* <Alert /> */}
                                        <SessionProvider>
                                            <SocketProvider>
                                                <Page />
                                            </SocketProvider>
                                        </SessionProvider>
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
