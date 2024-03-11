import api from "~/config/api.config"
import API from "~/redux/api/chat.api"
import React, { Fragment, useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { currentUserActions } from "~/redux/slice/currentUser.slice"
import { currentUserTypes } from "~/redux/type/currentUser.type"
import { suggestFriendActions } from "~/redux/slice/suggestFriends.slice"
import { suggestFriendTypes } from "~/redux/type/suggestFriends.type"
import { friendActions } from "~/redux/slice/friend.slice"
import { friendTypes } from "~/redux/type/friend.type"
import { useNavigate } from "react-router"
import { purgeState } from "~/redux/store"
import { useSetCurrentPath } from "~/hook"
import { getListInvites } from "~/redux/actions/invite.action"
import { getListChats } from "~/redux/actions/chat.action"

interface ISessionProvider {
    children: React.ReactNode
}

const SessionProvider: React.FC<ISessionProvider> = ({ children }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const checkSessionExpire = useCallback(async () => {
        try {
            const session = await api.get("/auth/session")
            dispatch(currentUserActions[currentUserTypes.CHECK_SESSION_SUCCESS](session.data))
            dispatch(getListInvites()) // Get list invites
            dispatch(suggestFriendActions[suggestFriendTypes.GET_SUGGEST_FRIENDS]({})) // Get list friend suggest
            dispatch(friendActions[friendTypes.GET_LIST_FRIEND]({})) // Get list friend
            dispatch(getListChats()) // Get list chat

            const listChat = await API.getListChats()
            const currentPath = sessionStorage.getItem("currentPath")
            currentPath && currentPath !== "/login" && currentPath !== "/"
                ? navigate(currentPath)
                : listChat?.chats?.[0]?._id
                ? navigate(`/chat/${listChat?.chats?.[0]?._id}`)
                : navigate("/chat")
        } catch (error: any) {
            dispatch(currentUserActions[currentUserTypes.CHECK_SESSION_FAILED](error))
            purgeState()
            navigate("/login")
        }
    }, [dispatch, navigate])

    useEffect(() => {
        checkSessionExpire()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useSetCurrentPath()

    return <Fragment>{children}</Fragment>
}

export default SessionProvider
