import { APIGatewayProxyHandler } from "aws-lambda";
import Connection from "retrotool-libs/models/ConnectionModel";

export const main: APIGatewayProxyHandler = async (event) => {
  const connectionID = event.requestContext.connectionId as string;
  const connection = new Connection({
    id: connectionID,
    retroID: Connection.DEFAULT_RETRO_ID,
  });

  await connection.save();

  return { statusCode: 200, body: "Connected" };
};
