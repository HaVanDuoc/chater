import { UserOutlined } from "@ant-design/icons"
import { Avatar, Badge } from "antd"
import React from "react"

interface IAvatarOnline {
    online?: boolean
    avt?: string
}

const dotStyle = {
    width: 11,
    height: 11,
}

const AvatarOnline: React.FC<IAvatarOnline> = ({ online = false, avt = <UserOutlined /> }) => {
    return (
        <Badge dot={online} status="success" offset={[-5, "80%"]} style={dotStyle}>
            <Avatar size={45} icon={avt} />
        </Badge>
    )
}

export default AvatarOnline
