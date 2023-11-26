import { BrowserRouter, Routes, Route } from "react-router-dom"
import { routes } from "./routes"
import Login from "./pages/Login"
import NotificationToast from "./components/NotificationToast"
import "react-toastify/dist/ReactToastify.css"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {routes.map((route, index) => {
                        const path = route.path
                        const Page = route.page || Login

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
