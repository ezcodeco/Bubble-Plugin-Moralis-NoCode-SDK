function(instance, properties, context) {

    const { base64, file_name } = properties;
    var base64result = base64.includes('base64') ? base64.split(',')[1] : base64;
    const file = new Moralis.File(`${file_name}`, { base64: base64result });
    context.async(async cb => {
        const result = await file.saveIPFS();
        instance.publishState('uploaded_base64_ipfs', result.hash());
        instance.triggerEvent('base64_uploaded');
        cb(null);
    })

}