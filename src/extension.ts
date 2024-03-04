// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import fs from "fs";
import os from "os";

let extensionPath = vscode.extensions
  .getExtension("Bahman.vsxcode-themes")
  ?.extensionPath.toString();
let stylePath = extensionPath + "/themes/widget.css";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  let enableGlassySuggestWidgetCommand = vscode.commands.registerCommand(
    "bahman.enable-glassy-sugesst-widget",
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
    "bahman.disable-glassy-sugesst-widget",
    () => {
      let configs = vscode.workspace.getConfiguration();
      let imports = configs.get("apc.imports") as string[];
      if (imports.includes(stylePath)) {
        configs.update(
          "apc.imports",
          [...imports.filter((item) => item != stylePath)],
          vscode.ConfigurationTarget.Global
        );
      }
    }
  );

  context.subscriptions.push(enableGlassySuggestWidgetCommand);
  context.subscriptions.push(disableGlassySuggestWidgetCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {
  vscode.commands.executeCommand("bahman.disable-glassy-sugesst-widget")
}
