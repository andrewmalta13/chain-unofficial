function Blocks(opts){

  //expects a json object ie : {blockIds: [list of block ids as strings]} and a callback(err, response)
  //returns a list of json objects:
  // {
  //   "blockHex": hex of block,
  //   "blockId": id of the block
  // }
  //
  function Get(blockIds, callback){
    var responseData = [];
    var count = 0;
    
    blockIds.forEach(function (blockId){
      opts.chain.getBlock(blockId, function (err, resp){
        if (err){
          var error = err.resp.body || err;
          callback(error, null);
        } else{
          var response = {};
          response.blockHex = null;
          response.blockId = resp.hash;
          
          responseData.push(response);

          if (++count === blockIds.length){  
            callback(false, responseData);
          }
        }
      });
    });
  }

  //expects a callback(err, resp) and returns a single json object of the latest block :
  // {
  //   "blockHex": hex of block (not supported by blockcypher at the moment),
  //   "blockId": id of the block
  // }
  //
  function Latest(callback){
    opts.chain.getLatestBlock(function (err, resp){
      if (err){
        var error = err.resp.body || err;
        callback(error, null);
      } else { 
        var response = {};
        response.blockHex = null;
        response.blockId = resp.hash;
        callback(false, response);
      }
    });
  }
  
  //takes in blockHex and returns txid if successful to callback. Unfortunately, chain does not 
  //support this functionality.
  function Propagate(blockHex, callback){
    callback({"err": "chain does not provide support for propagating blocks"}, null);
  }
  

  //expects a json object like so:
  // {
  //   blockIds: [array of block ids];
  // }
  //and a callback(err, resp);

  //returns an array of json objects:
  // {
  //   blockId: [some block id],
  //   result: [{txid: {some txid in block}, txId: {same txid in block}}, ... ]
  // }
  function Transactions(blockIds, callback){
    var responseData = [];
    var count = 0;
    
    blockIds.forEach(function (blockId){
      opts.chain.getBlock(blockId, function (err, resp){
        if (err){
          var error = err.resp.body || err;
          callback(error, null);
        } else{
          var blockTransactions = [];

          resp.transaction_hashes.forEach(function (txid){
            var txPair = {txid: txid, txId: txid, blockId: resp.hash};
            blockTransactions.push(txPair);
          });

          responseData.push(blockTransactions);
          if (++count === blockIds.length){  
            callback(false, responseData);
          }
        }
      });
    });
  }

  return{
    Get: Get,
    Latest: Latest,
    Propagate: Propagate,
    Transactions: Transactions
  };
}

module.exports = Blocks;