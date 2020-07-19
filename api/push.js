const easyvk = require('easyvk');

async function send_message(vk, userId, msg) {
    // Обращаемся к методу messages.send с параметром user_id и message
    await vk.call('messages.send', {
        user_id: userId,
        message: msg, // Текст сообщения, по мануалу ВКонтакте
        random_id: easyvk.randomId()
    })
}

async function send_nut(vk, userId) {
    await vk.call('messages.send', {
        peer_id: userId,
        sticker_id: 163,
        random_id: easyvk.randomId()
    })
}

async function send_hhh(vk, userId) {
    const msg = buildHhh()

    await vk.call('messages.send', {
        peer_id: userId,
        message: msg,
        random_id: easyvk.randomId()
    })
}

/**
 * @return string
 */
function buildHhh() {
    let msg = "х"

    for (let i = 0; i < 200; i++)
        msg += "ЪЪ"

    return msg
}

exports.send_message = send_message;
exports.send_nut = send_nut;
exports.send_hhh = send_hhh;
