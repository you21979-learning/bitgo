var BitGoJS = require('bitgo');
var Promise = require('bluebird');

var bitgo_access_token = function( token, env ){
    return new BitGoJS.BitGo({ env: env || 'test', accessToken: token });
}

var bitgo_session = function( bitgo, opt ){
    return new Promise(function(resolv, reject){
        bitgo.session(opt || {}, function(err, res){
            if(err) reject(err)
            else resolv(res)
        })
    })
}
var bitgo_wallet_get = function( bitgo, id, type ){
    return new Promise(function(resolv, reject){
        bitgo.wallets().get({type:type || "bitcoin", id: id}, function(err, res){
            if(err) reject(err)
            else resolv(res)
        })
    })
}

var wallet_id = process.env['BITGO_WALLET_ID']
var token = process.env['BITGO_TOKEN']

var bitgo = bitgo_access_token(token)
bitgo_session(bitgo).then(function(res){
    return bitgo_wallet_get(bitgo, wallet_id).then(function(wallet){
        console.log("Balance is: " + (wallet.balance() / 1e8).toFixed(4));
    })
})
