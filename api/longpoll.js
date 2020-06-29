function parseMessage(msgRaw = []) {
    const IS_OUT = 2;
    const PEER = 3;
    const TEXT = 5;
    const INFO = 6;

    const msg = {
        text: msgRaw[TEXT],
        peer_id: msgRaw[PEER],
        isOut: msgRaw[IS_OUT]
    }

    const info = msgRaw[INFO]

    if (info.hasOwnProperty("from")) {
        msg.from = info.from
    }

    if (info.hasOwnProperty("attach1_type")) {
        msg.attachment_type = info.attach1_type
    }

    return msg
}

/**
 * @param {{longpoll:Object}} vk
 */
async function listenForMessages(vk) {
    vk.longpoll.connect().then((connection) => {
        connection.on('message', (it) => {
            const messageParsed = parseMessage(it)
            console.log(messageParsed)
            console.log('')
        })
    })
}

exports.listenForMessages = listenForMessages;