var BitGoJS = require('bitgo');

var BitgoAccessToken = function( token, env ){
    return new BitGoJS.BitGo({ env: env || 'test', accessToken: token });
}

BitgoAccessToken(process.env['BITGO_TOKEN'])
