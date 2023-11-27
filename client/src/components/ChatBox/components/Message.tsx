import { UserOutlined } from "@ant-design/icons"
import { Avatar, Flex, Tooltip } from "antd"
import React from "react"
import styled from "styled-components"

interface IMessage {
    sender: string
    avatar: string
    content: string
    isUser: boolean
    isSameSender: boolean
    isLast: boolean
}

const WrapMessage = styled(Flex)`
    .message {
        width: fit-content;
        max-width: 60%;
        padding: 10px;
        // margin-bottom: 10px;
        border-radius: 45px;
    }

    .user-message {
        align-self: flex-end;
        background-color: #0084ff;
        color: white;
    }

    .other-message {
        align-self: flex-start;
        background-color: #f1f0f0;
        color: black;
    }
`

const Message: React.FC<IMessage> = ({ sender, avatar, content, isUser, isSameSender, isLast }) => (
    <WrapMessage
        align="center"
        justify={isUser ? "flex-end" : "flex-start"}
        gap="small"
        style={{ marginTop: isSameSender ? 2 : 10 }}
    >
        {!isUser && isLast ? (
            <Tooltip title={sender} placement="left">
                <Avatar icon={<UserOutlined />} src={avatar} />
            </Tooltip>
        ) : (
            <Avatar icon={<UserOutlined />} style={{ opacity: 0 }} />
        )}
        <Flex className={`message ${isUser ? "user-message" : "other-message"}`}>
            <Flex className="message-content">{content}</Flex>
        </Flex>
    </WrapMessage>
)

export default Message
