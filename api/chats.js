async function getAllUnreadMessages(vk) {
    const res = await vk.call('messages.getConversations', {
        filter: 'unread'
    })

    console.log(res)

    if (res.count === 0)
        return []

    for (const it in res.items) {
        await getChatHistory(vk, it.last_message.peer_id)
    }
}

async function getChatHistory(vk, peer_id, depth) {
    const res = await vk.call('messages.getHistory', {
        peer_id: peer_id,
        count: depth
    })

    return parseMessages(res)
}

function parseMessages(res) {
    return res.items.map(it => {
        return {text: it.text, out: (it.out === 1)}
    }).reverse()
}

exports.getAllUnreadMessages = getAllUnreadMessages;
exports.getChatHistory = getChatHistory;
