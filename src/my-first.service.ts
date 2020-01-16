import { Endpoint, Lambda } from '@microgamma/apigator';

@Endpoint({
  basePath: '/',
  cors: true,
  name: 'my-first-service',
  private: false
})
export class MyFirstService {

  @Lambda({
    method: 'GET',
    path: '/'
  })
  public index() {
    return `Hello world! Today is ${new Date().toISOString()}`;
  }
}
