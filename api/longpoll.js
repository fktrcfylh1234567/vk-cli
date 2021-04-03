const vkApi = require("./vk");

/**
 * @param {{longpoll:Object}} vk
 * @param {function({text: string, peer_id: number})} callback
 */
function listenForMessages(vk, callback) {
    vk.longpoll.connect().then((connection) => {
        connection.on('message', async it => {
            const messageParsed = await parseMessage(it)
            callback(messageParsed)
        })
    })
}

exports.listenForMessages = listenForMessages;


/**
 * @param {Array} msgRaw
 * @return {{text: string, peer_id: number}}
 */
async function parseMessage(msgRaw = []) {
    const PEER_ID = 3;
    const TEXT = 5;
    const INFO = 6;


    let msg = {
        text: msgRaw[TEXT],
        peer_id: msgRaw[PEER_ID]
    }

    msg = await enrichMessage(msg)

    const info = msgRaw[INFO]

    if (info.hasOwnProperty("from")) {
        msg.from = info.from
    }

    if (info.hasOwnProperty("attach1_type")) {
        msg.attachment_type = info.attach1_type
    }

    return msg
}

async function enrichMessage(msg) {
    const vk = await vkApi.getVK();

    const res = await vk.call('messages.getConversationsById', {
        peer_ids: msg.peer_id,
        extended: true
    })

    if (res.profiles.length === 1) {
        msg.title = res.profiles[0].first_name + ' ' + res.profiles[0].last_name
    }

    if (res.items[0].hasOwnProperty("chat_settings")) {
        msg.title = res.items[0].chat_settings.title
    }

    return msg
}