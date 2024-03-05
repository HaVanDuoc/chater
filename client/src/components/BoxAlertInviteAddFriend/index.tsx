import { UserAddOutlined } from "@ant-design/icons"
import { Badge, Button, Empty, Flex, Popover, Typography } from "antd"
import { useSelector } from "react-redux"
import { selectCurrentUser, selectInvite } from "~/redux/selectors"
import Item from "./Item"
import { IInvite } from "~/redux/interface/invite.interface"

const BoxAlertInviteAddFriend = () => {
    const current_user_id = useSelector(selectCurrentUser).data?._id
    const invites: IInvite[] =
        useSelector(selectInvite).getInvites.data?.filter(
            (invite) => invite.receiver === current_user_id,
        ) || []
    const length = invites?.length

    const content = (
        <Flex vertical gap={10}>
            <Typography.Text strong>Bạn có {length} lời mời kết bạn</Typography.Text>
            <Flex vertical>
                {length ? (
                    invites.map((invite, index) => {
                        return (
                            <Item
                                invite_id={invite?._id}
                                sender_id={invite.sender._id}
                                sender_displayName={invite.sender.displayName}
                                sender_picture={invite.sender.picture}
                                key={index}
                            />
                        )
                    })
                ) : (
                    <Empty description={false} />
                )}
            </Flex>
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
