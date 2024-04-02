export const getAPIUrl = (type: "auth" | "table") => {
    let port = ""
    let subdomain = ""
    if (type === "auth") {
        port = "3000"
        subdomain = "auth"
    } else {
        port = "3001"
        subdomain = "table-api"
    }
    if (window.location.href.includes('localhost') || window.location.href.includes("127.0.0.1")) {
        return "http://localhost:" + port + "/api/"
    } else {
        return "https://" + subdomain + ".owen-services.eu.org/api/"
    }
}

export const hasJWT = (): boolean => {
    if (!localStorage.getItem("user")) {
        return false
    }
    if (JSON.parse(localStorage.getItem("user")!).token) {
        return true
    } else {
        return false
    }
}

export const getJWT = (): string => {
    return JSON.parse(localStorage.getItem("user")!).token
}