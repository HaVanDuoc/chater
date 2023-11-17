import { UserOutlined } from "@ant-design/icons"
import { Avatar, Badge } from "antd"
import React from "react"

interface IAvatarOnline {
    online?: boolean
    avt?: string
    size?: number
}

const dotStyle = {
    width: 11,
    height: 11,
}

const AvatarOnline: React.FC<IAvatarOnline> = ({
    online = false,
    avt = null,
    size = 45,
}) => {
    return (
        <Badge dot={online} status="success" offset={["-5%", "80%"]} style={dotStyle}>
            <Avatar size={size} icon={<UserOutlined />} src={avt} />
        </Badge>
    )
}

export default AvatarOnline
