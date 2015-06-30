var commonBlockchainTests = require('abstract-common-blockchain/tests');
var test = require('tape');
var ChainAPI = require('../');

var commonBlockchain = ChainAPI({
  network: "testnet", 
  key: process.env.CHAIN_API_KEY_ID, 
  secret: process.env.CHAIN_API_KEY_SECRET
});

var common = {
  setup: function(t, cb) {
    cb(null, commonBlockchain);
  },
  teardown: function(t, commonBlockchain, cb) {
    cb();
  }
}

commonBlockchainTests(test, common);