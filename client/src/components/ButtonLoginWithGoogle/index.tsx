import { Button } from "antd"

const ButtonLoginWithGoogle = () => {
    const handleLogin = async () => {
        try {
            const currentUrl = window.location.href
            const encodedParam = encodeURI(`?redirectUrl=${currentUrl}`)
            window.open(`http://localhost:5000/api/auth/login/google${encodedParam}`, "_self")
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
