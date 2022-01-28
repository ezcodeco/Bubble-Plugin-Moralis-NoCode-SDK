function(instance, properties, context) {


    const { type, contractAddress, tokenId, amount, receiver } = properties;

    let options = { type: type.toLowerCase(), receiver, contractAddress, tokenId };
    if (type == "ERC1155") options.amount = amount;

    instance.data.MoralisTransfer(options);

}