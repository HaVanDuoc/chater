import { useGoogleLogin } from "@react-oauth/google"
import { Button } from "antd"
import { useDispatch } from "react-redux"
import { requestLogin } from "~/redux/users/actions"

const ButtonLoginWithGoogle = () => {
    const dispatch = useDispatch()

    const login = useGoogleLogin({
        onSuccess: async ({ access_token }) => {
            dispatch(requestLogin(access_token))
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
