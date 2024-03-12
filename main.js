const crypto = require('crypto');
const {  verifyCustom, signCustom, generateKeyPairsCustom, generateHashCustom } = require('./utils');
// 1- generate Hash
console.log("hash de salut est : " , generateHashCustom("salut"));
// 2- generate keyPairs
const { publicKey, privateKey } = generateKeyPairsCustom()
// 3- sign message with private key
const data = "salut uemf 2024s"
const signature = signCustom(data,privateKey)
console.log(signature);
// 4- verify
const isVerified = verifyCustom(data,publicKey,signature)
console.log(isVerified);
