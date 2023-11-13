import React from "react"
import DefaultLayout from "~/layouts/DefaultLayout"
import ActiveSider from "~/siders/ActiveSider"

const ActivePage = () => {
    return <DefaultLayout sider={<ActiveSider />} />
}

export default ActivePage
