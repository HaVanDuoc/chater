import { useGoogleLogin } from "@react-oauth/google"
import { Button } from "antd"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import ActionTypes from "~/redux/users/types"
import { actions } from "~/redux/users/slice"
import instance from "~/config/axios.config"

const ButtonLoginWithGoogle = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const currentUrl = window.location.href
            const encodedParam = encodeURI(`?redirectUrl=${currentUrl}`)
            window.location.href = `http://localhost:5000/login/google${encodedParam}`
        } catch (error) {
            console.error("Error initiating Google OAuth:", error)
        }
    }

    return (
        <Button shape="round" type="primary" size="large" onClick={handleLogin}>
            Đăng nhập với Tài khoản Google
        </Button>
    )
}

export default ButtonLoginWithGoogle
