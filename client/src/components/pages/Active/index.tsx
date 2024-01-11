import React from "react"
import DefaultLayout from "~/components/layouts/DefaultLayout"
import ActiveSider from "~/components/siders/ActiveSider"

const ActivePage = () => {
    return <DefaultLayout sider={<ActiveSider />} />
}

export default ActivePage
