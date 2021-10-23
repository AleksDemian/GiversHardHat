# Hardhat ERC20 token
```
Token Name - GIVERSChain
Symbol - GIVERS
Blockchain - Binance Smart Chain (BSC)
Total Supply - 1,000,000,000
```
### Current project use the plug-in to verify on the bscscan
### [*Verify Testnet Address*](https://testnet.bscscan.com/address/0x3F0fD66057f88bc0c98C62e65Ff355B91525e73F#code)

### 1. Project init
```shell
npm init --yes

npm install --save-dev hardhat

npm install --save-dev @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

### 2. Write config
Get the APIkey address under [bscScan](https://bscscan.com/myapikey) personal information.

Create an `.env` file and add the `PRIVATE_KEY` and `BSCSCAN_API_KEY` in this file. We require these keys for configuring `hardhat.config.js` file.

To interact with deployed protocols and test complex interactions locally use `forking` from mainnet.
Recommend using Moralis BSCNetwork endpoints.

```shell
https://speedy-nodes-nyc.moralis.io/1ed.....................c/bsc/mainnet
```
### 3. Testing contracts

On your terminal run `npx hardhat test`. You should see the following output:
```
$ npx hardhat test

  Token contract
    ✓ Total supply equal to what you set (654ms)
    .....


  .. passing (...ms)
```

### 4. Debugging with Hardhat Network

When running your contracts and tests on Hardhat Network you can print logging messages and contract variables calling `console.log()` from your Solidity code. To use it you have to `import "hardhat/console.sol";`

### 5. Deploying to a live network

To indicate Hardhat to connect to a  BSC testnet network when running any tasks, you can use the --network parameter. Like this:

```shell 
npx hardhat run scripts/deploy.js --network testnet 
```
To fix: “Gas estimation error" use right router address of Pancakeswap:

If you are on `testnet` use this: 0xD99D1c33F9fC3444f8101754aBC46c52416550D1

If you are on `mainnet` use this: 0x10ED43C718714eb63d5aA57B78B54704E256024E

### 6. Verify with Hardhat

Install the plugin
```
npm install --save-dev @nomiclabs/hardhat-etherscan
```
Configure the plugin in hardhat.config.js
```
Add require("@nomiclabs/hardhat-etherscan");
Add Bscscan API key
```

Run the following command:
```
npx hardhat verify --network testnet DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"
```
