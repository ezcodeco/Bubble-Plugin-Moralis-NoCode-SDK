function(instance, properties, context) {

    const { chain, contract_address, function_name, parameters, contract_abi } = properties;
    let options = { address: contract_address, function_name, abi: contract_abi };
    options.chain = chain ? chain : Moralis.chainId;
    if (parameters) options.params = JSON.parse(parameters)

    Moralis.Web3API.native.runContractFunction(options).then(result => {
        instance.publishState("contract_functions_result", `${result}`);
        instance.triggerEvent('run_contract_functions_finished');
    })
}