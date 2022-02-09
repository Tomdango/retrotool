import * as sst from "@serverless-stack/resources";
import { ApiAuthorizationType } from "@serverless-stack/resources";
import DynamoDBStack from "./DynamoDBStack";

type APIStackProps = sst.StackProps & {
  auth: sst.Auth;
  dynamoDBStack: DynamoDBStack;
};

class APIStack extends sst.Stack {
  public api: sst.Api;

  constructor(scope: sst.App, props: APIStackProps) {
    super(scope, "api-stack", props);

    this.api = new sst.Api(this, "api", {
      routes: this.getRoutes(),
    });

    props.auth.attachPermissionsForAuthUsers([this.api]);
  }

  private getRoutes() {
    return {
      ...this.getUnprotectedRoutes(),
      ...this.getProtectedRoutes(),
    };
  }

  private getUnprotectedRoutes() {
    return {
      "GET /": "api/handlers/index.main",
    };
  }

  private getProtectedRoutes() {
    return APIStack.withAuth({
      "GET /secure": "api/handlers/secure.main",
    });
  }

  private static withAuth(routes: Record<string, string>) {
    return Object.entries(routes).reduce((prevValue, [route, handler]) => {
      return {
        ...prevValue,
        [route]: {
          function: { handler },
          authorizationType: ApiAuthorizationType.AWS_IAM,
        },
      };
    }, {});
  }
}

export default APIStack;
