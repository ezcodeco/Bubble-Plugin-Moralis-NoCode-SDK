function(instance, context) {

    instance.data.setMoralisEvents = () => {
        Moralis.onChainChanged(function (chain) {
            let connectedChain = chain && chain.length ? chain : Moralis.chainId;
            instance.publishState('connected_to_chain_id', connectedChain);
        });

        Moralis.onAccountChanged(function (account) {
            instance.publishState('connected_wallet_address', account);
        });

        Moralis.onDisconnect(function (account) {
            instance.data.loggedOut();
        });
    }

    instance.data.errEvent = error => {
        if (error.code == 4001) {
            instance.triggerEvent('user_rejected');
        } else {
            console.log(error);
            instance.triggerEvent('error_while_sending_transaction');
            //instance.publishState('payment_status', instance.data.txStatusTexts.err);
        }
    }

    instance.data.loggedIn = (user) => {
        Moralis.enableWeb3();
        instance.publishState('is_user_logged_in', true);
        instance.publishState('connected_wallet_address', user.get('ethAddress'));
        setTimeout(() => {
            let chainId = Moralis.chainId;
            if (chainId) instance.publishState('connected_to_chain_id', chainId);
        }, 100);
        instance.data.setMoralisEvents();
    }

    instance.data.loggedOut = () => {
        instance.publishState('is_user_logged_in', false);
        instance.triggerEvent('logged_out');
    }

    instance.data.MoralisTransfer = options => {
        Moralis.transfer(options).then(tx => {
            const { hash } = tx;
            instance.publishState('transaction_hash', hash);
            instance.triggerEvent('transaction_sent');
        }).catch(instance.data.errEvent)
    }

    instance.data.run = conf => {
        const currentUser = Moralis.User.current();
        if (currentUser) {
            instance.data.loggedIn(currentUser);
        } else {
            instance.data.loggedOut();
        }
    };

}