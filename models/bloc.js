class Bloc{
    constructor(previousHash,nonce,height,hash,transactionReward,transactions,previous){
        this.previousHash=previousHash;
        this.nonce=nonce;
        this.height=height;
        this.hash=hash;
        this.transactionReward=transactionReward;
        this.transactions=transactions;
        this.previous=previous;
    }
}
module.exports=Bloc;