import { Fragment, useEffect } from "react"
import { useNavigate } from "react-router"

const HomePage = () => {
    const logged = false
    const navigate = useNavigate()

    useEffect(() => {
        logged ? navigate("/chat") : navigate("/login")
    }, [logged, navigate])

    return <Fragment />
}

export default HomePage
