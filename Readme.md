## Implementing ERC-721 using open-zeplin

### Libraries used
1. node.js
2. truffle
3. openzeppeline-solidity

### Getting started with truffle boxes
Follow below instructions to initialize new ethereum project from truffle boxes. We will use `webpack` template
```
mkdir BTProperty-Token`
cd BTProperty-Token
truffle unbox webpack
npm install openzeppelin-solidity@2.0.0
```
### Versions compatibility
```
Update compiler version of solidity in `truffle-config.js`
Install compatible version of ethers `npm install ethers@4.0.20`
```

### Cleanup unsed files
Delete files from contracts(except Migrations.sol) and test folders.

### Create BTProperty.sol in Remix
Create Smart Contract in Remix and make sure there is no compilation errors

### Running the truffle
Start the truffle console
```
truffle develop
compile
migrate --reset
test
```
### Running front end application
To start the front-end on http://localhost8080 in new terminal
`rpm run dev`

Front end application will be started.
Now you can interact with your deployed Smart Contract from web application.

### Integration with MetaMask
In order to perform transaction from front-end, you need to integrate your local blockchain with Metamask.
```
Go to your metamask plugin
Use option, Connect using “Custom RPC”, at address http://127.0.0.1:9545/
This is the port number, where the "truffle develop" runs the local network
```

### Integration with Infura
If you want to interact with public ethereum networks e.g. (Mainnet, Testnet), you need to create Infura account

### Live network deployment
 Deploying BTFile...
  ... 0x33bcd2819f3080a55250ab2c8aaad930fea04f8f7c341f7506cfdea19e46694f
  BTFile: 0x0236684b024c2632dcb3887a0d6c2d63ce2d347d
