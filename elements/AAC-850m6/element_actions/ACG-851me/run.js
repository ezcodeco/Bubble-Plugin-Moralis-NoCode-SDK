function(instance, properties, context) {


    const { contract_address, chain } = properties;
    let options = { address: contract_address };
    options.chain = chain ? chain : Moralis.chainId;

    Moralis.Web3API.token.getNFTLowestPrice(options).then(result => {
        const price = Moralis.Units.FromWei(result.price, 18);
        instance.publishState('nft_lowest_price',price);
        instance.triggerEvent('get_nft_lowest_price_done');
    }).catch((e)=>{
        instance.triggerEvent('unable_to_get_nft_price');
    })

}