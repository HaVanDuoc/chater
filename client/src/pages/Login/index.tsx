import { Flex, Typography } from "antd"
import { PF } from "~/utils/variables"
import LoginLayout from "~/layouts/LoginLayout"
import ButtonLoginWithGoogle from "~/components/ButtonLoginWithGoogle"

const Logo = ({ src, size }: { src: string; size: number }) => {
    return <img src={src} alt="logo" style={{ width: size, maxWidth: 300 }} />
}

const LoginPage = () => {
    return (
        <LoginLayout>
            <Flex
                vertical
                justify="space-between"
                align="center"
                style={{ minHeight: "100vh", padding: 30 }}
            >
                <Flex vertical justify="center" align="center" gap={30} flex={1}>
                    <Logo src={`${PF}/logo.png`} size={100} />
                    <Typography style={{ fontSize: 30 }}>
                        Kết nối với những người bạn yêu quý.
                    </Typography>
                    <ButtonLoginWithGoogle />
                </Flex>

                <Flex gap={40}>
                    <Typography>Chưa dùng Chater?</Typography>
                    <Typography>Quên mật khẩu</Typography>
                    <Typography>Chính sách quyền riêng tư</Typography>
                    <Typography>Điều khoản</Typography>
                    <Typography>Chính sách Cookie</Typography>
                    <Typography>@Chater 2023</Typography>
                </Flex>
            </Flex>
        </LoginLayout>
    )
}

export default LoginPage
