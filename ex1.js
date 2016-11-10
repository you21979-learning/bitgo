const BitGoJS = require('bitgo');


const wallet_id = process.env['BITGO_WALLET_ID']
const token = process.env['BITGO_TOKEN']

const bitgo_access_token = ( token, env ) => new BitGoJS.BitGo({ env: env || 'test', accessToken: token })

const bitgo_get_wallet_balance = (bg, id) => 
    bg.wallets().get({type:"bitcoin", id: id}).then(wallet => wallet.balance())

const bitgo_get_wallet_send()

const bg = bitgo_access_token(token)
bg.session({}).then(res => 
    bitgo_get_wallet_balance(bg, wallet_id).then(balance => {
        console.log("Balance is: " + (balance / 1e8).toFixed(4));
    })
)
