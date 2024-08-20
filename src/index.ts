import express from 'express'
import serverConfig from './config/serverConfig'
import apiRouter from './routes'
import bodyParser from 'body-parser'
// import sampleQueueProducer from './producers/sampleQueueProducer'
 import sampleWorker from './worker/sampleWorker'
import runCpp from './containers/runCPP'

const app = express()
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use('/api',apiRouter)

app.listen(serverConfig.PORT,() => {
    console.log(`server is running on port: ${serverConfig.PORT}`)

     sampleWorker('sampleQueue')

    // sampleQueueProducer('sampleJob',{
    //     name: "Anand",
    //     company: "Freecharge",
    //     position: "SDE",
    //     location: "Remote"
    // },2)
    // sampleQueueProducer('sampleJob',{
    //     name: "Rohit",
    //     company: "Goldman",
    //     position: "SDE",
    //     location: "Blg"
    // },1)

    const userCode = `
  
    class Solution {
      public:
      vector<int> permute() {
          vector<int> v;
          v.push_back(10);
          return v;
      }
    };
  `;

  const code = `
  #include<iostream>
  #include<vector>
  #include<stdio.h>
  using namespace std;
  
  ${userCode}
  int main() {
    Solution s;
    vector<int> result = s.permute();
    for(int x : result) {
      cout<<x<<" ";
    }
    cout<<endl;
    return 0;
  }
  `;


const inputCase = `10
`
runCpp(code,inputCase)
  
})