class BlockChain{
    constructor(name,blockReward,difficulty,cryptoFunction,proofStyle){
        this.name=name
        this.blockReward=blockReward
        this.difficulty=difficulty
        this.cryptoFunction=cryptoFunction
        this.proofStyle=proofStyle
        this.lastBlock=null
    }
}
module.exports=BlockChain