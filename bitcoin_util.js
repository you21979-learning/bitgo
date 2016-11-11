const bitcoin = require('bitcoinjs-lib')
const bip39 = require('bip39')

const mnemonicToM = (mnemonic, password, network) => {
    const seed = bip39.mnemonicToSeed(mnemonic, password || "")
    const m = bitcoin.HDNode.fromSeedBuffer(seed, bitcoin.networks[network || "bitcoin"])
    return m
}

const getXpub = (m) => m.neutered().toBase58()

const getXprv = (m) => m.toBase58()

const getAddress = (m) => m.getAddress()

const getWIF = (m) => m.keyPair.toWIF()

module.exports = {
    mnemonicToM : mnemonicToM,
    getXpub : getXpub,
    getXprv : getXprv,
    getAddress : getAddress,
    getWIF : getWIF,
}


