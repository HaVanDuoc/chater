import { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { selectUser } from "~/redux/selectors"

const HomePage = () => {
    const navigate = useNavigate()
    const currentUser = useSelector(selectUser)?.currentUser
    const chatId = currentUser?.chats[0]?._id

    useEffect(() => {
        currentUser ? navigate(`/chat/${chatId}`) : navigate("/login")
    }, [currentUser, chatId, navigate])

    return <Fragment />
}

export default HomePage
