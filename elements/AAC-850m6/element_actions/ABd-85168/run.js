function(instance, properties, context) {

    const { chain, wallet_address, token_address } = properties;
    let options = { address: wallet_address };
    options.chain = chain ? chain : Moralis.chainId;

    const showResult = (balance) => {
        instance.publishState('balance_of_token', balance);
        instance.triggerEvent('get_balance_of_token_ready');
    }

    Moralis.Web3API.account.getTokenBalances(options).then((result => {
        if (!result.length) return showResult("0");
        let tokenBalance = "0";
        //Find token by contract and convert balance to human readable
        for (let i = 0; i < result.length; i++) {
            if (result[i].token_address == token_address) {
                tokenBalance = Moralis.Units.FromWei(result[i].balance, result[i].decimals);
                showResult(tokenBalance);
                return;
            }
            if (i == result.length - 1) {
                showResult(tokenBalance);
            }
        }
    }))

}