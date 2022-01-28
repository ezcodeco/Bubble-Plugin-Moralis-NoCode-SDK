function(instance, properties, context) {


    const { amount, receiver, contractAddress, decimals } = properties;

    const runTx = (dm) => {
        const options = { type: "erc20", amount: Moralis.Units.Token(`${amount}`, dm), "receiver": receiver, "contractAddress": contractAddress };
        instance.data.MoralisTransfer(options);
    }

    if (decimals) {
        runTx(decimals);
    } else {
        //Get token decimals
        Moralis.Web3API.token.getTokenMetadata({ "addresses": contractAddress }).then(tokenMetadata => {
            const decimals = tokenMetadata[0].decimals;
            if(decimals){
                runTx(tokenMetadata[0].decimals);
            }else{
                console.error('Unable to extract token decimals')
            }
        })
    }
}