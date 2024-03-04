import path from "path";
import * as vscode from "vscode";

let extension = vscode.extensions.getExtension("Bahman.vsxcode-themes");
let rootPath = extension?.extensionPath.toString() || '/';
let stylePath = path.join(rootPath, "themes/widget.css");

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
  vscode.commands.executeCommand("bahman.disable-glassy-sugesst-widget");
}
