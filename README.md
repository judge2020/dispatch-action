# discord-dispatch-github-action
 Discord Dispatch tool as a GH Action


## Usage

To authenticate, you'll need a Bot token from the same application that you're publishing from. See [the docs](https://discordapp.com/developers/docs/dispatch/branches-and-builds#authorizing-yourself-to-use-it) for information on that.

Once you've done that, you can use the action like so:

```
steps:
  - uses: judge2020/discord-dispatch-github-action@master
    with:
      application-id: '10203040506070809'
      bot-token: ${{ secrets.DISCORD_BOT_TOKEN }}
```

This will "set up" the action. Once it runs you can use dispatch commands like normal in bash/powershell (you will still need to use the app ID in these commands):

```
- run: |
    dispatch branch list 10203040506070809
```
