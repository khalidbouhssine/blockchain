class TransactionReward{
    constructor(sender,amount,signature){
        this.sender=sender
        this.amount=amount
        this.signature=signature
        this.bloc=null
    }
}
module.exports=TransactionReward