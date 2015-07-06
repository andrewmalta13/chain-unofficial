# chain-unofficial

## Installation

you can install the npm module <a href="https://www.npmjs.com/package/chain-unofficial">here</a>

```
npm install chain-unofficial
```
<a href="https://github.com/blockai/abstract-common-blockchain">See abstract-common-blockchain for API</a>

## Chain's Abstract Common Blockchain Coverage 
  <a href="http://abstract-common-blockchain.herokuapp.com"> Use this link to see what Chain supports </a>

## Convention

Standard convention is described fully in the types.json file in the link above.

## Usage

simply require the npm module at the top of the file
```javascript
var chain = require('chain-unofficial');
```
you may specify the options you wish to make a call like so:

```javascript
var chainClient = chain({
  network: "bitcoin",
  key: "your chain api key",
  secret: "your chain api secret"
});

//example call
chainClient.Addresses.Unspents(["address 1", "address 2", ...], callback);
```

alternatively you can check out the comments above each function in lib if you wish to understand what each function expects and returns.

## Maintainers
* Andrew Malta: andrew.malta@yale.edu
* Howard Wu: howardwu@berkeley.edu

