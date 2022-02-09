import * as sst from "@serverless-stack/resources";

type FrontendStackProps = sst.StackProps & {
  api: sst.Api;
  auth: sst.Auth;
  websocketApi: sst.WebSocketApi;
};

class FrontendStack extends sst.Stack {
  constructor(scope: sst.App, props: FrontendStackProps) {
    super(scope, "frontend-stack", props);

    const { api, websocketApi, auth } = props;

    const site = new sst.ReactStaticSite(this, "frontend", {
      path: "frontend",
      environment: {
        REACT_APP_API_URL: api.url,
        REACT_APP_WEBSOCKET_API_URL: websocketApi.url,
        REACT_APP_REGION: scope.region,
        REACT_APP_USER_POOL_ID: auth.cognitoUserPool?.userPoolId || "",
        REACT_APP_IDENTITY_POOL_ID: auth.cognitoCfnIdentityPool.ref,
        REACT_APP_USER_POOL_CLIENT_ID:
          auth.cognitoUserPoolClient?.userPoolClientId || "",
      },
    });

    this.addOutputs({
      SiteUrl: site.url,
    });
  }
}

export default FrontendStack;
