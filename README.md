# Better Jest

Better Jest is the cleanest and fastest Jest runner for VS Code.

![Demo GIF](demo2.gif)

## Run a test method:
- Place your cursor in/on the method you want to run
- Open the command menu: `cmd+shift+p`
- Select: `Better Jest: run`

## Run a test file:
- Open the command menu: `cmd+shift+p`
- Select: `Better Jest: run-file`

## Run the entire suite:
- Open the command menu: `cmd+shift+p`
- Select: `Better Jest: run suite`

## Run the previous test:
- Open the command menu: `cmd+shift+p`
- Select: `Better Jest: run previous`

## Features:
- Color output!
- Run individual methods by placing your cursor anywhere in/on the method
- Test failures are displayed in the "Problems" panel for quick access

> Note: this plugin registers "tasks" to run jest, not a command like other extensions. This makes it possible to leverage the problem output and color terminal.

Keybindings:
```
{
    "key": "cmd+k cmd+r",
    "command": "better-jest.run"
},
{
    "key": "cmd+k cmd+f",
    "command": "better-jest.run-file"
},
{
    "key": "cmd+k cmd+p",
    "command": "better-jest.run-previous"
}
```
