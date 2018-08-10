# ASCII Bot command help

- [ASCII Bot command help](#ascii-bot-command-help)
  - [Command syntax](#command-syntax)
  - [Options syntax](#options-syntax)
    - [Option types](#option-types)
      - [Letter](#letter)
      - [Word](#word)
    - [Positioning](#positioning)
  - [Commands](#commands)
    - [ping](#ping)
    - [info](#info)
    - [image](#image)
    - [text](#text)
    - [fonts](#fonts)
    - [help](#help)

## Command syntax

To trigger a command send a message that starts with a mention to the bot or with `ASCII`, for example:

- `@ASCII#9369 <command> [options]`
- `ASCII <command> [options]`

## Options syntax

The options syntax is similar to the syntax of linux commands.

**NOTE**: every command has a `--help` option that can be used to get help about that command.

### Option types

If the option is one letter it only needs a `-` in front of it, if it's a word in needs `--`.

#### Letter

- **YES**: `-f`
- NO: `--f`

#### Word

- **YES**: `--font`
- NO: `-font`

### Positioning

Always put the options after the command name.

- **YES**: `ASCII <command> text and stuff --option value`
- NO: `ASCII --option value <command> text and stuff`

## Commands

### ping

**Description**:
Responds with `PONG!` and the bot latency in milliseconds (ms).

**Usage**:
  `ASCII ping`

**Options**:

- Like any other command you can use the `--help` flag to get help about this command.

**Example**:

  ```txt
    user > ASCII ping
    ASCII> Pong! Latency is 641ms. API Latency is 127ms
  ```

### info

**Description**:
Responds with info about the bot, such as uptime, servers the bot is in and invites.

**Usage**:
  `ASCII info`

**Options**:

- Like any other command you can use the `--help` flag to get help about this command.

**Example**:

  ```txt
    user > ASCII info
    ASCII> **ASCII info**
           > Uptime: 10min
           > Servers: 69
           > Add me to your server: <https://discordbots.org/bot/326619566719369217>
           > Support server: discordapp.com/...
  ```

### image

**Description**:
Converts all images attached to the message into ASCII art.

**Usage**:
  `ASCII image [options]` (you need to attach images)

**Options**:

- `--height`, `-h`:

  Must be a number bigger or equal to 1.
  Specifies the height of the outputted ASCII art.
  If this option is specified the aspect ratio will be ignored.
  Note that the max size of a Discord message id 2000 character, so `--height` * `--width` must be lower than 200.
  Default = scale to fit.

- `--width`, `-w`:

  Must be a number bigger or equal to 1.
  Specifies the width of the outputted ASCII art.
  If this option is specified the aspect ratio will be ignored.
  Note that the max size of a Discord message id 2000 character, so `--height` * `--width` must be lower than 200.
  Default = scale to fit.

- `--charset`, `--chars`, `-c`:

  Must be a string.
  Specifies which character to use, from darkest lo lightest.
  More characters = more brightness levels = better results.
  Default = "%&#MHGw*+-. "

- Like any other command you can use the `--help` flag to get help about this command.

**Example**:

  ```txt
    user > ASCII image [attachment.jpg]
    ASCII> +--------------------+
           |                    |
           |    Your beautiful  |
           |      ASCII art     |
           |                    |
           +--------------------+
  ```

### text

**Description**:
Converts the text to ASCII art using FIGlet.

**Usage**:
  `ASCII text <your message> [options]`

**Options**:

- `--font`, `-f`

  Must be a font name, you can get a list using the [fonts](#fonts) command.
  Specifies in which font to render your text.
  Default = "standard"

- `-k`, `--kerning`

  Must be one of "default", "fitted", "full".
  Specifies which kerning to use.

- `--horizontalLayout`, `--horizontal`, `--hLayout`, `--hl`, `-h`

  Must be on of "default", "full", "fitted", "controlled smushing", "universal smushing".
  Specifies which horizontal layout to use.
  Default = "default"

- `--verticalLayout`, `--vertical`, `--vLayout`, `--vl`, `-v`

  Must be on of "default", "full", "fitted", "controlled smushing", "universal smushing".
  Specifies which vertical layout to use.
  Default = "default"

- Like any other command you can use the `--help` flag to get help about this command.

**Example**:

  ```txt
    user > ASCII text Hello!
    ASCII>   _   _      _ _       _
            | | | | ___| | | ___ | |
            | |_| |/ _ \ | |/ _ \| |
            |  _  |  __/ | | (_) |_|
            |_| |_|\___|_|_|\___/(_)
  ```

  ```txt
    user > ASCII text Boo! -f Ghost
    ASCII> .-. .-')                            ,---.
           \  ( OO )                           |   |
            ;-----.\  .-'),-----.  .-'),-----. |   |
            | .-.  | ( OO'  .-.  '( OO'  .-.  '|   |
            | '-' /_)/   |  | |  |/   |  | |  ||   |
            | .-. `. \_) |  |\|  |\_) |  |\|  ||  .'
            | |  \  |  \ |  | |  |  \ |  | |  |`--'
            | '--'  /   `'  '-'  '   `'  '-'  '.--.
            `------'      `-----'      `-----' '--'
  ```

### fonts

**Description**:
Responds with a list of fonts.
In order to not spam the chat the list will be sent in your DMs.

**Usage**:
  `ASCII fonts [options]`

**Options**:

- `--searchString`, `--stringSearch`, `--search`, `--string` `-s`:

  Must be a string.
  The string to search in the font names, case insensitive.

- Like any other command you can use the `--help` flag to get help about this command.

**Example**:

  ```txt
    user > ASCII fonts
    ASCII> 1Row, 3-D, 3D_Diagonal, 3D-ASCII, 3x5,
           4Max, 5_Line Oblique, Acrobatic ...
  ```

  ```txt
    user > ASCII fonts --search 3D
    ASCII> 3D_Diagonal, 3D-ASCII, Henry_3D,
           Larry_3D 2, Larry_3D
  ```

### help

**Description**:
Sends help for the bot commands (send links to this file).

**Usage**
  `ASCII help [command name]`

**Options**:

- You can add a command name (as shown in the example) to get the link to the section of the command you specified.

- Like any other command you can use the `--help` flag to get help about this command (even though it would be quite useless to use it here).

**Example**:

```txt
  user > ASCII help
  ASCII> @user#0000, you can find help about all the commands here:
         https://github.com/7ixi0/discord-ascii-bot/blob/master/help.md.
         You can also try `help <commandName>` to get a link to a specific command.
```

```txt
  user > ASCII help image
  ASCII> @user#0000, you can find help about that command here:
         https://github.com/7ixi0/discord-ascii-bot/blob/master/help.md#image
```
