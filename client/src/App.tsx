import { BrowserRouter, Routes, Route } from "react-router-dom"
import { routes } from "./routes"
import Login from "./pages/Login"

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
