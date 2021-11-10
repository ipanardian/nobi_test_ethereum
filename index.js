const express = require('express');
const Web3 = require('web3');
const crypto = require("crypto");
require('dotenv').config();

const app = express();
const port = 3001;
app.use(express.json());

const web3 = new Web3('https://ropsten.infura.io/v3/e313d47bdfac40d3b1901614c626f620');

const algorithm = 'aes-256-cbc'; 
const initVector = process.env.INIT_VECTOR;
const Securitykey = process.env.SECURITY_KEY;

app.get('/', (req, res) => {
    res.send('OK');
});

app.post('/sendTx', async (req, res) => {
    console.log(req.body);
    try {
        const privateKey = decryptPrivateKey(req.body.privateKey);
        const nonce = web3.eth.getTransactionCount(req.body.fromAddress, 'latest');
        const trx = await ethTransaction(nonce, req.body.toAddress, privateKey);

        res.json({success: true, data: trx, message: 'Transaction sent successfully'});
    } catch (err) {
        console.log(err);
        res.status(500);
        res.json({success: false, message: 'Something went wrong. Please try again'});
    }
});

app.listen(port, () => {
    console.log(`Nobi app listening at http://localhost:${port}`)
});


async function ethTransaction(nonce, toAddress, privateKey) {
    let value = web3.utils.toWei('0.1', 'ether');

    let signedTransaction = await web3.eth.accounts.signTransaction({
        to: toAddress,
        value: value,
        gas: 2000000,
        nonce: nonce
    }, privateKey);

    return web3.eth.sendSignedTransaction(signedTransaction.rawTransaction).then((receipt) => {
        console.log(receipt);
        console.log('contract deployed at : ', receipt.contractAddress);

        return receipt;
    });
}

function decryptPrivateKey(encryptedData) {
    const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
    decryptedData += decipher.final("utf8");

    return decryptedData;
}