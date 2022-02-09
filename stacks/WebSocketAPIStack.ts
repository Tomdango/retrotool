import * as sst from "@serverless-stack/resources";
import { WebSocketApiAuthorizationType } from "@serverless-stack/resources";
import type { Actions } from "../libs/types/WebSocketTypes";
import DynamoDBStack from "./DynamoDBStack";

type WebSocketAPIStackProps = sst.StackProps & {
  auth: sst.Auth;
  dynamoDBStack: DynamoDBStack;
};

class WebSocketAPIStack extends sst.Stack {
  public api: sst.WebSocketApi;

  constructor(scope: sst.App, props: WebSocketAPIStackProps) {
    super(scope, "websocket-api-stack", props);

    this.api = this.createWebSocketAPI(props.dynamoDBStack.getTableNames());
    this.api.attachPermissions(props.dynamoDBStack.getAllTables());

    props.auth.attachPermissionsForAuthUsers([this.api]);

    // Show the endpoint in the output
    this.addOutputs({
      WebsocketApiEndpoint: this.api.url,
    });
  }

  private createWebSocketAPI(
    environment: Record<string, string>
  ): sst.WebSocketApi {
    const routes: Record<Actions, string> = {
      $connect: "websocket/handlers/Connect.main",
      $disconnect: "websocket/handlers/Disconnect.main",
      AddSubscription: "websocket/handlers/AddSubscription.main",
      SendMessage: "websocket/handlers/SendMessage.main",
      SetupRetro: "websocket/handlers/SetupRetro.main",
      SyncRetroData: "websocket/handlers/SyncRetroData.main",
    };

    return new sst.WebSocketApi(this, "websocket-api", {
      defaultFunctionProps: { environment },
      authorizationType: WebSocketApiAuthorizationType.IAM,
      routes,
    });
  }
}

export default WebSocketAPIStack;
