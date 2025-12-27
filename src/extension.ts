import * as vscode from "vscode";
import { callApi } from "./apiCaller";
import { compareResponses } from "./comparer";
import { ApiConfig } from "./types";

export function activate(context: vscode.ExtensionContext) {

  const disposable = vscode.commands.registerCommand(
    "apiCompare.start",
    async () => {

      try {
        // API 1
        const api1Url = await vscode.window.showInputBox({ prompt: "API 1 URL" });
        const api2Url = await vscode.window.showInputBox({ prompt: "API 2 URL" });

        if (!api1Url || !api2Url) {
          vscode.window.showErrorMessage("Both URLs required");
          return;
        }

        const method = await vscode.window.showQuickPick(
          ["GET", "POST"],
          { placeHolder: "Select HTTP Method" }
        );

        if (!method) return;

        const bodyInput = await vscode.window.showInputBox({
          prompt: "Request Body (JSON) - optional"
        });

        let bodyObj: any = undefined;
        if (bodyInput) {
          bodyObj = JSON.parse(bodyInput);
        }

        const api1: ApiConfig = {
          url: api1Url,
          method: method as any,
          body: bodyObj
        };

        const api2: ApiConfig = {
          url: api2Url,
          method: method as any,
          body: bodyObj
        };

        const res1 = await callApi(api1);
        const res2 = await callApi(api2);

        const differences = compareResponses(res1, res2);

        const doc = await vscode.workspace.openTextDocument({
          content: JSON.stringify(differences, null, 2),
          language: "json"
        });

        vscode.window.showTextDocument(doc);

      } catch (err: any) {
        vscode.window.showErrorMessage(err.message);
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
