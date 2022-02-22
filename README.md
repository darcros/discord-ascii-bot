# Discord ASCII bot

```
 ▄▄▄· .▄▄ ·  ▄▄· ▪  ▪      ▄▄▄▄·       ▄▄▄▄▄
▐█ ▀█ ▐█ ▀. ▐█ ▌▪██ ██     ▐█ ▀█▪▪     •██
▄█▀▀█ ▄▀▀▀█▄██ ▄▄▐█·▐█·    ▐█▀▀█▄ ▄█▀▄  ▐█.▪
▐█ ▪▐▌▐█▄▪▐█▐███▌▐█▌▐█▌    ██▄▪▐█▐█▌.▐▌ ▐█▌·
 ▀  ▀  ▀▀▀▀ ·▀▀▀ ▀▀▀▀▀▀    ·▀▀▀▀  ▀█▄▀▪ ▀▀▀
```

A Discord bot that creates ASCII art.
Created with Node.js using the discord.js library.

## Adding the bot

You can add this bot to your discord server [here](https://discordbots.org/bot/326619566719369217).

## Usage

This bot adds a slash command and a message interaction:
- `/ascii-text` Converts a text to ASCII art using FIGlet
- `right click message with an image attachment > apps > Image to ASCII` Converts all images attached to the message into ASCII art

## Deploying

1. Clone this repository
2. Install dependencies with `npm install`
3. Add a `.env` file (envirnoment variables described below)
4. Register bot commands by running one of the following:
    - `npm run discord:register-commands` register the commands only for the guild specified by `GUILD_ID`
    - `npm run discord:register-commands:global` register the commands globally
5. Start the bot with `npm start`

### Env variables

| env variable |                                                             |
| ------------ | ----------------------------------------------------------- |
| TOKEN        | The discord API token                                       |
| CLIENT_ID    | Client id of the application, needed to register commands   |
| GUILD_ID     | Guild id, needed to run `npm run discord:register-commands` |
