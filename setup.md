## How to setup a new typescript project

 1.
```
 npm init -y
```

 2.
```
 npm install -D typescript
 npm i concurrently
```
 3.
```
 tsc --init
 ```
 
 
 4.
 ```
 Add the following script in package.json
 {
    "build": "npx tsc",
    "watch": "npx tsc -w",
    "prestart": "npm run build",
    "start": "npx nodemon dist/index.js",
    "dev": "npx concurrently \"npm run watch\" \"npm run start\""
  }
  ```

  5.
  ```
  npm run dev
  ```