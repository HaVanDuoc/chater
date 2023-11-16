import { useGoogleLogin } from "@react-oauth/google"
import { Button } from "antd"
import { useDispatch } from "react-redux"
import ActionTypes from "~/redux/users/actionTypes"
import { actions } from "~/redux/users/slice"

const ButtonLoginWithGoogle = () => {
    const dispatch = useDispatch()

    const login = useGoogleLogin({
        onSuccess: async ({ access_token }) => {
            dispatch(actions[ActionTypes.USER_LOGIN_REQUEST](access_token))
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
