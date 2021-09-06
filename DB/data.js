export const chats = [
    {
        users: [1, 2],
        chats: [
            {
                id: 1,
                message: 'Hello How are you',
                time: 1630652823371,
                senderId: 1,
            },
            {
                id: 2,
                message: 'I am fine what what about you',
                time: 1630753729971,
                senderId: 2,
            },
            {
                id: 3,
                message: 'You know what tday i was just escaped from death, i was going to home from school and i just slipped over in the road and a car was coming in super fast speed but somehow a girl came and saved me',
                time: 1630753653371,
                senderId: 2,
            },
            {
                id: 4,
                message: 'woahoo, for real?',
                time: 1630753823371,
                senderId: 1,
            },
        ]
    },
    {
        users: [1, 3],
        chats: [
            {
                id: 1,
                message: 'Hey, wassup?',
                time: 1630753821371,
                senderId: 3,
            },
            {
                id: 2,
                message: 'nthg wud bout you?',
                time: 1630753822371,
                senderId: 1,
            }
        ]
    }
]

export const users = [
    {
        id: 1,
        name: "Kalen",
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        online: true,
        username: "kalen12",
        email: "kalen@gmail.com",
        friends: [2, 3],
    },
    {
        id: 2,
        name: "Alberto Calemaroso",
        img: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=401&q=80",
        online: true,
        username: "alberto106",
        email: "alberto@gmail.com",
        friends: [1]
    },
    {
        id: 3,
        name: "Mariana",
        username: "mari",
        email: "mariathome@gmail.com",
        img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=333&q=80",
        online: false,
        friends: [1]
    }]