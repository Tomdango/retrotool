import { APIGatewayProxyHandler } from "aws-lambda";
import Connection from "retrotool-libs/models/ConnectionModel";

export const main: APIGatewayProxyHandler = async (event) => {
  const connectionID = event.requestContext.connectionId as string;
  await Connection.deleteByID(connectionID);

  return { statusCode: 200, body: "Disconnected" };
};
