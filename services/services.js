const fs = require("fs")
const BlockChain = require("../models/blockchain")
const Bloc = require("../models/bloc")
const Transaction = require("../models/transaction")
const TransactionReward = require("../models/transactionReward")
const load = async (path) => {
    //returns blockchain
    let data = await fs.promises.readFile(path)

    data = JSON.parse(data).blockchain

    const blockchain = new BlockChain(data.name, data.blockReward, data.difficuly,
        data.cyrptoFunction, data.proofStyle)

    data.blocs.forEach(element => {
        const transactionReward = new TransactionReward(element.transactionReward.sender,
            element.transactionReward.amount, element.transactionReward.signture)
        const transactions = element.transactions.map(tx => {
            return new Transaction(tx.sender, tx.receipient, tx.amount, tx.fees, tx.signture)
        })
        const bloc = new Bloc(element.peviousHash, element.nonce, element.height,
            element.hash, transactionReward, transactions)
        transactionReward.bloc = bloc
        transactions.forEach(tx => tx.bloc = bloc)

        bloc.previous = blockchain.lastBlock
        blockchain.lastBlock = bloc
    })
    return blockchain


}
// load("../bd/blockchain_v1.json").then(res=>console.log(res));




const save = (blockchain, path) => {
    const data = {
        blockchain: {
            name: blockchain.name,
            blockReward: blockchain.blockReward,
            difficuly: blockchain.difficuly,
            cyrptoFunction: blockchain.cyrptoFunction,
            proofStyle: blockchain.proofStyle,
            blocs: []
        }
    }
    const tmpBlocs = []
    let tete = blockchain.lastBlock
    while (tete != null) {
        const bloc = {
            peviousHash: tete.previous,
            nonce: tete.nonce,
            height: tete.height,
            hash: tete.hash,
            transactionReward: {
                sender: tete.transactionReward.sender,
                amount: tete.transactionReward.amount,
                signature: tete.transactionReward.signature
            },
            transactions: tete.transactions.map(ele => {
                return {
                    sender: ele.sender,
                    receipient: ele.receipient,
                    amount: ele.amount,
                    fees: ele.fees,
                    signature: ele.signature
                }
            })
        }
        tmpBlocs.push(bloc)
        tete = tete.previous
    }
    data.blockchain.blocs = blockchain.blocs;
    fs.writeFile(path, JSON.stringify(data), (err) => {// data ??
        if (err)
            console.log("eerreur ecriture du fichier")
    });
}

// const blockchainData = {
//     name: "eDH blockchain",
//     blockReward: 50,
//     difficuly: 8,
//     cyrptoFunction: "SHA-256",
//     proofStyle: "Proof Of Work",
//     blocs: [
//         {
//             peviousHash: null,
//             nonce: 12304,
//             height: 0,
//             hash: "0x3242342342336363526353636346346",
//             transactionReward: {
//                 sender: "0x34f634645377",
//                 amount: 50,
//                 signature: "0x2345367458659769t89807098697789867986"
//             },
//             transactions: []
//         },
//         {
//             peviousHash: "0x3242342342336363526353636346346",
//             nonce: 345346,
//             height: 1,
//             hash: "0x454745462700046",
//             transactionReward: {
//                 sender: "0x34f634645377",
//                 amount: 50,
//                 signature: "0x867856456456356456e7456436"
//             },
//             transactions: [
//                 {
//                     sender: "0x34f634645377",
//                     receipient: "0xfe2353465436346fe234ab",
//                     amount: 9.5,
//                     fees: 0.1,
//                     signature: "0x345346256474658568769979"
//                 },
//                 {
//                     sender: "0x34f634645377",
//                     receipient: "0xf4444445555555b",
//                     amount: 12,
//                     fees: 0.2,
//                     signature: "0x345457456856867967969"
//                 }
//             ]
//         }
//     ]
// };

// save(blockchainData, '../bd/jsonBlockchain_v2.json');


const solde = async (address) => {
    let soldePersonne = 0;
    try {
        let blockChainForCalculateSolde = await load("../bd/blockchain_v1.json");
        let tete = blockChainForCalculateSolde.lastBlock;
        while (tete != null) {
            if (tete.transactionReward.sender == address) {
                soldePersonne += tete.transactionReward.amount;
            }
            tete.transactions.forEach((trans) => {
                if (trans.sender == address) {
                    soldePersonne -= trans.amount;
                    soldePersonne -= trans.fees;
                } else if (trans.receipient == address) { 
                    soldePersonne += trans.amount;
                    soldePersonne += trans.fees;
                }
            });
            tete = tete.previous;
        }
        return soldePersonne;
    } catch (error) {
        console.error("Error:", error);
        return soldePersonne; 
    }
}
// solde('0xfe2353465436346fe234ab').then(soldeRest => {
//     console.log(soldeRest);
// }).catch(error => {
//     console.error("Error:", error);
// });

const verifierTransaction = async (transaction) => {
    if(transaction.sender===""||transaction.receipient===""||transaction.amount<=0||transaction.sender<0||transaction.sender===""){
        return false;
    }
    
    let soldeActu = await solde(transaction.sender);
    return soldeActu>transaction.amount?true:false;
}
let trans={
    sender: "0x34f634645377",
    receipient: "0xfe2353465436346fe234ab",
    amount: 9.5,
    fees: 0.1,
    signature: "0x345346256474658568769979"
}
verifierTransaction(trans).then((resp)=>{
    console.log(resp);
});


const verifierBloc = (bloc) => {
    //returs true or flase
}
const ajouterBloc = (blockchain, bloc) => {
    //returs true or flase
}
const verifierBlockchain = (blockchain) => {
    //returs true or flase
}
module.exports = {
    load,
    save,
    solde,
    verifierBloc,
    verifierBlockchain,
    verifierTransaction,
    ajouterBloc
}