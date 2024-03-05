import api from "~/config/api.config"
import React, { Fragment, useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { currentUserActions } from "~/redux/slice/currentUser.slice"
import { currentUserTypes } from "~/redux/type/currentUser.type"
import { inviteActions } from "~/redux/slice/invite.slice"
import { inviteTypes } from "~/redux/type/invite.type"
import { suggestFriendActions } from "~/redux/slice/suggestFriends.slice"
import { suggestFriendTypes } from "~/redux/type/suggestFriends.type"
import { friendActions } from "~/redux/slice/friend.slice"
import { friendTypes } from "~/redux/type/friend.type"
import { chatActions } from "~/redux/slice/chat.slice"
import { chatTypes } from "~/redux/type/chat.type"
import { useNavigate } from "react-router"
import API from "~/redux/api/chat.api"

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
            dispatch(inviteActions[inviteTypes.GET_LIST_INVITES]({})) // Get list invites
            dispatch(suggestFriendActions[suggestFriendTypes.GET_SUGGEST_FRIENDS]({})) // Get list friend suggest
            dispatch(friendActions[friendTypes.GET_LIST_FRIEND]({})) // Get list friend
            dispatch(chatActions[chatTypes.GET_LIST_CHATS]({})) // Get list chat

            const listChat = await API.getListChats()
            navigate(`/chat/${listChat?.chats?.[0]?._id}`)
        } catch (error: any) {
            dispatch(currentUserActions[currentUserTypes.CHECK_SESSION_FAILED](error))
            navigate("/login")
        }
    }, [dispatch, navigate])

    useEffect(() => {
        checkSessionExpire()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Fragment>{children}</Fragment>
}

export default SessionProvider
