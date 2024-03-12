const crypto = require('crypto');

const generateHashCustom = (data) => {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    const hashedValue = hash.digest('hex');
    return hashedValue;
}

const generateKeyPairsCustom = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,

        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
    return { publicKey, privateKey }
}
const signCustom = (data,privateKey)=>{
    const sign = crypto.createSign('SHA256');
    sign.update(data);
    const signature = sign.sign(privateKey, 'base64');
    return signature;
}
const verifyCustom = (data,publicKey,signature)=>{
    const verify = crypto.createVerify('SHA256');
    verify.update(data);
    const isVerified = verify.verify(publicKey, signature, 'base64');
    return isVerified;
}
module.exports = {
    generateHashCustom,
    generateKeyPairsCustom,
    signCustom,
    verifyCustom
}