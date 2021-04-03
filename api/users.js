async function getUserFullName(vk, userId) {
    const info = await getUserInfo(vk, userId)
    return info[0].first_name + " " + info[0].last_name
}

/**
 * @return {{first_name:string, last_name:string}}
 */
async function getUserInfo(vk, userId) {
    return await vk.call('users.get', {
        user_ids: userId,
    })
}

exports.getUserInfo = getUserInfo;
exports.getUserFullName = getUserFullName;
