var api = require("./index.js");


function test(err, resp){
  if(err){
    console.log(err);
  } else {
    console.log(JSON.stringify(resp));
  }
}

var testnetOpts = {network: "testnet", key: "20eca2a0a7edc8b93d46a7b9f3729e6c", secret: "cad9f57fc061ee0524f6824fea6a4c6d"};
var mainnetOpts = {network: "bitcoin", key: "20eca2a0a7edc8b93d46a7b9f3729e6c", secret: "cad9f57fc061ee0524f6824fea6a4c6d"};


//api(mainnetOpts).Addresses.Summary({addresses: ["1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq", "1PR3K4eYsVYtv9JXE3hjijLCtrWjTu9vwQ"]}, test)
//api(testnetOpts).Addresses.Summary({addresses: ["mjf6CRReqGSyvbgryjE3fbGjptRRfAL7cg"]}, test);

//api(mainnetOpts).Addresses.Transactions({addresses: ["1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq", "1PR3K4eYsVYtv9JXE3hjijLCtrWjTu9vwQ"]}, test);
//api(testnetOpts).Addresses.Transactions({addresses: ["mjf6CRReqGSyvbgryjE3fbGjptRRfAL7cg"]}, test);

api(mainnetOpts).Addresses.Unspents({addresses: ["1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq", "1PR3K4eYsVYtv9JXE3hjijLCtrWjTu9vwQ"]}, test);
//api(testnetOpts).Addresses.Unspents({addresses: ["mjf6CRReqGSyvbgryjE3fbGjptRRfAL7cg"]}, test);



