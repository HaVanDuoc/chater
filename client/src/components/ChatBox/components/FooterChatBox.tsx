import {
    FileGifOutlined,
    LikeFilled,
    PictureOutlined,
    PlusCircleFilled,
    SmileOutlined,
} from "@ant-design/icons"
import { Button, Flex, Form, Input, Tooltip } from "antd"
import React from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"
import { messageActions } from "~/redux/messages/slice"
import messageTypes from "~/redux/messages/types"

const buttons = [
    { icon: <PlusCircleFilled />, title: "Mở hành động khác" },
    { icon: <PictureOutlined />, title: "Đính kèm file" },
    { icon: <SmileOutlined />, title: "Chọn nhãn dán" },
    { icon: <FileGifOutlined />, title: "Chọn file gif" },
]

interface IFooterChatBox {
    data: any
}

const FooterChatBox: React.FC<IFooterChatBox> = ({ data }) => {
    const [form] = Form.useForm()
    const { chatId } = useParams()
    const dispatch = useDispatch()

    const onFinish = (values: { message: string }) => {
        console.log("Message sent:", values.message)

        if (values?.message) {
            const data = {
                chat: chatId,
                content: values.message,
            }

            // dispatch send messages
            dispatch(messageActions[messageTypes.SEND_MESSAGE_REQUEST](data))

            form.resetFields()
        }
    }

    return (
        <Flex gap={10} align="center" style={{ padding: 10, background: "#fff" }}>
            <Flex>
                {buttons.map((button, index) => (
                    <Tooltip title={button.title} key={index}>
                        <Button
                            icon={button.icon}
                            shape="circle"
                            type="text"
                            size="large"
                            style={{ color: "dodgerblue" }}
                        />
                    </Tooltip>
                ))}
            </Flex>

            <Form form={form} onFinish={onFinish} style={{ flex: 1 }}>
                <Form.Item name="message" style={{ marginBottom: 0 }}>
                    <Input
                        autoFocus
                        // autoSize={{ minRows: 1, maxRows: 3 }}
                        placeholder="Aa"
                        bordered={false}
                        size="large"
                        style={{ background: "#f1f0f0", borderRadius: 20, marginRight: 8, flex: 1 }}
                    />
                    {/* <Button icon={<SmileFilled />} style={{ position: "absolute", right: 0 }} /> */}
                </Form.Item>
            </Form>

            <Button
                icon={<LikeFilled />}
                type="text"
                shape="circle"
                size="large"
                style={{ color: "dodgerblue" }}
            />
        </Flex>
    )
}

export default FooterChatBox
