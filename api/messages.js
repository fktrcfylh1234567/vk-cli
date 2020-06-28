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

exports.send_message = send_message;
exports.send_nut = send_nut;
