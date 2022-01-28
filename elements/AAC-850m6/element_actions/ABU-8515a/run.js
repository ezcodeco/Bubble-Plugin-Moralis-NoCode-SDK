function(instance, properties, context) {

    const { contractAddress, chain } = properties;

    let options = { address: contractAddress };
    if (chain) options.chain = chain;
    Moralis.Web3API.token.getNFTMetadata(options).then(tokens => {
        instance.publishState('nft_metadata', JSON.stringify(tokens));
        instance.triggerEvent('nft_metadata_is_ready');
    });

}