import path from "path";
import os from "os";
import fs from "fs";
import * as vscode from "vscode";

let extension = vscode.extensions.getExtension("Bahman.vsxcode-themes");
let extensionPath = extension?.extensionPath.toString() || '';
let stylePath = path.join(extensionPath, "themes/vsxcode-widget.css");
let widgetPath = path.join(os.homedir(), ".vsxcode");
if (!fs.existsSync(widgetPath)) {
  fs.mkdirSync(widgetPath, { recursive: true });
}
fs.copyFileSync(stylePath, path.join(widgetPath, "vsxcode-widget.css"));

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
      configs.update(
        "apc.imports",
        [...imports.filter((item) => !item.includes(stylePath))],
        vscode.ConfigurationTarget.Global
      );
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
    }
  );

  context.subscriptions.push(enableGlassySuggestWidgetCommand);
  context.subscriptions.push(disableGlassySuggestWidgetCommand);
}

export function deactivate() {
  vscode.commands.executeCommand("bahman.disable-glassy-suggest-widget");
}
