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
    - [image](#image)
    - [text](#text)
    - [fontList](#fontlist)
    - [help](#help)

## Command syntax

To trigger a command send a message that starts with  a mention to the bot or with `ASCII`, for example:

- `@ASCII#9369 <command> [options]`
- `ASCII <command> [options]`

## Options syntax

The options syntax is similar to the syntax of linux commands.

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
  none

**Example**:

  ```txt
    user > ASCII ping
    ASCII> Pong! Latency is 641ms. API Latency is 127ms
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

  Must be a font name, you can get a list using the [fontList](#fontlist) command.
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

### fontList

**Description**:
Responds with a list of fonts.
In order to not spam the chat the list will be sent in your DMs.

**Usage**:
  `ASCII fontList [options]`

**Options**:

- `--searchString`, `--stringSearch`, `--search`, `--string` `-s`:

  Must be a string.
  The string to search in the font names, case insensitive.

**Example**:

  ```txt
    user > ASCII fontList
    ASCII> 1Row, 3-D, 3D_Diagonal, 3D-ASCII, 3x5,
           4Max, 5_Line Oblique, Acrobatic ...
  ```

  ```txt
    user > ASCII fontList --search 3D
    ASCII> 3D_Diagonal, 3D-ASCII, Henry_3D,
           Larry_3D 2, Larry_3D
  ```

### help

To be implemented
