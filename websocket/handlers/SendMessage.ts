import { APIGatewayProxyHandler } from "aws-lambda";
import { sendMessageToGroup } from "retrotool-libs/MessageLib";
import Connection from "retrotool-libs/models/ConnectionModel";

export const main: APIGatewayProxyHandler = async (event) => {
  if (!event.body) throw new Error("Empty Body");

  const messageData = JSON.parse(event.body).data;

  const connections = await Connection.all();

  const connectionIDs = connections.map((conn) => conn.id);

  if (!connectionIDs) {
    return { statusCode: 400, body: "No Recipients For Message" };
  }

  await sendMessageToGroup(event.requestContext, connectionIDs, messageData);

  return { statusCode: 200, body: "Message Sent" };
};
