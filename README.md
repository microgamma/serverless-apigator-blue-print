# my-first-apigator

> this is an example about creating a very simple lambda using Typescript, serverless and @microgamma

- create a new project with typescript-starter
`npx typescript-starter my-first-apigator --node --yarn --no-vscode`
- install other deps
`yarn add @microgamma/apigator serverless`
`yarn add -D @microgamma/serverless-apigator`
- create serverless.yml file with the following content
```yaml
service: my-first-apigator # NOTE: update this with your service name

provider:
  name: aws
  runtime: nodejs12.x
  stage: dev
  region: eu-west-2


plugins:
  - '@microgamma/serverless-apigator'

custom:
  apigator:
    entrypoint: build/main/handler
    buildFolder: /home/davide/dev/my-first-apigator/build/main


```
> I do apologiaze for the full path in `buildFolder` path but please bear with me. It will be better in future versions.

#### Cleanup

- enable typescript decorators support uncommenting the following options
```diff
--- a/tsconfig.json
+++ b/tsconfig.json
@@ -32,8 +32,8 @@
     "pretty": true /* Stylize errors and messages using color and context. */,
 
     /* Experimental Options */
-    // "experimentalDecorators": true /* Enables experimental support for ES7 decorators. */,
-    // "emitDecoratorMetadata": true /* Enables experimental support for emitting type metadata for decorators. */,
+     "experimentalDecorators": true /* Enables experimental support for ES7 decorators. */,
+     "emitDecoratorMetadata": true /* Enables experimental support for emitting type metadata for decorators. */,
 
     "lib": ["es2017"],
     "types": ["node"],

```

- remove `src/lib`, `src/types` and delete the content of `index.ts`

- clean tslint.json from `Functional style rules`: remove the following lines
```diff
--- a/tslint.json
+++ b/tslint.json
@@ -18,17 +18,9 @@
     "no-let": true,
     "no-object-mutation": true,
     "no-delete": true,
-    "no-method-signature": true,
+    "no-method-signature": true
 
-    // Functional style rules
-    "no-this": true,
-    "no-class": true,
-    "no-mixed-interface": true,
-    "no-expression-statement": [
-      true,
-      { "ignore-prefix": ["console.", "process.exit"] }
-    ],
-    "no-if-statement": true
     /* end tslint-immutable rules */
+
   }
 }

```

and also 

```diff
--- a/tslint.json
+++ b/tslint.json
@@ -10,15 +10,13 @@
     // Recommended built-in rules
     "no-var-keyword": true,
     "no-parameter-reassignment": true,
-    "typedef": [true, "call-signature"],
 
     // Immutability rules
     "readonly-keyword": true,
     "readonly-array": true,
     "no-let": true,
     "no-object-mutation": true,
-    "no-delete": true,
-    "no-method-signature": true
+    "no-delete": true
 
     /* end tslint-immutable rules */
```

- remove module building from package.json
```diff
--- a/package.json
+++ b/package.json
@@ -12,7 +12,6 @@
     "describe": "npm-scripts-info",
     "build": "run-s clean && run-p build:*",
     "build:main": "tsc -p tsconfig.json",
-    "build:module": "tsc -p tsconfig.module.json",
     "fix": "run-s fix:*",
     "fix:prettier": "prettier \"src/**/*.ts\" --write",
     "fix:tslint": "tslint --fix --project .",
```
### Create your service

- create `src/my-first.service.ts` file with the following content
```typescript
import { Endpoint } from '@microgamma/apigator';

@Endpoint({
  cors: true,
  name: 'my-first-service',
  private: false
})
export class MyFirstService {}

```

- export it as default in `src/index.ts`
```typescript
import { MyFirstService } from './my-first.service';

export = MyFirstService;
```

- create `src/handler.ts`
```typescript
import { bootstrap } from '@microgamma/apigator';
import { MyFirstService } from './my-first.service';

export = bootstrap(MyFirstService);

```

-- check that it builds `yarn build`. a build folder should be in your path with the following structure
```
build/
└── main
    ├── handler.d.ts
    ├── handler.js
    ├── index.d.ts
    ├── index.js
    ├── my-first.service.d.ts
    └── my-first.service.js
```

- create your first lambda
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

- deploy `yarn sls deploy --stage dev`
it should output something with :
```bash
endpoints:
  GET - https://uc23x9ytvf.execute-api.eu-west-2.amazonaws.com/dev/
```

- open your browser and hit that endpoint. 

### Extra points
- deploy only what's strictly needed

```diff
--- a/serverless.yml
+++ b/serverless.yml
@@ -1,3 +1,5 @@
 service: my-first-apigator # NOTE: update this with your service name
 
 provider:
@@ -14,3 +16,10 @@ custom:
   apigator:
     entrypoint: build/main/handler
     buildFolder: /home/davide/dev/my-first-apigator/build/main
+
+package:
+  exclude:
+    - ./*
+    - ./**
+    - '!build/**'
+    - '!node_modules/**
```
- add serverless monitoring. Check on serverless.com how to enable monitoring
```diff
--- a/serverless.yml
+++ b/serverless.yml
@@ -1,3 +1,5 @@
+org: davidecavaliere
+app: my-first-apigator
 service: my-first-apigator # NOTE: update this with your service name

 provider:

```
