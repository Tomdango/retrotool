import { APIGatewayProxyHandler } from "aws-lambda";

export const main: APIGatewayProxyHandler = async (event) => {
  return { statusCode: 200, body: "Some Secure Data!" };
};
