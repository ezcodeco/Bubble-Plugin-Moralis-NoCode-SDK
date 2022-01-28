function(instance, properties, context) {

    const options = { chain: Moralis.chainId };
    Moralis.Web3API.account.getNativeBalance(options).then((result => {
        const { balance } = result;
        if (balance != '0') {
            const fromWei = Moralis.Units.FromWei(balance, 18);
            instance.publishState('native_balance', fromWei);
        } else {
            instance.publishState('native_balance', 0);
        }
        instance.triggerEvent('native_balance');
    }))

}