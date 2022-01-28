function(instance, properties, context) {

    const { chain, transaction_hash } = properties;
    let options = { transaction_hash };
    options.chain = chain ? chain : Moralis.chainId;

    Moralis.Web3API.native.getTransaction(options).then(result => {
        let txBlockNr = result.block_number;
        if (txBlockNr) {
            txBlockNr = parseInt(txBlockNr);
            Moralis.Web3API.native.getDateToBlock({ chain: options.chain, date: new Date() }).then(latestBlock => {
                const lastBlockNr = latestBlock.block;
                const txConfirmations = lastBlockNr - txBlockNr;
                instance.publishState('transaction_confirmations',txConfirmations);
            });
        } else {
            instance.publishState('transaction_confirmations',0);
        }
    })
}