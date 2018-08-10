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

- [Discord ASCII bot](#discord-ascii-bot)
  - [Using this bot](#using-this-bot)
  - [Command help](#command-help)
  - [Deploying the bot yourself](#deploying-the-bot-yourself)

## Using this bot

You can add this bot to your discord server [here](https://discordbots.org/bot/326619566719369217) or [deploy it by yourself](#deploying-the-bot-yourself).

## Command help

See [help.md](help.md) for help on how to use the commands.

## Deploying the bot yourself

1. Clone this repository
2. Install dependencies with `npm install`
3. Add the `.env` file
    1. Create a `.env` file in the root of the repository (just a normal text file called `.env`)
    2. Add the following fields:
      - `TOKEN=your_discord_token` the discord token (required)
      - `TOKEN_DBL=your_discordBotList_token` the DBL token (optional)
      - `NODE_ENV=the_node_env` node environment: production or development (optional)
      - `DEBUG_LEVEL=debug level` the debug level (optional)
4. Start the bot with `npm start`
