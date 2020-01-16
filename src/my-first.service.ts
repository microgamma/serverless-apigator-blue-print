import { Endpoint } from '@microgamma/apigator';

@Endpoint({
  basePath: '/',
  cors: true,
  name: 'my-first-service',
  private: false
})
export class MyFirstService {}
