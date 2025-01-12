import crypto from 'crypto'
// const secretKey=Crypto.lib.WordArray.random(64).toString(Crypto.publicEncrypt.Hex);

// console.log(secretKey);


function generateSecretKey() {
    const secretKey = crypto.randomBytes(64).toString('hex');
    console.log("Generated Secret Key:", secretKey);
}

generateSecretKey();