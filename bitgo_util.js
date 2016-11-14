const BitGoJS = require('bitgo');
const notp = require('notp')
const base32 = require('thirty-two');
const util = require('./bitcoin_util')

const getGoogleAuthOtp = (base32enckey) => notp.totp.gen(base32.decode(base32enckey))

const convertKeychain = (bitgo, m, label, password) => {
    const options = {
      label: label,
      xpub: util.getXpub(m),
      encryptedXprv: bitgo.encrypt({ password: password, input: util.getXprv(m) })
    };
    return options
}

const convertPublicKeychain = (m, label) => {
    const options = {
      label: label,
      xpub: util.getXpub(m),
    };
    return options
}

const bitgo_access_token = ( token, env ) =>
    new BitGoJS.BitGo({ env: env || 'test', accessToken: token })

const bitgo_session_with_unlock = (bitgo, key) =>
    bitgo.session({}).
        then(res => bitgo.unlock({ otp: getGoogleAuthOtp(key) }))

const bitgo_multisig_2of3_create = (bitgo, label, userKey, backupKey) => 
    Promise.all([
        bitgo.keychains().add(userKey),
        bitgo.keychains().add(backupKey)
    ]).
        then(results => {
            return bitgo.keychains().createBitGo({}).then(keychain => {
                const options = {
                    label: label,
                    m: 2,
                    n: 3,
                    keychains: [
                        { xpub: userKey.xpub },
                        { xpub: backupKey.xpub },
                        { xpub: keychain.xpub }
                    ]
                };
                return bitgo.wallets().add(options)
            })
        })

const bitgo_multisig_2of3_send = (bitgo, asset_type, wallet_id, recipients, xprv) =>
    bitgo.wallets().
        get({type:asset_type, id: wallet_id}).
        then(wallet => wallet.sendMany({ recipients : recipients, xprv:xprv }))


module.exports = {
    bitgo_session_with_unlock : bitgo_session_with_unlock,
    bitgo_access_token : bitgo_access_token,
    bitgo_multisig_2of3_create : bitgo_multisig_2of3_create,
    bitgo_multisig_2of3_send : bitgo_multisig_2of3_send,
    convertKeychain : convertKeychain,
    convertPublicKeychain : convertPublicKeychain,
    getGoogleAuthOtp : getGoogleAuthOtp,
}



