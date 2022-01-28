function(instance, properties, context) {


  Moralis.User.logOut().then(instance.data.loggedOut);



}