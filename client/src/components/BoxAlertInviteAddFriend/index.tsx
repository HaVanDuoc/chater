import { UserAddOutlined } from "@ant-design/icons"
import { Badge, Button, Empty, Flex, Popover, Typography } from "antd"
import { useSelector } from "react-redux"
import { selectInvite } from "~/redux/selectors"
import Item from "./Item"
import { IUser } from "~/redux/users/interfaces"

const BoxAlertInviteAddFriend = () => {
    const invites: IUser["invites"] = useSelector(selectInvite).invites || []

    const content = (
        <Flex vertical gap={10}>
            <Typography.Text strong>Bạn có {invites.length} lời mời kết bạn</Typography.Text>
            {invites.length ? (
                invites.map((item, index) => {
                    return <Item data={item} key={index} />
                })
            ) : (
                <Empty description={false} />
            )}
        </Flex>
    )

    return (
        <>
            <Popover content={content} trigger="click">
                <Badge count={invites.length} offset={[-10, 10]} size="small">
                    <Button type="text" icon={<UserAddOutlined />} size="large" shape="circle" />
                </Badge>
            </Popover>
        </>
    )
}

export default BoxAlertInviteAddFriend
