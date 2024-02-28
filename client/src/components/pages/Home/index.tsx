import { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { selectUser } from "~/redux/selectors"

const HomePage = () => {
    const navigate = useNavigate()
    const getCurrentUser = useSelector(selectUser)?.status

    useEffect(() => {
        getCurrentUser ? navigate("/chat") : navigate("/login")
    }, [navigate, getCurrentUser])

    return <Fragment />
}

export default HomePage
