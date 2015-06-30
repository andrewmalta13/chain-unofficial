# chain-unofficial

## Installation

you can install the npm module <a href="https://www.npmjs.com/package/chain-unofficial">here</a>

```
npm install chain-unofficial
```

<a href="https://github.com/blockai/abstract-common-blockchain/edit/master/README.md">See abstract-common-blockchain for API</a>

## Convention

Standard convention is described fully in the types.json file.

## Usage

simply require the npm module at the top of the file
```javascript
var chain = require('chain-unofficial');
```

Also you may check out the comments above each function in lib if you wish to understand what each function expects and returns.

## Addresses
```javascript
//for more information about the arguments, check the comment stubs above each function in addresses.js in lib.

chain({network: "mainnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Addresses.Summary(addresses, callback);
chain({network: "testnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Addresses.Summary(addresses, callback);

chain({network: "mainnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Addresses.Unspents(addresses, callback);
chain({network: "testnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Addresses.Unspents(addresses, callback);

chain({network: "mainnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Addresses.Transactions(addresses, callback);
chain({network: "testnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Addresses.Transactions(addresses, callback);
```

## Blocks
```javascript
//for more information about the arguments, check the comment stubs above each function in blocks.js in lib.

chain({network: "mainnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Blocks.Get(blockids, callback);
chain({network: "testnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Blocks.Get(blockids, callback);

chain({network: "mainnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Blocks.Latest(callback);
chain({network: "testnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Blocks.Latest(callback);

chain({network: "mainnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Blocks.Propogate(blockhex, callback);
chain({network: "testnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Blocks.Propogate(blockhex, callback);

chain({network: "mainnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Blocks.Transactions(blockids, callback);
chain({network: "testnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Blocks.Transactions(blockids, callback);
```

## Transactions

```javascript
//for more information about the arguments, check the comment stubs above each function in transactions.js in lib.

chain({network: "mainnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Transactions.Get(txids, callback);
chain({network: "testnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Transactions.Get(txids, callback);

chain({network: "mainnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Transactions.Latest(callback);
chain({network: "testnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Transactions.Latest(callback);

chain({network: "mainnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Transactions.Outputs(outputs, callback);
chain({network: "testnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Transactions.Outputs(outputs, callback);

chain({network: "mainnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Transactions.Status(txids, callback);
chain({network: "testnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Transactions.Status(txids, callback);

chain({network: "mainnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Transactions.Propogate(transactionHex, callback);
chain({network: "testnet", key: "{your chain api key}", secret: "{your chain api secret}"}).Transactions.Propogate(transactionHex, callback);
```


## Maintainers
* Andrew Malta: andrew.malta@yale.edu
* Howard Wu: howardwu@berkeley.edu

