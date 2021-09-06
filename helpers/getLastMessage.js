export const getLastMessage = (mutualChat) => {
    if (!mutualChat.length) return null
    const lastIndex = mutualChat.length - 1;
    const lastmessage = mutualChat[lastIndex].message;
    return lastmessage.length > 20
        ? lastmessage.substr(0, 20) + "..."
        : lastmessage
}