const config = {
  apiGateway: {
    REGION: process.env.REACT_APP_REGION as string,
    WEBSOCKET_URL: process.env.REACT_APP_WEBSOCKET_API_URL as string,
  },
  cognito: {
    REGION: process.env.REACT_APP_REGION,
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
  },
} as const;

export default config;
