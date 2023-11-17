import { Button, Flex } from "antd"
import React, { useState } from "react"
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons"
import UserChat from "./UserChat"
import { Flex as BoxResultSearch } from "antd"
import { paddingSider } from "./styles"

interface ISearchSider {
    placeholder: string
}

const SearchSider: React.FC<ISearchSider> = ({ placeholder }) => {
    const [focusInput, setFocusInput] = useState<Boolean>(false)

    const handleFocus = () => {
        setFocusInput(true)
    }

    const handleBlur = () => {
        setFocusInput(false)
    }

    return (
        <Flex flex={1} style={{ position: "relative", padding: paddingSider }}>
            <Flex align="center" gap={5} flex={1} style={{ position: "relative" }}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    type="text"
                    shape="circle"
                    size="large"
                    style={{ display: focusInput ? "block" : "none" }}
                />
                <Flex
                    style={{
                        flex: 1,
                        backgroundColor: "#F3F3F5",
                        borderRadius: 50,
                        padding: "5px 10px",
                        alignItems: "center",
                    }}
                >
                    <SearchOutlined style={{ fontSize: 18, marginRight: 7 }} />
                    <input
                        placeholder={placeholder}
                        style={{
                            fontSize: 15,
                            flex: 1,
                            border: "none",
                            outline: "none",
                            lineHeight: "32px",
                            backgroundColor: "inherit",
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </Flex>
            </Flex>

            <BoxResultSearch
                vertical
                style={{
                    display: focusInput ? "block" : "none",
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    zIndex: 99,
                    backgroundColor: "#fff",
                    flex: 1,
                    width: "100%",
                    overflow: "auto",
                    paddingTop: 15,
                    paddingLeft: 7,
                    height: `calc(100vh - 100px)`,
                }}
            >
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
            </BoxResultSearch>
        </Flex>
    )
}

export default SearchSider
