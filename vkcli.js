#!/usr/bin/env node

const program = require("commander").program;

const vkApi = require("./api/vk");
const conversations = require("./api/conversations");
const messages = require("./api/messages");

async function status() {
    const vk = await vkApi.getVK()
    const data = await conversations.getUnreadConversations(vk)
    console.log(data)
}

/**
 * @param {{depth:number}} cmd
 */
async function list(cmd) {
    const vk = await vkApi.getVK()
    const data = await conversations.getAllConversations(vk, cmd.depth || 5)
    console.log(data)
}

/**
 * @param target
 * @param {{nut:boolean, message:string}} cmd
 */
async function push(target, cmd) {
    const vk = await vkApi.getVK()

    if (cmd.nut) {
        await messages.send_nut(vk, target)
        console.log("Nut pushed successfully.")
        return
    }

    if (cmd.message !== undefined) {
        await messages.send_message(vk, target, cmd.message)
        console.log("Message pushed successfully.")
    }
}

async function whoIAm() {
    const vk = await vkApi.getVK()
    const me = await vk.session.user_id
    console.log("My id:", me)
}

program
    .command('status')
    .description('list all unread chats')
    .action(status);

program
    .command('id')
    .description('get your user_id')
    .action(whoIAm);

program
    .command('ls')
    .description('list last chats')
    .option('-d, --depth <count>', 'Specify how many chats to list')
    .action(async (cmd) => await list(cmd));

program
    .command('push <destination>')
    .description('push a message')
    .option('-m, --message <message>', 'Specify a message')
    .option('-n, --nut', 'Push nut of justice ')
    .action(async (destination, cmd) => await push(destination, cmd));

program.parse(process.argv);