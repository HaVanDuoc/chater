import { useGoogleLogin } from "@react-oauth/google"
import { Button } from "antd"
import axios from "axios"

const ButtonLoginWithGoogle = () => {
    const login = useGoogleLogin({
        onSuccess: async ({ access_token }) => {
            const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { Authorization: `Bearer ${access_token}` },
            })

            console.log(userInfo)
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
