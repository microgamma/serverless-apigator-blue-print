// tslint:disable: object-literal-sort-keys no-string-literal
import { AwsEventHandler, Endpoint, ExpressEventHandler, Lambda, LambdaDefaultHandler, Path } from '@microgamma/apigator';
import { Injectable } from '@microgamma/digator';

@Endpoint({
  cors: true,
  name: 'my-first-service',
  private: false,
  providers: [{
    provide: LambdaDefaultHandler,
    implementation: process.env['environment'] === 'local' ? ExpressEventHandler : AwsEventHandler
  }]
})
@Injectable()
export class MyFirstService {

  @Lambda({
    method: 'GET',
    path: '/'
  })
  public index() {
    return `Hello world! Today is ${new Date().toISOString()}`;
  }

  @Lambda({
    method: 'GET',
    path: process.env['environment'] === 'local' ? '/me/:name' : '/me/{name}'
  })
  public me(@Path('name') name) {
    return `Hello ${name}`;
  }
}
