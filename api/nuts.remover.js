const vkApi = require("./vk");

exports.removeNuts = async (chatId) => {
    const vk = await vkApi.getVK()

    const res = await vk.call('messages.getHistory', {
        peer_id: chatId,
        count: 200,
        fields: "id"
    })

    const nuts = res.items.filter(it =>
        it.hasOwnProperty("attachments") &&
        it.attachments[0] !== undefined &&
        it.attachments[0].type === "sticker" &&
        it.attachments[0].sticker.product_id === 4 &&
        it.attachments[0].sticker.sticker_id === 163
    )

    const nutsIds = nuts.map(it => it.id)
    console.log(nutsIds)

    if (nutsIds.length < 1)
        return

    const deletionRes = await vk.call('messages.delete', {
        message_ids: nutsIds.join(','),
        delete_for_all: true
    })
    console.log(deletionRes)
}
