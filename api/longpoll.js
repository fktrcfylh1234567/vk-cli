/**
 * Called after doing asynchronous stuff.
 * @name OnNewMessageCallback
 * @function
 * @param {String} msg
 */

/**
 * @param {{longpoll:Object}} vk
 * @param {function({text: string, peer_id: number})} callback
 */
function listenForMessages(vk, callback) {
    vk.longpoll.connect().then((connection) => {
        connection.on('message', (it) => {
            const messageParsed = parseMessage(it)
            callback(messageParsed)
        })
    })
}

exports.listenForMessages = listenForMessages;


/**
 * @param {Array} msgRaw
 * @return {{text: string, peer_id: number}}
 */
function parseMessage(msgRaw = []) {
    const PEER = 3;
    const TEXT = 5;
    const INFO = 6;

    const msg = {
        text: msgRaw[TEXT],
        peer_id: msgRaw[PEER]
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