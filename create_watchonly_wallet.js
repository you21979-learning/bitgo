const BitGoJS = require('bitgo');
const bitgo = require("./bitgo_util")
const util = require('./bitcoin_util')

const user = util.mnemonicToM(process.env['BITGO_USER_MNEMONIC'])
const backup = util.mnemonicToM(process.env['BITGO_BACKUP_MNEMONIC'])
const token = process.env['BITGO_TOKEN']

const bg = bitgo.access_token(token)
const userKey = bitgo.convertPublicKeychain(user.derivePath("m/5963'/1"), "mykey")
const backupKey = bitgo.convertPublicKeychain(backup.derivePath("m/5963'/1"), "backup")
const wallet_name = "WatchOnly"
bg.session({}).then(res => {
    return bitgo.wallet_2of3_multisig_create(bg, wallet_name, userKey, backupKey).catch(console.log).then(console.log)
})


