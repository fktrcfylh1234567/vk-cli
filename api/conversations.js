async function getAllConversations(vk, depth) {
    const res = await vk.call('messages.getConversations', {
        filter: 'all',
        count: depth
    })

    return res.items.map(it => parseConversation(it))
}

async function getUnreadConversations(vk) {
    const res = await vk.call('messages.getConversations', {
        filter: 'unread'
    })

    if (res.count === 0)
        return []

    return res.items.map(it => parseConversation(it))
}

/**
 * @param {{text:string, from_id:string}} item.last_message
 * @param {{type:string, id:string}} item.conversation.peer
 * @param {{title:string}} item.conversation.chat_settings
 */
function parseConversation(item) {
    const conversation = item.conversation
    const last_message = item.last_message
    const isChat = conversation.peer.type === 'chat'

    const title = (isChat ? conversation.chat_settings.title : 'user')

    return {
        title: title,
        peer_id: conversation.peer.id,
        type: conversation.peer.type,
        last_message: last_message.text,
        last_message_from: last_message.from_id,
        unread_count: conversation.unread_count
    }
}

exports.getAllConversations = getAllConversations;
exports.getUnreadConversations = getUnreadConversations;