function(instance, properties, context) {


    const { token_address, exchange, chain } = properties;

    let options = { address: token_address };
    options.chain = chain ? chain : Moralis.chainId;
    if (exchange) options.exchange = exchange;

    Moralis.Web3API.token.getTokenPrice(options).then(result => {
        const price = result.usdPrice;
        instance.publishState('token_price_usd',price);
        instance.triggerEvent('get_token_price_ready');
    }).catch((e)=>{
        instance.triggerEvent('unable_to_get_token_price');
    })

}