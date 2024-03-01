import { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import api from "~/config/api.config"
import { selectChat } from "~/redux/selectors"
import { authActions } from "~/redux/slice/auth.slice"
import { authTypes } from "~/redux/type/auth.type"

const HomePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const id_chat_active_newest = useSelector(selectChat).listChats[0]._id

    useEffect(() => {
        const checkSessionExpire = async () => {
            try {
                const session = await api.get("/auth/session")

                if (session) {
                    dispatch(authActions[authTypes.CHECK_SESSION](session.data))
                    navigate(`/chat/${id_chat_active_newest}`)
                }
            } catch (error: any) {
                dispatch(authActions[authTypes.CHECK_SESSION](error.response.data))
                navigate("/login")
            }
        }

        checkSessionExpire()
    }, [navigate, dispatch])

    return <Fragment />
}

export default HomePage
