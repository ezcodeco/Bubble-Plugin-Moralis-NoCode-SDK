function(instance, properties, context) {

    const { chain, wallet_address } = properties;
    let options = { address: wallet_address };
    options.chain = chain ? chain : Moralis.chainId;

    const showResult = (tokens) => {
        instance.publishState('wallet_tokens', tokens);
        instance.triggerEvent('get_wallet_tokens_ready');
    }

    Moralis.Web3API.account.getTokenBalances(options).then((result => {
        let tokens = [];
        if (!result.length) return showResult(tokens);
        //Convert balance to human readable
        for (let i = 0; i < result.length; i++) {
            result[i].balance = Moralis.Units.FromWei(result[i].balance, result[i].decimals);
            tokens.push(JSON.stringify(result[i]));
            if (i == result.length - 1) { showResult(tokens) }
        }
    }))

}