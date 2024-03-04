import path from "path";
import * as vscode from "vscode";

let extension = vscode.extensions.getExtension("Bahman.vsxcode-themes");
let rootPath = extension?.extensionPath.toString() || "/";
let stylePath = path.join(rootPath, "themes/vsxcode-widget.css");

export function activate(context: vscode.ExtensionContext) {
  let enableGlassySuggestWidgetCommand = vscode.commands.registerCommand(
    "bahman.enable-glassy-suggest-widget",
    () => {
      let configs = vscode.workspace.getConfiguration();
      let imports = configs.get("apc.imports") as string[];
      if (!imports.includes(stylePath)) {
        configs.update(
          "apc.imports",
          [...imports, stylePath],
          vscode.ConfigurationTarget.Global
        );
      }
    }
  );

  let disableGlassySuggestWidgetCommand = vscode.commands.registerCommand(
    "bahman.disable-glassy-suggest-widget",
    () => {
      let configs = vscode.workspace.getConfiguration();
      let imports = configs.get("apc.imports") as string[];
      let eid = extension?.id || "vsxcode";
      let key = "vsxcode-widget.css";
      configs.update(
        "apc.imports",
        [
          ...imports
            .filter((item) => !item.includes(eid))
            .filter((item) => !item.includes(key)),
        ],
        vscode.ConfigurationTarget.Global
      );
    }
  );

  context.subscriptions.push(enableGlassySuggestWidgetCommand);
  context.subscriptions.push(disableGlassySuggestWidgetCommand);
}

export function deactivate() {
  vscode.commands.executeCommand("bahman.disable-glassy-suggest-widget");
}
