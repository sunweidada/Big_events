$.ajaxPrefilter(function(config){
    function format2Json(source){
        let target={}
        source.split('&').forEach(el=>{
           let kv= el.split('=')
           target[kv[0]]=kv[1]
        })
        return JSON.stringify(target)
     }
    console.log(config);
    config.url='http://big-event-vue-api-t.itheima.net'+config.url
    config.contentType='application/json',
    config.data=format2Json(config.data)
})