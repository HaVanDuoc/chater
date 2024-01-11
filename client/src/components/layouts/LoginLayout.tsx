import React from "react"

interface ILoginLayout {
    children: React.ReactNode
}

const LoginLayout: React.FC<ILoginLayout> = ({ children }) => {
    return <div>{children}</div>
}

export default LoginLayout
