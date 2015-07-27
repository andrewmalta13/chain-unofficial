function standardizeTransaction(resp){
  var response = {};
  response.hex = null;
  response.txHex = null;
  response.txid = resp.hash;
  response.txId = resp.hash;
  response.version = null;
  response.locktime = null;
  response.fee = null;
  response.vin = [];
  response.vout = [];
  resp.inputs.forEach(function (input){
    response.vin.push({txid: null, txId: null, vout: null, 
                        scriptSig: {asm: null, hex: null}, sequence: null, addresses: null});
  });
  resp.outputs.forEach(function (output){
    response.vout.push({value: null, index: null, n: null, spentTxid: null,
                       scriptPubKey : {asm: null, hex: null, reqSigs: null,
                       type: null, addresses: null}});
  });
  
  response.confirmations = null;
  response.blocktime = null;
  response.blockhash = resp.block_hash;
  response.blockheight = resp.block_height;
  response.timeReceived = null;
  return response;
}


var Addresses = function(opts){
  //expects a json object ie : {addresses: [list of addresses as strings]} and a callback(err, resp)
  //and returns a list of address summaries (address, balance, totalRecieved, totalSent, txCount)
  function Summary(addresses, callback){
    if (addresses.length > 200){
      callback({"error": "maximum number of addresses for batch call is 200."}, null);
    }
    opts.chain.getAddresses(addresses, function (err, resp){
      if (err){
        callback({"error": err.resp.body}, null);
      } else {
        var summaries = [];
        for (var i = 0; i < resp.length; i++){
          var summary = {};
          summary.address = resp[i].address;
          summary.balance = resp[i].confirmed.balance;
          summary.totalReceived = resp[i].confirmed.received;
          summary.totalSent = resp[i].confirmed.sent;
          summary.txCount = null
          summaries.push(summary);
        }
        callback(false, summaries);
      }
    });
  }
  
  //expects a json object ie : {addresses: [list of addresses as strings]} and a callback(err, resp)
  //and returns a list of json objects that look like this.

  // {  
  //    "address": some address,
  //    "result": [list of transactions for this specific address]
  //  }
  function Transactions(addresses, callback){
    var count = 0;
    var responseData = [];
    addresses.forEach( function (address) {
      opts.chain.getAddressTransactions(address,  function (err, resp) {
        if (err){
          callback({"error": err.resp.body}, null);
        } else {
          var response = [];
          resp.forEach(function (transaction){
            var tx = standardizeTransaction(transaction);
            response.push(tx);
          });
            
          responseData.push(response);

          if(++count === addresses.length){
            callback(false, responseData);
          }
        }
      });
    });
  }

  //expects a json object ie : {addresses: [list of addresses as strings]} and a callback(err, response)
  //and resturns a list of json objects like this: 
  // {  
  //    "address": some address,
  //    "result": [list of unspent outputs for this specific address]
  //  }
  function Unspents(addresses, callback){
    var count = 0;
    var responseData = [];
    addresses.forEach(function (address) {
      opts.chain.getAddressUnspents(address,  function (err, resp) {
        if (err){
          var error = err.resp.body || err;
          callback({"error": error}, null);
        } else {
          var response = [];
          resp.forEach(function (transaction){
            var utxo = {};
            utxo.vout = transaction.output_index;
            utxo.address = address;
            utxo.confirmations = transaction.confirmations;
            utxo.txid = transaction.transaction_hash;
            utxo.txId = transaction.transaction_hash;
            utxo.value = transaction.value;
            utxo.amount = transaction.value;
            utxo.scriptPubKey = transaction.script_hex;
            response.push(utxo);
          });
          responseData.push(response);

          if(++count === addresses.length){
            callback(false, responseData);
          }
        }
      });
    });
  }

  return{
    Summary: Summary,
    Transactions: Transactions,
    Unspents: Unspents
  };
}

module.exports = Addresses;