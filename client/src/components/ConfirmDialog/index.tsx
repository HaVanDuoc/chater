import { Modal } from "antd"
import React from "react"
import { IConfirmDialog } from "~/redux/confirmDialog/interfaces"

const ConfirmDialog: React.FC<IConfirmDialog> = ({
    open,
    title,
    content,
    onOk,
    onCancel,
    okText,
    cancelText,
}) => {
    return (
        <Modal
            open={open}
            title={title}
            onOk={onOk}
            onCancel={onCancel}
            okText={okText}
            cancelText={cancelText}
        >
            {content}
        </Modal>
    )
}

export default ConfirmDialog
