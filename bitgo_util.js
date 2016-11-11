const BitGoJS = require('bitgo');
const util = require('./bitcoin_util')

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

const bitgo_access_token = ( token, env ) => new BitGoJS.BitGo({ env: env || 'test', accessToken: token })

const bitgo_2of3_multisig_create = (bitgo, label, userKey, backupKey) => {
    return Promise.all([
        bitgo.keychains().add(userKey),
        bitgo.keychains().add(backupKey)
    ]).then(results => {
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
}

module.exports = {
    access_token : bitgo_access_token,
    wallet_2of3_multisig_create : bitgo_2of3_multisig_create,
    convertKeychain : convertKeychain,
    convertPublicKeychain : convertPublicKeychain,
}
