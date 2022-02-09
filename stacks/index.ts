import * as sst from "@serverless-stack/resources";
import APIStack from "./APIStack";
import AuthStack from "./AuthStack";
import DynamoDBStack from "./DynamoDBStack";
import FrontendStack from "./FrontendStack";
import WebSocketAPIStack from "./WebSocketAPIStack";

export default function main(app: sst.App): void {
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
  });

  const authStack = new AuthStack(app);
  const dynamoDBStack = new DynamoDBStack(app);

  const websocketApiStack = new WebSocketAPIStack(app, {
    auth: authStack.auth,
    dynamoDBStack,
  });
  const apiStack = new APIStack(app, { auth: authStack.auth, dynamoDBStack });

  new FrontendStack(app, {
    api: apiStack.api,
    websocketApi: websocketApiStack.api,
    auth: authStack.auth,
  });
}
