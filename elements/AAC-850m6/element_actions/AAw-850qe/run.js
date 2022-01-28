function(instance, properties, context) {


    const { amount, receiver } = properties;

    const options = { type: "native", amount: Moralis.Units.ETH(`${amount}`), receiver };

    instance.data.MoralisTransfer(options);

}