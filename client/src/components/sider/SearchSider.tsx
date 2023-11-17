import { Button, Flex } from "antd"
import React, { useState } from "react"
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons"
import UserChat from "./UserChat"
import { Flex as BoxResultSearch } from "antd"
import { paddingSider } from "./styles"
import { useDispatch } from "react-redux"
import { actions } from "~/redux/users/slice"
import ActionTypes from "~/redux/users/actionTypes"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectUser } from "~/redux/selectors"

interface ISearchSider {
    placeholder: string
}

const SearchSider: React.FC<ISearchSider> = ({ placeholder }) => {
    const [focusInput, setFocusInput] = useState<Boolean>(false)
    const dispatch = useDispatch()
    const search = useSelector(selectUser)?.search

    useEffect(() => {
        console.log("search", search)
    }, [search])

    const handleFocus = () => {
        setFocusInput(true)
    }

    const handleBlur = () => {
        setFocusInput(false)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.value
        dispatch(actions[ActionTypes.SEARCH_REQUEST](key))
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
                        onChange={handleChange}
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
                {Array.isArray(search) &&
                    search?.map((user, index) => {
                        return <UserChat user={user} key={index} />
                    })}
            </BoxResultSearch>
        </Flex>
    )
}

export default SearchSider
