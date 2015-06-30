var Addresses = require('./lib/addresses.js');
var Transactions = require('./lib/transactions.js');
var Blocks = require('./lib/blocks.js');

var assert = require('assert');
var Chain = require('chain-node');

//config variables for the module. (only network for now)
//"testnet" for testnet and anything else for mainnet

function ChainAPI(opts) {
  if (!(this instanceof ChainAPI)) return new ChainAPI(opts);

  assert(opts.key, 'Missing chain API key');
  assert(opts.secret, 'Missing chain API secret');
  
  if (opts.network === "testnet") opts.network = "testnet3";

  var chain = new Chain({
    keyId: opts.key,
    keySecret: opts.secret,
    blockChain: opts.network || 'bitcoin'
  });

  opts.chain = chain;

  ChainAPI.prototype.Addresses = Addresses(opts);
  ChainAPI.prototype.Transactions = Transactions(opts);
  ChainAPI.prototype.Blocks = Blocks(opts);

  ChainAPI.prototype.getNetwork = function() { console.log(opts.network);}
}

module.exports = ChainAPI;