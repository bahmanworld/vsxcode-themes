import * as vscode from "vscode";
import path from "path";

let extension = vscode.extensions.getExtension("Bahman.vsxcode-themes");
let extensionPath = extension?.extensionPath.toString() || "";
let stylePath = path.join(extensionPath, "dist/widget.min.css");



type Action = "enable" | "disable";

const toggleGlassySuggestWidgetCallback = (action: Action = "enable") => {
  let eid = extension?.id || "vsxcode";
  let key = "widget.min.css";
  let configs = vscode.workspace.getConfiguration();
  let imports = configs.get("apc.imports") as string[];
  imports = imports
    .filter((item) => !item.includes(eid))
    .filter((item) => !item.includes(key));
  action === "enable" && imports.push(stylePath);
  configs.update("apc.imports", imports, vscode.ConfigurationTarget.Global);
};

export function activate(context: vscode.ExtensionContext) {
  let enableGlassySuggestWidgetCommand = vscode.commands.registerCommand(
    "bahman.enable-glassy-suggest-widget",
    () => toggleGlassySuggestWidgetCallback("enable")
  );

  let reloadGlassySuggestWidgetCommand = vscode.commands.registerCommand(
    "bahman.reload-glassy-suggest-widget",
    () => toggleGlassySuggestWidgetCallback("enable")
  );

  let disableGlassySuggestWidgetCommand = vscode.commands.registerCommand(
    "bahman.disable-glassy-suggest-widget",
    () => toggleGlassySuggestWidgetCallback("disable")
  );

  context.subscriptions.push(enableGlassySuggestWidgetCommand);
  context.subscriptions.push(reloadGlassySuggestWidgetCommand);
  context.subscriptions.push(disableGlassySuggestWidgetCommand);
}

export function deactivate() {
  vscode.commands.executeCommand("bahman.disable-glassy-suggest-widget");
}
