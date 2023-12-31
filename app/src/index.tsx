import React from "react"
import ReactDOM from "react-dom/client"
import App from "~/App"
import { persistor, store } from "./redux/store"
import { Provider } from "react-redux"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { PersistGate } from "redux-persist/integration/react"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="857605937611-j80q77op127m043iph9jgo04r9a78eqq.apps.googleusercontent.com">
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </GoogleOAuthProvider>
    </React.StrictMode>,
)
