import { BrowserRouter, Routes, Route } from "react-router-dom"
import { routes } from "./routes"
import Login from "./pages/Login"
// import { message } from "antd"
// import { useSelector } from "react-redux"
// import { selectMessage } from "./redux/selectors"
// import { useEffect } from "react"

function App() {
    // const messageData = useSelector(selectMessage)

    // useEffect(() => {
    //     const { type, content } = messageData
    //     messageData.type && message.open({ type, content })
    //     console.log("messageData", messageData)
    // }, [messageData])

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
