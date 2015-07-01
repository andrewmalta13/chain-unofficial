var testnetCommonBlockchainTests = require('abstract-common-blockchain/tests/testnet');
var mainnetCommonBlockchainTests = require('abstract-common-blockchain/tests/mainnet');

var test = require('tape');
var ChainAPI = require('../');

var testnetCommonBlockchain = ChainAPI({
  network: "testnet", 
  key: process.env.CHAIN_API_KEY_ID, 
  secret: process.env.CHAIN_API_KEY_SECRET
});

var mainnetCommonBlockchain = ChainAPI({
  network: "bitcoin", 
  key: process.env.CHAIN_API_KEY_ID, 
  secret: process.env.CHAIN_API_KEY_SECRET
});

var testnetCommon = {
  setup: function(t, cb) {
    cb(null, testnetCommonBlockchain);
  },
  teardown: function(t, testnetCommonBlockchain, cb) {
    cb();
  }
}

var mainnetCommon = {
  setup: function(t, cb) {
    cb(null, mainnetCommonBlockchain);
  },
  teardown: function(t, mainnetCommonBlockchain, cb) {
    cb();
  }
}

mainnetCommonBlockchainTests(test, mainnetCommon);
testnetCommonBlockchainTests(test, testnetCommon);
