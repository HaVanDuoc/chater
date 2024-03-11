import { useEffect } from "react"
import { useLocation } from "react-router"

export const useSetCurrentPath = () => {
    const pathname = useLocation().pathname

    useEffect(() => {
        const handleBeforeUnload = () => {
            sessionStorage.setItem("currentPath", pathname)
        }

        window.addEventListener("load", handleBeforeUnload)

        return () => {
            window.removeEventListener("load", handleBeforeUnload)
        }
    }, [pathname])
}
