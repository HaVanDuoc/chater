import { Divider, Flex, Typography } from "antd"
import React from "react"
import styled from "styled-components"

export interface IPopoverMenu {
    data: IItemPopover[]
}

const PopoverMenu: React.FC<IPopoverMenu> = ({ data = [] }) => {
    return (
        <Flex vertical>
            {data.map((item, index) => {
                const content = item.content
                const icon = item.icon
                const hasDivider = item.hasDivider

                return (
                    <ItemPopover
                        content={content}
                        icon={icon}
                        hasDivider={hasDivider}
                        key={index}
                    />
                )
            })}
        </Flex>
    )
}

export default PopoverMenu

export interface IItemPopover {
    content: string
    icon: React.ReactNode
    hasDivider?: boolean
}

const ItemPopover: React.FC<IItemPopover> = ({ content, icon, hasDivider = false }) => {
    const WrapperContentPop = styled(Flex)`
        &:hover {
            background: #f3f5f5;
        }
    `

    const iconStyle = { backgroundColor: "#ebebeb", padding: 8, borderRadius: "50%" }

    return (
        <Flex vertical key={content}>
            <WrapperContentPop
                align="center"
                gap={13}
                style={{ cursor: "pointer", padding: "5px 10px", borderRadius: 5 }}
            >
                {React.cloneElement(icon as React.ReactElement, { style: iconStyle })}
                <Typography style={{ fontSize: 16, fontWeight: 500 }}>{content}</Typography>
            </WrapperContentPop>
            <Flex>
                {hasDivider ? <Divider style={{ margin: "10px 0" }} /> : <React.Fragment />}
            </Flex>
        </Flex>
    )
}
