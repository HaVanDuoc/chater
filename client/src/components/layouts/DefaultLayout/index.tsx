import { Layout } from "antd"

const { Sider, Content } = Layout

interface IDefaultLayout {
    sider: React.ReactNode
    content: React.ReactNode
}

export const widthSider = 350

const DefaultLayout = ({ sider, content }: IDefaultLayout) => {
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
                <Content>{content}</Content>
            </Layout>
        </Layout>
    )
}

export default DefaultLayout
