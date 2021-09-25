export async function refreshToken() {
    try {
        const data = await (await fetch(process.env.API_URI_REFRESH_TOKEN, {
            credentials: 'include'
        })).json()
        if (!data.success) return null

        return data.user
    } catch (err) {
        return null
    }
}

refreshToken()