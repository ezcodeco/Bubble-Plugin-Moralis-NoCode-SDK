function(instance, properties, context) {

 if(instance.data.subscribtion) {
     instance.data.subscribtion.unsubscribe().then(()=>{
         instance.publishState('is_subscribed',false);
         instance.data.subscribtion = null;
     })
 }

}