import { users } from "../DB/data";

export const getFriendList = (user) => {
    return user.friends.map((id) => users.find((usr) => usr.id === id));
}