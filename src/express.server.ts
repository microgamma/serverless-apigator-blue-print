// tslint:disable:no-console

import { bootstrap, getEndpointMetadataFromClass, getLambdaMetadataFromClass, LambdaOptions } from '@microgamma/apigator';
import express, { Application } from 'express';
import { MyFirstService } from './my-first.service';

const app: Application = express();
const port = 3000;

const service = bootstrap(MyFirstService);

const endpointMetadata = getEndpointMetadataFromClass(MyFirstService);

console.log({endpointMetadata});

const lambdas = getLambdaMetadataFromClass(MyFirstService);

// tslint:disable-next-line:no-shadowed-variable
function createExpressHandler(lambda: LambdaOptions, app: Express.Application) {
  console.log({ lambda });
  app[lambda.method.toLowerCase()](lambda.path, service[lambda.name]);
}

lambdas.forEach((lambda) => createExpressHandler(lambda, app));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
