import InfoFriend from "~/components/pages/User/components/InfoFriend"
import DefaultLayout from "~/components/layouts/DefaultLayout"
import ChatSider from "~/components/siders/ChatSider"

const UserPage = () => {
    return <DefaultLayout sider={<ChatSider />} content={<InfoFriend />} />
}

export default UserPage
