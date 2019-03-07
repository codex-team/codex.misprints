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
    chatId: 'XXXXXXX'
});
```
Where `chatId` is chat's identifier where message will be sent.
Take a look on [Webhooks](https://github.com/codex-bot/Webhooks) to get it.