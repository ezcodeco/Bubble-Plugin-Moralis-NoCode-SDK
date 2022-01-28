function(instance, properties, context) {
    
	const {sign_message} = properties;
    let conf = {};
    if(sign_message) conf.signingMessage = sign_message;

	Moralis.authenticate(conf).then(function (user) {
      instance.data.loggedIn(user)
	}).catch(instance.data.errEvent)

}