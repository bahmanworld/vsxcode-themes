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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const vscode = __importStar(require("vscode"));
let extension = vscode.extensions.getExtension("Bahman.vsxcode-themes");
let extensionPath = extension?.extensionPath.toString() || '';
let stylePath = path_1.default.join(extensionPath, "themes/vsxcode-widget.css");
let widgetPath = path_1.default.join(os_1.default.homedir(), ".vsxcode");
if (!fs_1.default.existsSync(widgetPath)) {
    fs_1.default.mkdirSync(widgetPath, { recursive: true });
}
fs_1.default.copyFileSync(stylePath, path_1.default.join(widgetPath, "vsxcode-widget.css"));
function activate(context) {
    let enableGlassySuggestWidgetCommand = vscode.commands.registerCommand("bahman.enable-glassy-suggest-widget", () => {
        let configs = vscode.workspace.getConfiguration();
        let imports = configs.get("apc.imports");
        if (!imports.includes(stylePath)) {
            configs.update("apc.imports", [...imports, stylePath], vscode.ConfigurationTarget.Global);
        }
    });
    let disableGlassySuggestWidgetCommand = vscode.commands.registerCommand("bahman.disable-glassy-suggest-widget", () => {
        let configs = vscode.workspace.getConfiguration();
        let imports = configs.get("apc.imports");
        configs.update("apc.imports", [...imports.filter((item) => !item.includes(stylePath))], vscode.ConfigurationTarget.Global);
        // let eid = extension?.id || "vsxcode";
        // let key = "vsxcode-widget.css";
        // configs.update(
        //   "apc.imports",
        //   [
        //     ...imports
        //       .filter((item) => !item.includes(eid))
        //       .filter((item) => !item.includes(key)),
        //   ],
        //   vscode.ConfigurationTarget.Global
        // );
    });
    context.subscriptions.push(enableGlassySuggestWidgetCommand);
    context.subscriptions.push(disableGlassySuggestWidgetCommand);
}
exports.activate = activate;
function deactivate() {
    vscode.commands.executeCommand("bahman.disable-glassy-suggest-widget");
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map