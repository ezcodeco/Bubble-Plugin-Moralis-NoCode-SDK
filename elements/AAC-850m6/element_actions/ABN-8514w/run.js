function(instance, properties, context) {

    const { contractAddress, chain } = properties;

    let options = { addresses: contractAddress };
    if (chain) options.chain = chain;

    Moralis.Web3API.token.getTokenMetadata(options).then(tokens => {
        instance.publishState('erc20_metadata', JSON.stringify(tokens[0]));
        instance.triggerEvent('erc20_metadata_is_ready');
    });

}