import { APIGatewayProxyHandler } from "aws-lambda";
import { sendMessageToConnection } from "retrotool-libs/MessageLib";
import RetrospectiveModel from "retrotool-libs/models/RetrospectiveModel";

export const main: APIGatewayProxyHandler = async (event) => {
  const connectionID = event.requestContext.connectionId as string;

  const body = JSON.parse(event.body || "null");
  if (!body) {
    return { statusCode: 401, body: "" };
  }

  const { name, type } = body.data;
  const retro = await RetrospectiveModel.create({ name, type });

  await sendMessageToConnection(event.requestContext, connectionID, {
    action: "SUCCESS:CREATED_RETRO",
    retro: retro.toObject(),
  });

  return { statusCode: 200, body: "Start" };
};
