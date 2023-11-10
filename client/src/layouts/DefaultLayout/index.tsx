import { Layout } from "antd"

const { Sider, Content } = Layout

interface IDefaultLayout {
    sider: React.ReactNode
}

const DefaultLayout = ({ sider }: IDefaultLayout) => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                width={350}
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
                <Content>Content</Content>
            </Layout>
        </Layout>
    )
}

export default DefaultLayout
