import { Layout } from "antd"
import ChatBox from "~/components/ChatBox"

const { Sider, Content } = Layout

interface IDefaultLayout {
    sider: React.ReactNode
}

export const widthSider = 350

const DefaultLayout = ({ sider }: IDefaultLayout) => {
    return (
        <Layout style={{ minHeight: "100vh", position: "relative" }}>
            <Sider
                width={widthSider}
                style={{
                    backgroundColor: "#fff",
                    color: "#000",
                    position: "fixed",
                    left: 0,
                    height: "100vh",
                }}
            >
                {sider}
            </Sider>
            <Layout>
                <Content>
                    <ChatBox />
                </Content>
            </Layout>
        </Layout>
    )
}

export default DefaultLayout
