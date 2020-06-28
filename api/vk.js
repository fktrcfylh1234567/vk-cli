const easyvk = require('easyvk');
const path = require('path');

exports.getVK = async () => await easyvk({
    username: process.env.vk_username,
    password: process.env.vk_pass,
    sessionFile: path.join(__dirname, '.my-session')
})