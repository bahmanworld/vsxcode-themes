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
const vscode = __importStar(require("vscode"));
const path_1 = __importDefault(require("path"));
let extension = vscode.extensions.getExtension("Bahman.vsxcode-themes");
let extensionPath = extension?.extensionPath.toString() || "";
let stylePath = path_1.default.join(extensionPath, "themes/vsxcode-widget.css");
const toggleGlassySuggestWidgetCallback = (action = "enable") => {
    let eid = extension?.id || "vsxcode";
    let key = "vsxcode-widget.css";
    let configs = vscode.workspace.getConfiguration();
    let imports = configs.get("apc.imports");
    imports = imports
        .filter((item) => !item.includes(eid))
        .filter((item) => !item.includes(key));
    action === "enable" && imports.push(stylePath);
    configs.update("apc.imports", imports, vscode.ConfigurationTarget.Global);
};
function activate(context) {
    let enableGlassySuggestWidgetCommand = vscode.commands.registerCommand("bahman.enable-glassy-suggest-widget", () => toggleGlassySuggestWidgetCallback("enable"));
    let reloadGlassySuggestWidgetCommand = vscode.commands.registerCommand("bahman.reload-glassy-suggest-widget", () => toggleGlassySuggestWidgetCallback("enable"));
    let disableGlassySuggestWidgetCommand = vscode.commands.registerCommand("bahman.disable-glassy-suggest-widget", () => toggleGlassySuggestWidgetCallback("disable"));
    context.subscriptions.push(enableGlassySuggestWidgetCommand);
    context.subscriptions.push(reloadGlassySuggestWidgetCommand);
    context.subscriptions.push(disableGlassySuggestWidgetCommand);
}
exports.activate = activate;
function deactivate() {
    vscode.commands.executeCommand("bahman.disable-glassy-suggest-widget");
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map