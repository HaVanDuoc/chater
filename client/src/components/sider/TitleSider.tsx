import { Flex, Typography } from "antd"
import React from "react"

interface ITitleSider {
    content: React.ReactNode
}

const TitleSider: React.FC<ITitleSider> = ({ content }) => {
    return (
        <Flex justify="space-between" align="center">
            <Typography.Title level={3} style={{ fontWeight: "bold" }}>
                {content}
            </Typography.Title>
        </Flex>
    )
}

export default TitleSider
