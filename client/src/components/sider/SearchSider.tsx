import { Button, Flex, Typography } from "antd"
import React, { Fragment, useState } from "react"
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons"
import { Flex as BoxResultSearch } from "antd"
import { paddingSider } from "./styles"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { selectSearch, selectUser } from "~/redux/selectors"
import AvatarOnline from "../AvatarOnline"
import { useNavigate } from "react-router"
import { useRef, useEffect } from "react"
import { searchActions } from "~/redux/searches/slice"
import searchTypes from "~/redux/searches/types"
import { actions as userActions } from "~/redux/slice/user.slice"
import { userTypes } from "~/redux/type/user.type"
import { IUser } from "~/redux/interface/user.interface"

interface ISearchSider {
    placeholder: string
}

const SearchSider: React.FC<ISearchSider> = ({ placeholder }) => {
    const [showResult, setShowResult] = useState<Boolean>(false)
    const dispatch = useDispatch()
    const containerSearch = useRef<HTMLDivElement>(null)
    const searches = useSelector(selectSearch)?.data
    const listSuggestFriends = useSelector(selectUser).suggestFriends

    const handleOutsideClick = (event: any) => {
        if (containerSearch.current && !containerSearch.current.contains(event.target)) {
            setShowResult(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick)
        return () => {
            document.removeEventListener("click", handleOutsideClick)
        }
    }, [])

    const handleFocus = () => {
        setShowResult(true)
        dispatch(userActions[userTypes.GET_SUGGEST_FRIENDS]({}))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.value
        dispatch(searchActions[searchTypes.SEARCH_REQUEST]({ key }))
    }

    return (
        <Flex
            flex={1}
            style={{ position: "relative", padding: paddingSider }}
            ref={containerSearch}
        >
            <Flex align="center" gap={5} flex={1} style={{ position: "relative" }}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    type="text"
                    shape="circle"
                    size="large"
                    style={{ display: showResult ? "block" : "none" }}
                    onClick={() => setShowResult(false)}
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
                        onChange={handleChange}
                    />
                </Flex>
            </Flex>

            {showResult && (
                <BoxResultSearch
                    vertical
                    style={{
                        display: showResult ? "block" : "none",
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
                    {listSuggestFriends?.length ? (
                        <Fragment>
                            <Typography.Title
                                level={5}
                                style={{ paddingLeft: 16, paddingRight: 16 }}
                            >
                                Những người bạn có thể biết
                            </Typography.Title>

                            {listSuggestFriends?.map((user: IUser) => {
                                return (
                                    <ItemSearch
                                        _id={user._id}
                                        avatar={user.picture}
                                        name={user.displayName}
                                        email={user.email}
                                        key={user._id}
                                    />
                                )
                            })}
                        </Fragment>
                    ) : (
                        <Fragment />
                    )}

                    {searches?.friends?.length &&
                        searches?.friends?.map((user: IUser) => {
                            return (
                                <ItemSearch
                                    _id={user?._id}
                                    avatar={user?.picture}
                                    name={user?.name}
                                    email={user?.email}
                                    key={user?._id}
                                />
                            )
                        })}

                    {searches?.friends?.length === 0 && (
                        <>
                            <Typography.Title
                                level={5}
                                style={{ paddingLeft: 16, paddingRight: 16 }}
                            >
                                Người khác
                            </Typography.Title>
                            {searches?.others?.map((user: IUser) => {
                                return (
                                    <ItemSearch
                                        _id={user?._id}
                                        avatar={user?.picture}
                                        name={user?.name}
                                        email={user?.email}
                                        key={user?._id}
                                    />
                                )
                            })}
                        </>
                    )}
                </BoxResultSearch>
            )}
        </Flex>
    )
}

export default SearchSider

interface IItemSearch {
    _id: IUser["_id"]
    name: IUser["name"]
    avatar: IUser["picture"]
    email: IUser["email"]
}

const ItemSearch: React.FC<IItemSearch> = ({ _id, name, avatar, email }) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/user/${_id}`)
    }

    return (
        <Flex
            align="center"
            gap={10}
            style={{
                position: "relative",
                padding: "10px 10px",
                borderRadius: 5,
                marginRight: 5,
                cursor: "pointer",
                background: isHovered ? "#f3f5f5" : "inherit",
            }}
            onMouseEnter={() => {
                setIsHovered(true)
            }}
            onMouseLeave={() => {
                setIsHovered(false)
            }}
            onClick={handleClick}
        >
            <AvatarOnline avt={avatar} size={35} online />
            <Flex vertical gap="none">
                <Typography.Text style={{ fontSize: 15, fontWeight: 500 }}>{name}</Typography.Text>
                <Typography.Text style={{ fontSize: 12, fontStyle: "italic" }}>
                    {email}
                </Typography.Text>
            </Flex>
        </Flex>
    )
}
