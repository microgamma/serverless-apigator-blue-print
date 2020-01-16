# Serverless Apigator Blue Print  
  
Use this package to get your microservice up and running using Typescript, Serverless and [@microgamma](//github.com/davidecavaliere/-microgamma)
 
## How to use  
- clone this repo  
- _install (we suggest to use yarn)_:`yarn`
- _personalize_: edit `serverless.yml`'s service name
	```yaml  
	service: my-first-apigator # NOTE: update this with your service name  
	```  

- _develop_: create your service  such as:
	```typescript  
	import { Endpoint, Lambda } from '@microgamma/apigator';  
	  
	@Endpoint({  
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
	```
- _build_: `yarn build`
- _deploy_: `yarn sls deploy --stage dev` should output something such as:  
	```bash  
	endpoints:  
	  GET - https://xxxxxxx.execute-api.eu-west-2.amazonaws.com/dev/  
	```  
- open your browser and hit that endpoint ;) or `curl https://xxxxxxx.execute-api.eu-west-2.amazonaws.com/dev/`
  
### Extra points  
Add serverless monitoring. Check on serverless.com how to enable monitoring  
```diff  
--- a/serverless.yml  
+++ b/serverless.yml  
@@ -1,3 +1,5 @@  
+org: myorg  
+app: myapp
 service: my-first-apigator # NOTE: update this with your service name  
  
 provider:  
```
