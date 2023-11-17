import React from "react"
import { Flex, Typography } from "antd"
import { paddingSider } from "./styles"

interface ITitleSider {
    content: React.ReactNode
}

const TitleSider: React.FC<ITitleSider> = ({ content }) => {
    return (
        <Flex justify="space-between" align="center" style={{ margin: paddingSider }}>
            <Typography.Title level={3} style={{ fontWeight: "bold" }}>
                {content}
            </Typography.Title>
        </Flex>
    )
}

export default TitleSider
