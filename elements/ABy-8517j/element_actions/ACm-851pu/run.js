function(instance, properties, context) {
    const { ipfs_hash } = properties;

    const url = `https://ipfs.moralis.io:2053/ipfs/${ipfs_hash}`;
    fetch(url)
        .then(res => res.json())
        .then((json => {
            instance.publishState('get_json_result', json);
            instance.triggerEvent('get_json_ready');
        }))
        .catch((e) => {
            console.log('Unable to get json, error: ', e);
        })
}