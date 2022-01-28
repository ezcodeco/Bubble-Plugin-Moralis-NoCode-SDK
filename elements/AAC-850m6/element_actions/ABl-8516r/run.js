function(instance, properties, context) {

    const { wallet, chain } = properties;

    let options = { address: wallet };
    options.chain = chain ? chain : Moralis.chainId;

    Moralis.Web3API.account.getNFTs(options).then(nfts => {
        instance.publishState('total_nfts_in_wallet', nfts.total);
        //Stringify objects
        let allNFTs = [];
        for (let i = 0; i < nfts.result.length; i++) {
            allNFTs.push(JSON.stringify(nfts.result[i]));
            if (i == nfts.result.length - 1) {
                instance.publishState("all_wallet_nfts", allNFTs);
                instance.triggerEvent('get_all_wallet_nfts_ready');
            }
        }
    })

}