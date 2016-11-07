var bip39 = require('bip39');
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

var bitgo_keychains_add = function(bitgo, options){
    return new Promise(function(resolv, reject){
        bitgo.keychains().add(options, function(err, keychain) {
            if(err) reject(err)
            else resolv(keychain)
        })
    })
}


var bitgo_2of3_multisig_create = function(bitgo, xpub, xprv, bitgo_password){
    var userKey = bitgo.keychains().create();
    var backupKey = bitgo.keychains().create();
    var options = {
      label: 'key1',
      xpub: userKey.xpub,
      encryptedXprv: bitgo.encrypt({ password: "", input: userKey.xprv })
    };
    return bitgo_keychains_add(bitgo, options).then(console.log)
}



var token = process.env['BITGO_TOKEN']

var bitgo = bitgo_access_token(token)
bitgo_session(bitgo).then(function(res){
    return bitgo_2of3_multisig_create(bitgo)
})
