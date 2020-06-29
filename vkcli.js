#!/usr/bin/env node
const program = require("commander").program;
const {listen, whoIAm, status, push, list, pull} = require("./commands")

program
    .command('status')
    .description('list all unread chats')
    .option('-f, --force', 'marks conversation as read')
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
    .command('listen')
    .description('listen for messages')
    .action(listen);

program
    .command('push <destination>')
    .description('push a message')
    .option('-m, --message <message>', 'Specify a message')
    .option('-n, --nut', 'Push nut of justice ')
    .action(async (destination, cmd) => await push(destination, cmd));

program
    .command('pull <peer_id>')
    .description('pull unread messages from chat')
    .option('-d, --depth <count>', 'Specify how many messages to pull')
    .action(async (peer_id, cmd) => await pull(peer_id, cmd));

program.parse(process.argv);