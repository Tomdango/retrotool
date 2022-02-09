import * as sst from "@serverless-stack/resources";

class AuthStack extends sst.Stack {
  public auth: sst.Auth;

  constructor(scope: sst.App, props?: sst.StackProps) {
    super(scope, "auth-stack", props);

    this.auth = new sst.Auth(this, "auth", {
      cognito: {
        userPool: {
          signInAliases: { email: true },
        },
      },
    });

    this.addOutputs({
      Region: scope.region,
      UserPoolId: this.auth.cognitoUserPool?.userPoolId || "",
      IdentityPoolId: this.auth.cognitoCfnIdentityPool.ref,
      UserPoolClientId: this.auth.cognitoUserPoolClient?.userPoolClientId || "",
    });
  }
}

export default AuthStack;
