const vscode = require('vscode');
const path = require('path');

module.exports = class JestCommand {
    constructor(options) {
        this.runFullSuite = options !== undefined
            ? options.runFullSuite
            : false;

        this.runFile = options !== undefined
            ? options.runFile
            : false;

        this.lastOutput;
    }

    get output() {
        if (this.lastOutput) {
            return this.lastOutput;
        }

        if (this.runFullSuite) {
            this.lastOutput = `${this.binary}`
        } else if (this.runFile) {
            this.lastOutput = `${this.binary} ${this.file}`;
        } else {
            this.lastOutput = `${this.binary} ${this.file} ${this.filter}`;
        }

        return this.lastOutput;
    }

    get file() {
        return this._normalizePath(vscode.window.activeTextEditor.document.fileName);
    }

    get filter() {
        return ` -t '${this.method}'`;
    }

    get binary() {
        if (vscode.workspace.getConfiguration('better-jest').get('jestBinary')) {
            return vscode.workspace.getConfiguration('better-jest').get('jestBinary')
        }

        return this._normalizePath(path.join(vscode.workspace.rootPath, 'node_modules', '.bin', 'jest'));
    }

    get method() {
        let line = vscode.window.activeTextEditor.selection.active.line;
        let method;

        while (line > 0) {
            const lineText = vscode.window.activeTextEditor.document.lineAt(line).text;
            const match = lineText.match(/^\s*(?:test|it)?\s*\(\s*(?:'|")(.*?)\s*(?:'|").*$/);
            if (match) {
                method = match[1];
                break;
            }
            line = line - 1;
        }

        method = method.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

        return method;
    }

    _normalizePath(path) {
        return path
            .replace(/\\/g, '/') // Convert backslashes from windows paths to forward slashes, otherwise the shell will ignore them.
            .replace(/ /g, '\\ '); // Escape spaces.
    }
}
