import DynamoDB from "aws-sdk/clients/dynamodb";
import { v4 as uuidv4 } from "uuid";

type RetroType = "start-stop-continue";

interface IRetrospective {
  id: string;
  name: string;
  type: RetroType;
}

class Retrospective implements IRetrospective {
  public id: string;
  public name: string;
  public type: RetroType;

  static tableName = process.env.retrospectivesTableName as string;
  private static dynamoDB = new DynamoDB.DocumentClient();

  constructor({ id, name, type }: IRetrospective) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  public static async create({
    name,
    type,
  }: Omit<IRetrospective, "id">): Promise<Retrospective> {
    const params = {
      TableName: this.tableName,
      Item: {
        id: uuidv4(),
        name,
        type,
      },
    };

    await this.dynamoDB.put(params).promise();

    return new Retrospective({
      id: params.Item.id,
      name,
      type,
    });
  }

  public static async getByID(retroID: string): Promise<Retrospective | null> {
    const data = await this.dynamoDB
      .get({
        TableName: this.tableName,
        Key: { id: retroID },
      })
      .promise();

    if (!data.Item) {
      return null;
    }

    return new Retrospective({
      id: data.Item.id,
      name: data.Item.name,
      type: data.Item.type,
    });
  }

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
    };
  }
}

interface IComment {
  id: string;
  retroID: string;
}

export class Comment implements IComment {
  public id: string;
  public retroID: string;

  constructor({ id, retroID }: IComment) {
    this.id = id;
    this.retroID = retroID;
  }
}

export default Retrospective;
