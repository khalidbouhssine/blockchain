class Transaction{
    constructor(sender,receipient,amount,fees,signature){
        this.sender=sender
        this.receipient=receipient
        this.amount=amount
        this.fees=fees
        this.signature=signature
        this.bloc=null
    }
}
module.exports=Transaction