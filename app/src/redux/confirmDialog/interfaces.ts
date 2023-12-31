export interface IConfirmDialog {
    open: boolean
    title: string
    content: string
    onOk: () => void
    onCancel: () => void
    okText?: string
    cancelText?: string
}
