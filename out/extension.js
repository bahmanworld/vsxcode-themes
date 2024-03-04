"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
let extensionPath = vscode.extensions
    .getExtension("Bahman.vsxcode-themes")
    ?.extensionPath.toString();
let stylePath = extensionPath + "/themes/widget.css";
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    let enableGlassySuggestWidgetCommand = vscode.commands.registerCommand("bahman.enable-glassy-sugesst-widget", () => {
        let configs = vscode.workspace.getConfiguration();
        let imports = configs.get("apc.imports");
        if (!imports.includes(stylePath)) {
            configs.update("apc.imports", [...imports, stylePath], vscode.ConfigurationTarget.Global);
        }
    });
    let disableGlassySuggestWidgetCommand = vscode.commands.registerCommand("bahman.disable-glassy-sugesst-widget", () => {
        let configs = vscode.workspace.getConfiguration();
        let imports = configs.get("apc.imports");
        if (imports.includes(stylePath)) {
            configs.update("apc.imports", [...imports.filter((item) => item != stylePath)], vscode.ConfigurationTarget.Global);
        }
    });
    context.subscriptions.push(enableGlassySuggestWidgetCommand);
    context.subscriptions.push(disableGlassySuggestWidgetCommand);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() {
    vscode.commands.executeCommand("bahman.disable-glassy-sugesst-widget");
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map