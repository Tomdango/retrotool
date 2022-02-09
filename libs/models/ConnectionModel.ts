import { DynamoDB } from "aws-sdk";

interface IConnection {
  id: string;
  retroID: string;
}

class Connection implements IConnection {
  public id: string;
  public retroID: string;

  public static DEFAULT_RETRO_ID = "unset";

  private static dynamoDB = new DynamoDB.DocumentClient();
  private static tableName = process.env.connectionsTableName as string;

  constructor({ id, retroID }: IConnection) {
    this.id = id;
    this.retroID = retroID;
  }

  public async save(): Promise<void> {
    const params = {
      TableName: Connection.tableName,
      Item: {
        id: this.id,
        retroId: this.retroID,
      },
    };
    await Connection.dynamoDB.put(params).promise();
  }

  public static async deleteByID(id: string): Promise<void> {
    const params = { TableName: this.tableName, Key: { id } };
    await this.dynamoDB.delete(params).promise();
  }

  public static async all(): Promise<Connection[]> {
    const connections = await this.dynamoDB
      .scan({
        TableName: this.tableName,
      })
      .promise();

    if (!connections.Items) {
      return [];
    }

    return connections.Items.map(
      (item) => new Connection({ id: item.id, retroID: item.retroId })
    );
  }
}

export default Connection;
