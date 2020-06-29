const vkApi = require("./api/vk");
const conversations = require("./api/conversations");
const messages = require("./api/push");
const longpoll = require("./api/longpoll");
const {getChatHistory} = require("./api/history");

exports.status = async function status(cmd) {
    const vk = await vkApi.getVK()
    const data = await conversations.getUnreadConversations(vk)
    console.log(data)

    if (cmd.force) {
        for (const it of data) {
            await conversations.markConversationAsRead(vk, it.peer_id)
        }
    }
}

/**
 * @param {{depth:number}} cmd
 */
exports.list = async function list(cmd) {
    const vk = await vkApi.getVK()
    const chats = await conversations.getAllConversations(vk, cmd.depth || 5)
    console.log(chats)
}

exports.listen = async function listen() {
    const vk = await vkApi.getVK()

    const unreadChats = await conversations.getUnreadConversations(vk)

    for (const it of unreadChats) {
        console.log(it)
    }

    longpoll.listenForMessages(vk, msg => console.log(msg));
}

/**
 * @param target
 * @param {{nut:boolean, message:string}} cmd
 */
exports.push = async function push(target, cmd) {
    const vk = await vkApi.getVK()

    if (cmd.nut) {
        await messages.send_nut(vk, target)
        console.log("Nut pushed successfully.")
        return
    }

    if (cmd.message !== undefined) {
        await messages.send_message(vk, target, cmd.message)
        console.log("Message pushed successfully.")
    }
}

exports.whoIAm = async function whoIAm() {
    const vk = await vkApi.getVK()
    const me = await vk.session.user_id
    console.log("My id:", me)
}

/**
 * @param {Number} peer_id
 * @param {{depth: Number}} cmd
 */
exports.pull = async function pull(peer_id, cmd) {
    const vk = await vkApi.getVK()

    const history = await getChatHistory(vk, peer_id, cmd.depth || 5)
    await conversations.markConversationAsRead(vk, peer_id)

    for (const it of history) {
        console.log(it)
    }
}