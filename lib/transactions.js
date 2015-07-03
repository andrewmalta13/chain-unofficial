var async = require("async");

function standardizeTransaction(resp){
  var response = {};
  response.hex = null;
  response.txHex = null;
  response.txid = resp.hash;
  response.txId = resp.hash;
  response.version = null;
  response.locktime = resp.lock_time;
  response.fee = resp.fees;
  response.vin = [];
  response.vout = [];
  resp.inputs.forEach(function (input){
    response.vin.push({txid: input.output_hash, txId: input.output_hash, vout: input.output_index, 
                        scriptSig: {asm: null, hex: input.script_signature}, sequence: null, addresses: input.addresses});
  });
  resp.outputs.forEach(function (output){
    response.vout.push({value: output.value, index: output.output_index, n: output.output_index, spentTxid: output.spending_transaction || null,
                       scriptPubKey : {asm: output.script, hex: output.script_hex, reqSigs: output.required_signatures,
                       type: output.script_type, addresses: output.addresses}});
  });
  
  response.confirmations = resp.confirmations;
  if (response.confirmations === 0){
     response.blocktime = null;
     response.blockhash = null;
  } else {
    response.blocktime = new Date(resp.block_time).getTime();
    response.blockhash = resp.block_hash;
  }
  response.blockindex = null;
  response.timeReceived = new Date(resp.chain_received_at).getTime();
  return response;
}

var Transactions = function(opts){
  //expects a json object of either of these two aliases:
  //{"txids": [list of txid strings]} or {"txIds": [list of txid strings]}
  // and a callback(err, resp);

  //returns a list of transaction objects. Check the README.md for an example transaction object.
  function Get(transactions, callback){
    var responseData = [];
    async.each(transactions,
      function(txid, cb) {
        opts.chain.getTransaction(txid, function (err, resp){
          responseData.push(standardizeTransaction(resp));
          cb(null, resp);
        });
      },
      function(err) {
        callback(err, responseData);
      }
    );
  }
  
  //expects a callback(err, resp)
  //returns the latest unconfirmed transaction propagated to chain as a json object. 
  //(not implemented by chain as of now.)
  function Latest(callback){
    callback({"err": "not implemented by chain."}, null);
  }
  
  //expects a json object like so (either txid or txId should be defined):
  // { "outputs": 
  //   [
  //     {
  //       "txid": "String",
  //       "txId": "String",
  //       "vout": "Number"
  //     }
  //   ]
  // }
  //and a callback(err, resp)

  //returns a list of json objects:
  // {
  //   "scriptPubKey": "String",
  //   "txid": "String",
  //   "txId": "String",
  //   "value": "Number",
  //   "vout": "Number"
  // }
  function Outputs(outputs, callback){
    var responseData = [];
    var count = 0;

    outputs.forEach(function (output){
      var id;
      if (output.txid) id = output.txid;
      else if (output.txId) id = output.txId;

      opts.chain.getTransaction(id, function (err, resp){
        if (err){
          var error = err.resp.body || err;
          callback(error, null);
        } else {
          var response = {};
          if (output.vout < resp.outputs.length){
            response.scriptPubKey = resp.outputs[output.vout].script_hex;
            response.txId = output.txid;
            response.txid = output.txid;
            response.value = resp.outputs[output.vout].value;
            response.vout = output.vout;

            responseData.push(response);
          } else {
            console.log("invalid vout: " + output.vout + " for txid: " + output.txid);
          }
        
          if (++count === outputs.length) {
            responseData.sort(function(a, b) {
              return a.vout > b.vout;
            });
            callback(false, responseData);
          }
        }
      });
    });
  }

  //expects either of these two json objects for the transaction hex:
  // {
  //   "hex": transaction hex
  // }
   
  // or 

  // {
  //   "txHex": transaction hex
  // }
  //and a callback(err, resp);

  //returns a json representation of txid and the alias txId if succesful in the resp.
  function Propagate(transactionHex, callback){
    opts.chain.sendTransaction(transactionHex, function (err, resp) {
      if (err){
        var error = err.resp.body || err;
        callback(error, null);
      } else {
        callback(false, {txid: resp.transaction_hash, txId: resp.transaction_hash});
      }
    });
  }
  

  //expects either of these two fields of the json object to be inputted:
  // {
  //   "txids": [list of strings of txids]
  // }
  // {
  //   "txIds": [list of strings of txids]
  // }
  //and a callback(err, resp)

  //returns a list of these json objects: 
  // {
  //   "blockId": "?String",
  //   "txid": "String",
  //   "txId": "String"
  // }
  function Status(txids, callback){
    var ids;
    var response = [];
    var count = 0;
    
    txids.forEach(function (txid){
      opts.chain.getTransaction(txid, function (err, resp){
        if (err){
          var error = err.resp.body || err;
          callback(error, null);
        } else {
          response.push({blockId: resp.block_hash || null, txid: resp.hash, txId: resp.hash});
          if (++count === txids.length){
            callback(null, response);
          }
        }
      });
    });
  }

  return {
    Get: Get,
    Latest: Latest,
    Outputs: Outputs,
    Propagate: Propagate,
    Status: Status
  };
}

module.exports = Transactions;