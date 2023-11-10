import { EllipsisOutlined, PhoneFilled, VideoCameraFilled } from "@ant-design/icons"
import { Button, Flex, Tooltip, Typography } from "antd"
import AvatarOnline from "~/components/AvatarOnline"

const HeaderChatBox = () => {
    return (
        <Flex
            align="center"
            justify="space-between"
            style={{
                padding: 8,
                backgroundColor: "#fff",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                zIndex: 99,
            }}
        >
            <Flex gap={7} align="center">
                <AvatarOnline online size={38} />

                <Flex vertical gap={0}>
                    <Typography style={{ fontSize: 16, fontWeight: 500 }}>Việt Trung</Typography>
                    <Typography style={{ fontSize: 13 }}>Đang hoạt động</Typography>
                </Flex>
            </Flex>

            <Flex gap={7}>
                <Tooltip title="Phone call">
                    <Button
                        icon={<PhoneFilled style={{ color: "dodgerblue" }} />}
                        type="text"
                        shape="circle"
                        size="large"
                    />
                </Tooltip>
                <Tooltip title="Video call">
                    <Button
                        icon={<VideoCameraFilled style={{ color: "dodgerblue" }} />}
                        type="text"
                        shape="circle"
                        size="large"
                    />
                </Tooltip>
                <Tooltip title="More options">
                    <Button
                        icon={<EllipsisOutlined style={{ color: "dodgerblue" }} />}
                        type="text"
                        shape="circle"
                        size="large"
                    />
                </Tooltip>
            </Flex>
        </Flex>
    )
}

export default HeaderChatBox
