export function getAPIUrl(type: "auth" | "table") {
    let port = ""
    let subdomain = ""
    if (type === "auth") {
        port = "8786"
        subdomain = "auth"
    } else {
        port = "8787"
        subdomain = "table-api"
    }
    if (window.location.href.includes('localhost') || window.location.href.includes("127.0.0.1")) {
        return "http://localhost:" + port + "/api/"
    } else if (window.location.href.includes("table-stg.ogwen")) {
        return "https://" + subdomain + "-stg.owen-services.eu.org/api/"
    } else {
        return "https://" + subdomain + ".owen-services.eu.org/api/"
    }
}

export function hasJWT(): boolean {
    if (!localStorage.getItem("user")) {
        return false
    }
    if (JSON.parse(localStorage.getItem("user")!).token) {
        return true
    } else {
        return false
    }
}

export function getJWT(): string {
    return JSON.parse(localStorage.getItem("user")!).token
}

export function validateEmail(email: string): boolean {
    if (!email) {
        return false
    }
    if (!email.includes("@")) {
        return false
    }
    if (!email.split("@")[1].includes(".")) {
        return false
    }
    return true
}

export function validatePassword(password: string): boolean {
    //length 8
    //numbers
    //letters
    if (!password) {
        console.log("1")
        return false
    }
    if (password.length < 8) {
        console.log("2")
        return false
    }
    if (!password.match(/\d|[a-zA-Z]/)) {
        console.log("3")
        return false
    }

    return true
}

export function formatName(firstName: string, lastName: string): string {
    const firstname = firstName.charAt(0).toUpperCase() + firstName.slice(1)
    const lastname = lastName.charAt(0).toUpperCase() + lastName.slice(1)
    return firstname + " " + lastname
}