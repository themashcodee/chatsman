import { chats } from '../DB/data'

export const getMutualChat = (id1, id2) => {
    return chats.find(
        (chat) => chat.users.includes(id1) && chat.users.includes(id2)
    ).chats;
}