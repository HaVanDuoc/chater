import { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { selectUser } from "~/redux/selectors"

const HomePage = () => {
    const currentUser = useSelector(selectUser)?.currentUser
    const navigate = useNavigate()

    useEffect(() => {
        currentUser ? navigate("/chat") : navigate("/login")
    }, [currentUser, navigate])

    return <Fragment />
}

export default HomePage
