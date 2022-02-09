import * as sst from "@serverless-stack/resources";

class DynamoDBStack extends sst.Stack {
  public connectionsTable: sst.Table;
  public retrospectivesTable: sst.Table;
  public commentsTable: sst.Table;

  constructor(scope: sst.App, props?: sst.StackProps) {
    super(scope, "dynamodb-stack", props);

    this.connectionsTable = this.createConnectionsTable();
    this.retrospectivesTable = this.createRetrospectivesTable();
    this.commentsTable = this.createCommentsTable();
  }

  private createConnectionsTable(): sst.Table {
    return new sst.Table(this, "connections", {
      fields: {
        id: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "id" },
    });
  }

  private createRetrospectivesTable(): sst.Table {
    return new sst.Table(this, "retrospectives", {
      fields: {
        id: sst.TableFieldType.STRING,
        name: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "id" },
    });
  }

  private createCommentsTable(): sst.Table {
    return new sst.Table(this, "comments", {
      fields: {
        retroId: sst.TableFieldType.STRING,
        commentId: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "retroId", sortKey: "commentId" },
    });
  }

  public getAllTables(): sst.Table[] {
    return [
      this.connectionsTable,
      this.retrospectivesTable,
      this.commentsTable,
    ];
  }

  public getTableNames(): Record<string, string> {
    return {
      connectionsTableName: this.connectionsTable.dynamodbTable.tableName,
      retrospectivesTableName: this.retrospectivesTable.dynamodbTable.tableName,
      commentsTableName: this.commentsTable.dynamodbTable.tableName,
    };
  }
}

export default DynamoDBStack;
