import { useGoogleLogin } from "@react-oauth/google"
import { Button } from "antd"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import ActionTypes from "~/redux/users/types"
import { actions } from "~/redux/users/slice"

const ButtonLoginWithGoogle = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = useGoogleLogin({
        onSuccess: async ({ access_token }) => {
            dispatch(actions[ActionTypes.USER_LOGIN_REQUEST]({ access_token, navigate }))
        },
        onError: () => console.log("Login Failed"),
    })

    return (
        <Button shape="round" type="primary" size="large" onClick={() => login()}>
            Đăng nhập với Tài khoản Google
        </Button>
    )
}

export default ButtonLoginWithGoogle
