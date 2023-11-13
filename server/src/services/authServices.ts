namespace AuthServices {
    export const login = async () => {
        try {
            console.log("services")

            return { message: "Login successful" }
        } catch (error) {
            throw new Error("Login Failed")
        }
    }
}

export default AuthServices
