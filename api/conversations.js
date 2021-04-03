const {extractConversations} = require("./processing");

async function getAllConversations(vk, depth) {
    const res = await vk.call('messages.getConversations', {
        filter: 'all',
        count: depth
    })

    return extractConversations(vk, res)
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

    return extractConversations(vk, res)
}

function markConversationAsRead(vk, peerId) {
    vk.call('messages.markAsRead', {
        mark_conversation_as_read: 1,
        peer_id: peerId,
    })
}


exports.getAllConversations = getAllConversations;
exports.getUnreadConversations = getUnreadConversations;
exports.markConversationAsRead = markConversationAsRead;