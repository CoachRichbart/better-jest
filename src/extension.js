const vscode = require('vscode');
const assert = require('assert');
const JestCommand = require('./jest-command');

var globalCommand;

module.exports.activate = function (context) {
    let disposables = [];

    disposables.push(vscode.commands.registerCommand('better-jest.run', async () => {
        let command = new JestCommand;

        await runCommand(command);
    }));

    disposables.push(vscode.commands.registerCommand('better-jest.run-file', async () => {
        let command = new JestCommand({ runFile: true });

        await runCommand(command);
    }));

    disposables.push(vscode.commands.registerCommand('better-jest.run-suite', async () => {
        let command = new JestCommand({ runFullSuite: true });

        await runCommand(command);
    }));

    disposables.push(vscode.commands.registerCommand('better-jest.run-previous', async () => {
        await runPreviousCommand();
    }));

    disposables.push(vscode.tasks.registerTaskProvider('jest', {
        provideTasks: () => {
            return [new vscode.Task(
                { type: "jest", task: "run" },
                2,
                "run",
                'jest',
                new vscode.ShellExecution(globalCommand.output),
                '$jest'
            )];
        }
    }));

    context.subscriptions.push(disposables);
}

async function runCommand(command) {
    setGlobalCommandInstance(command);

    vscode.window.activeTextEditor
        || vscode.window.showErrorMessage('Better Jest: open a file to run this command');

    await vscode.commands.executeCommand('workbench.action.terminal.clear');
    await vscode.commands.executeCommand('workbench.action.tasks.runTask', 'jest: run');
}

async function runPreviousCommand() {
    await vscode.commands.executeCommand('workbench.action.terminal.clear');
    await vscode.commands.executeCommand('workbench.action.tasks.runTask', 'jest: run');
}

function setGlobalCommandInstance(commandInstance) {
    // Store this object globally for the provideTasks, "run-previous", and for tests to assert against.
    globalCommand = commandInstance;
}

// This method is exposed for testing purposes.
module.exports.getGlobalCommandInstance = function () {
    return globalCommand;
}
