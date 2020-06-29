# vk-cli
CLI for VK social network

# Setup guide

To download and install:
```sh
git clone https://github.com/fktrcfylh1234567/vk-cli.git
cd vk-cli

npm i
sudo npm link
```

To auth, use environment variables:
```sh
export vk_username=<your_username>
export vk_pass=<your_password>
```

(Optional) To enable bash autocomplete, add this line to your .bashrc file:
```sh
complete -W "status push id ls help" vk-cli
```

# Usage

List last chats
```sh
vk-cli ls
vk-cli ls -d <depth>
```

List chats with new messages 
```sh
vk-cli status
```
Send message
```sh
vk-cli push <peer-id> -m <message>
```
