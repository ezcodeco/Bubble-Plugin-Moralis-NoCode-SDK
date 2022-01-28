function(instance, properties) {
    const bgImage = "https://s3.amazonaws.com/appforest_uf/f1643196413268x501787344895618240/moralis_logo-2.svg";

instance.canvas.css({
        "width": `${properties.bubble.width()}px`,
        "height": `${properties.bubble.height()}px`,
        "background-image": `url(${bgImage})`,
        "background-repeat": 'no-repeat, repeat',
        "background-position": 'center',
        "background-size": 'contain'
    })

}