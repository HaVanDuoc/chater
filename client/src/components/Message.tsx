import { message } from "antd"
import { useSelector } from "react-redux"
import { selectMessage } from "~/redux/selectors"
import { useEffect } from "react"

const Message = () => {
    const [messageApi] = message.useMessage()

    const messageData = useSelector(selectMessage)
    const { type, content, show } = messageData

    useEffect(() => {
        console.log("messageData", messageData)
    }, [messageData])

    return (
        <>
            {show &&
                messageApi.open({
                    type,
                    content,
                })}
        </>
    )
}

export default Message
