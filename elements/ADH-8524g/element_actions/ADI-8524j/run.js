function(instance, properties, context) {
    const {event_type,chain_name} = properties;
    const eventName = event_type.replace(' ','');
    const isNative = event_type == "Eth Transactions";
	const type =  isNative ? eventName : chain_name + eventName;
    const query = new Moralis.Query(type);
    
    query.subscribe().then(subscribtion=>{
        instance.data.subscribtion = subscribtion; //to be used for unsubscribing
        instance.publishState('is_subscribed',true);
        instance.triggerEvent('subscribed');
        subscribtion.on("create",(object)=>{
            const {transaction_hash, to_address } = object.attributes;
            if(!isNative){ 
                instance.publishState('transfer_token_address',object.attributes.token_address);
            }
            instance.publishState('transaction_hash',transaction_hash);
            instance.publishState('transfer_to_wallet',to_address);
            instance.triggerEvent('new_transaction');
        })
    });
	
}