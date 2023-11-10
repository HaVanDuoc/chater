import { Flex } from "antd"
import React from "react"
import { SearchOutlined } from "@ant-design/icons"

interface ISearchSider {
    placeholder: string
}

const SearchSider: React.FC<ISearchSider> = ({ placeholder }) => {
    return (
        <Flex style={{ backgroundColor: "#F3F3F5", borderRadius: 50, padding: "5px 10px" }}>
            <SearchOutlined style={{ fontSize: 18, marginRight: 7 }} />
            <input
                placeholder={placeholder}
                style={{
                    fontSize: 15,
                    flex: 1,
                    border: "none",
                    outline: "none",
                    lineHeight: "28px",
                    backgroundColor: "inherit",
                }}
            />
        </Flex>
    )
}

export default SearchSider
