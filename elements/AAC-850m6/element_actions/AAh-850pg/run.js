function(instance, properties, context) {

	const {sign_message,chain_id} =properties;
    
    let conf = {provider: "walletconnect"};
    if(sign_message) conf.signingMessage = sign_message;
    if(chain_id) conf.chainId = chain_id;
    Moralis.authenticate(conf).then(function (user) {
      instance.data.loggedIn(user)

    }).catch(instance.data.errEvent)


}