const users = require("./users");

async function extractConversations(vk, conversations) {
    const enriched = await Promise.all(
        conversations.items.map(async it => enrichConversation(vk, it))
    )

    return enriched.map(it => parseConversation(it))
}

async function enrichConversation(vk, item) {
    const last_message_from_id = item.last_message.from_id
    item.last_message_username = await users.getUserFullName(vk, last_message_from_id)
    return item
}

/**
 * @param {{text:string, from_id:string}} item.last_message
 * @param {{type:string, id:string}} item.conversation.peer
 * @param {{title:string}} item.conversation.chat_settings
 * @param {{title:string}} item.last_message_username
 */
function parseConversation(item) {
    const conversation = item.conversation
    const last_message = item.last_message
    const isChat = conversation.peer.type === 'chat'

    const title = (isChat ? conversation.chat_settings.title : 'user')

    return {
        title: title,
        last_message_from: item.last_message_username,
        last_message: last_message.text,
        peer_id: conversation.peer.id,
        unread_count: conversation.unread_count || 0,
    }
}

exports.extractConversations = extractConversations;