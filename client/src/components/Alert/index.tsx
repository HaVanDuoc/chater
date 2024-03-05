import React, { Fragment, useEffect, useState } from "react"
import { Alert as AlertAntd, Flex } from "antd"
import { useSelector } from "react-redux"
import { selectAlert } from "~/redux/selectors"

const Alert: React.FC = () => {
    const [show, setShow] = useState<boolean>(false)

    const alert = useSelector(selectAlert)
    const message = alert.message
    const type = alert.type

    useEffect(() => {
        if (alert.status === "succeeded") setShow(true)
    }, [alert])

    return (
        <Flex>
            show ? <AlertAntd message={message} type={type} /> : <Fragment />
        </Flex>
    )
}

export default Alert
