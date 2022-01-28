function(instance, properties, context) {

    const { token_address, chain, address } = properties;
    let options = { token_address };
    options.chain = chain ? chain : Moralis.chainId;
    if (address) options.address = address

    Moralis.Web3API.account.getNFTsForContract(options).then(nfts => {
        // Stringify objects
        let allNFTs = [];
        for (let i = 0; i < nfts.result.length; i++) {
            allNFTs.push(JSON.stringify(nfts.result[i]));
            if (i == nfts.result.length - 1) {
                console.log(allNFTs);
                instance.publishState("all_nfts_from_contract", allNFTs);
                instance.triggerEvent('get_all_nfts_in_contract_ready');
            }
        }
    })

}