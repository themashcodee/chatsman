export function initTheme() {
    if (typeof window !== 'undefined') {
        if (localStorage.theme) {
            if (localStorage.theme === 'dark') document.documentElement.classList.add('dark')
            else document.documentElement.classList.remove('dark')
        } else {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        }
    }
}

export function getCurrenTheme() {
    if (typeof window !== 'undefined') return localStorage.theme
}

export function toggleTheme() {
    const currentTheme = localStorage.theme
    if (currentTheme === 'dark') {
        localStorage.setItem('theme', 'light')
        return document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', 'dark')
    return document.documentElement.classList.add('dark')
}