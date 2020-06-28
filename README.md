# vk-cli
CLI for VK social network

# Usage

To auth, use environment variables:
```sh
export vk_username=<your_username>
export vk_pass=<your_password>
```

List last chats
```sh
node vkcli.js chat ls
node vkcli.js chat ls -d <depth>
```

List chats with new messages 
```sh
node  vkcli.js status
```
Send message
```sh
node vk-cli push <peer-id> -m <message>
```
