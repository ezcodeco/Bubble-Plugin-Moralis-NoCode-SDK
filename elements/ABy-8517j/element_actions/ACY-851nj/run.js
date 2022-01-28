function(instance, properties, context) {

    const id = 'moralisTempInput';
    let inputNode = $(`#${id}`);
    if (inputNode.length < 1) {
        const tempInput = `<input type="file" id="${id}" style="opacity:0;">`;
        $('body').append(tempInput);
        inputNode = $(`#${id}`);
        inputNode.on('change', e => {
            const data = e.target.files[0];
            const file = new Moralis.File(data.name, data);
            file.saveIPFS().then(() => {
                const ipfs = file.hash();
                instance.publishState('uploaded_file_ipfs', ipfs);
                instance.triggerEvent('file_uploaded');
            });
            inputNode.remove();
        });
    }
    inputNode.click();
}