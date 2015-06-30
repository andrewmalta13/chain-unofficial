
function Blocks(config){

  //expects a json object ie : {blockIds: [list of block ids as strings]} and a callback(err, response)
  //returns a list of json objects:
  // {
  //   "blockHex": hex of block (not supported by blockcypher at the moment),
  //   "blockId": id of the block
  // }
  //
  function Get(blockIds, callback){
  
  }

  //expects a callback(err, resp) and returns a single json object of the latest block :
  // {
  //   "blockHex": hex of block (not supported by blockcypher at the moment),
  //   "blockId": id of the block
  // }
  //
  function Latest(callback){
    
  }
  
  
  function Propogate(blockHex, callback){
    
  }

  //expects a json object like so:
  // {
  //   blockIds: [array of block ids];
  // }
  //and a callback(err, resp);

  //returns an array of json objects:
  // {
  //   blockId: [some block id],
  //   result: [{txid: {some txid in block}, txId: {same txid in block}}]
  // }
  function Transactions(blockIds, callback){
    
  }


  return{
    Get: Get,
    Latest: Latest,
    Propogate: Propogate,
    Transactions: Transactions
  };
}

module.exports = Blocks;