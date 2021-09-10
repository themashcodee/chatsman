export async function refreshToken() {
    try {
        const res = await fetch(process.env.API_URI_REFRESH_TOKEN, {
            credentials: 'include'
        })
        const data = await res.json()
        if (!data.success) return null

        sessionStorage.setItem('token', data.token)
        return data.user
    } catch (err) {
        console.log(err)
        return null
    }
}