--------- Blockchain eDH ---------
- Proof of work style
- block reward : 50 eDH
- hash/sign function: SHA-256
- difficulty (nombre de zero)
- bloc : 
    list of transactions(0 to 20)
    previous bloc hash
    nonce
    height
    reward transaction
    hash (previousHash+signatureTx1+..+signatureTxn+height+signatureReward+nonce)
- transaction:
    sender (public key)
    receipient (public key)
    amount (eDH)
    fees (eDH)
    signature (sender+amount+receipient+fees)
- reward transaction:
    miner (public key)
    reward (eDH)
    signature (miner+reward+height)