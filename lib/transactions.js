

var Transactions = function(config){
  //expects a json object of either of these two aliases:
  //{"txids": [list of txid strings]} or {"txIds": [list of txid strings]}
  // and a callback(err, resp);

  //returns a list of transaction objects. Check the README.md for an example transaction object.
  function Get(transactions, callback){
   
  }
  
  //expects a callback(err, resp)
  //returns the latest unconfirmed transaction propogated to blockcypher as a json object.
  // (check README.md for more details)
  function Latest(callback){
    
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

  //returns the txid if succesful in the resp.
  function Propogate(transactionHex, callback){
   
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
   
  }

  return {
    Get: Get,
    Latest: Latest,
    Outputs: Outputs,
    Propogate: Propogate,
    Status: Status
  };
}

module.exports = Transactions;