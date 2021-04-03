const users = require("./users");

async function getAllConversations(vk, depth) {
    const res = await vk.call('messages.getConversations', {
        filter: 'all',
        count: depth
    })

    const enriched = await Promise.all(
        res.items.map(async it => enrichConversation(vk, it))
    )

    return enriched.map(it => parseConversation(it))
}

/**
 * @return {Array.<{peer_id: Number}>}
 */
async function getUnreadConversations(vk) {
    const res = await vk.call('messages.getConversations', {
        filter: 'unread'
    })

    if (res.count === 0)
        return []

    return res.items.map(it => parseConversation(it))
}

async function markConversationAsRead(vk, peerId) {
    await vk.call('messages.markAsRead', {
        mark_conversation_as_read: 1,
        peer_id: peerId,
    });
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

exports.getAllConversations = getAllConversations;
exports.getUnreadConversations = getUnreadConversations;
exports.markConversationAsRead = markConversationAsRead;