import { APIGatewayProxyHandler } from "aws-lambda";

export const main: APIGatewayProxyHandler = async (event) => {
  const connectionID = event.requestContext.connectionId as string;

  return {
    statusCode: 200,
    body: "Message Sent",
  };
};
