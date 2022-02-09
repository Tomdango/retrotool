export namespace InboundMessage {
  type Message<Action, Data> = Data & { action: Action };

  export type CreatedRetro = Message<
    "SUCCESS:CREATED_RETRO",
    { retro: { id: string; name: string; type: string } }
  >;

  export type SyncRetroData = Message<
    "SUCCESS::SYNC_RETRO_DATA",
    { retro: { id: string; name: string; type: string } }
  >;

  export type Any = CreatedRetro | SyncRetroData;
}

export namespace OutboundMessage {
  type Message<Action, Data> = { action: Action; data: Data };

  export type SetupRetro = Message<
    "SetupRetro",
    { name: string; type: string }
  >;
  export type SyncRetroData = Message<"SyncRetroData", { retroID: string }>;

  export type Any = SetupRetro | SyncRetroData;
}
