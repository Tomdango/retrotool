import { APIGatewayProxyHandler } from "aws-lambda";
import { sendMessageToConnection } from "retrotool-libs/MessageLib";
import Retrospective from "retrotool-libs/models/RetrospectiveModel";

export const main: APIGatewayProxyHandler = async (event) => {
  const connectionID = event.requestContext.connectionId as string;
  const { retroID } = JSON.parse(event.body || '{"data": {}}').data;

  const retro = await Retrospective.getByID(retroID);

  if (retro === null) {
    return { statusCode: 400, body: "Retro Not Found" };
  }

  for (var i = 0; i < 2; i++) {
    await sendMessageToConnection(event.requestContext, connectionID, {
      action: "SUCCESS::SYNC_RETRO_DATA",
      retro: retro.toObject(),
    });

    await new Promise((r) => setTimeout(r, 1000));
  }

  return { statusCode: 200, body: "Connected" };
};
