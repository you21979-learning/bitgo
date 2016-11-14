const bitgou = require('./bitgo_util')

const wallet_id = process.env['BITGO_WALLET_ID']
const token = process.env['BITGO_TOKEN']

const bitgo_access_token = ( token, env ) => new BitGoJS.BitGo({ env: env || 'test', accessToken: token })

const bitgo = bitgou.bitgo_access_token(token)
bitgo.session({}).then(res => 
    bitgou.bitgo_multisig_balance(bitgo, wallet_id).then(balance => {
        console.log("Balance is: " + (balance / 1e8).toFixed(4));
    })
)
