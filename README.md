# codex.misprints
Module for sending misprints to Slack and Telegram

## Getting started

### Installation

#### npm or Yarn

```bash
npm install @codexteam/misprints
```

or

```bash
yarn add @codexteam/misprints
```

#### Download from CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@codexteam/misprints"></script>
```

## Usage

### Initialization
```javascript
new Misprints({
    chatId: 'XXXXXXX',
    shortcut: 'shift+a'
});
```

Where

| name        | type      | description                                                                              |
|-------------|-----------|------------------------------------------------------------------------------------------|
| chatId      | `string`  | chat where message will be sent. Visit https://github.com/codex-bot/Webhooks) to get it. |
| shortcut    | `string`  | Shortcut triggers message sending. See https://github.com/codex-team/codex.shortcuts     |