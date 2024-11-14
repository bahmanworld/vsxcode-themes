import * as vscode from "vscode";
import path from "path";

let extension = vscode.extensions.getExtension("Bahman.vsxcode-themes");
let extensionPath = extension?.extensionPath.toString() || "";
let stylePath = path.join(extensionPath, "dist/widgets.min.css");

type Action = "enable" | "disable";

const toggleGlassySuggestWidgetCallback = (action: Action = "enable") => {
  let eid = extension?.id || "vsxcode";
  let key = "widgets.min.css";
  let configs = vscode.workspace.getConfiguration();
  let imports = configs.get("vscode_custom_css.imports") as string[];
  imports = imports
    .filter((item) => !item.includes(eid))
    .filter((item) => !item.includes(key));
  action === "enable" && imports.push(`file://${stylePath}`);
  configs.update("vscode_custom_css.imports", imports, vscode.ConfigurationTarget.Global);
};

export function activate(context: vscode.ExtensionContext) {
  let enableGlassySuggestWidgetCommand = vscode.commands.registerCommand(
    "bahman.enable-glassy-widgets",
    () => toggleGlassySuggestWidgetCallback("enable")
  );

  let disableGlassySuggestWidgetCommand = vscode.commands.registerCommand(
    "bahman.disable-glassy-widgets",
    () => toggleGlassySuggestWidgetCallback("disable")
  );

  context.subscriptions.push(enableGlassySuggestWidgetCommand);
  context.subscriptions.push(disableGlassySuggestWidgetCommand);
}

export function deactivate() {
  vscode.commands.executeCommand("bahman.disable-glassy-widgets");
}
