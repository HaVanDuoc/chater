import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { routes } from "./router"
import DefaultLayout from "./layouts/DefaultLayout"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {routes.map((route, index) => {
                        const path = route.path
                        const Layout = route.layout || DefaultLayout
                        const Sider = route.sider

                        return (
                            <Route key={index} path={path} element={<Layout sider={<Sider />} />} />
                        )
                    })}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
