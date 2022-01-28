function(instance, properties, context){

    const { object, name } = properties;
    const file = new Moralis.File(`${name}.json`, { base64: btoa(JSON.stringify(object)) });
    context.async(async cb=>{
   	 	const result = await file.saveIPFS();
        instance.publishState('uploaded_json_ipfs',result.hash());
        instance.triggerEvent('json_uploaded');
        cb(null);
    })
   
}