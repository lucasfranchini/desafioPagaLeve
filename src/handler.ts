import serverlessExpress from "@vendia/serverless-express";
import app, { init } from "@/app";

let serverlessExpressInstance;

async function setup(event, context) {
  await init();
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}

export async function handler(event, context) {
  if (serverlessExpressInstance)
    return serverlessExpressInstance(event, context);

  return setup(event, context);
}
