import { APIGatewayEventRequestContext } from "aws-lambda";
import { ApiGatewayManagementApi } from "aws-sdk";
import Connection from "./models/ConnectionModel";

const createConnectionClient = ({
  domainName,
  stage,
}: APIGatewayEventRequestContext): ApiGatewayManagementApi =>
  new ApiGatewayManagementApi({ endpoint: `${domainName}/${stage}` });

export const sendMessageToConnection = async (
  context: APIGatewayEventRequestContext,
  connectionID: string,
  data: any,
  client?: ApiGatewayManagementApi
) => {
  const connClient = client || createConnectionClient(context);


  try {
    const params = {
      ConnectionId: connectionID,
      Data: JSON.stringify(data),
    };
    await connClient.postToConnection(params).promise();
  } catch (error: any) {
    if (error.statusCode === 410) {
      // Remove Stale Connection
      await Connection.deleteByID(connectionID);
    }
  }
};

export const sendMessageToGroup = async (
  context: APIGatewayEventRequestContext,
  connectionIDs: string[],
  data: any
) => {
  const client = createConnectionClient(context);

  const sendPromise = connectionIDs.map(async (connectionID) =>
    sendMessageToConnection(context, connectionID, data, client)
  );

  await Promise.all(sendPromise);
};
