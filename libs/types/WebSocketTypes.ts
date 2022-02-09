export type CoreActions = "$connect" | "$disconnect";
export type DefinedActions =
  | "AddSubscription"
  | "SendMessage"
  | "SetupRetro"
  | "SyncRetroData";

export type Actions = CoreActions | DefinedActions;
