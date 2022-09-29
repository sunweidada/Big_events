;$(function(){
//   注册页面和登陆页面的切换 
    $('#go2Reg').on('click',function(){
       $('.login-wrap').hide()
       $('.reg-wrap').show()
    })
    $('#go2Logion').on('click',function(){
        $('.reg-wrap').hide()
        $('.login-wrap').show()
     })
   //   表单验证
     const form=layui.form
     const layer=layui.layer
     console.log(form);
     form.verify({
      pwd: [
         /^[\S]{6,12}$/
         ,'密码必须6到12位，且不能出现空格'
       ],
      repwd:function(value){
        if(value!== $('#password').val()){
            return '两次密码不一致'
         }
      } 
     })

   //   封装JSON格式的字符串对象
   // function format2Json(source){
   //    let target={}
   //    source.split('&').forEach(el=>{
   //       let kv= el.split('=')
   //       target[kv[0]]=kv[1]
   //    })
   //    return JSON.stringify(target)
   // }
   //   注册页面的提交事件
   $('#formReg').on('submit',function(e){
      e.preventDefault()
      $.ajax({
         method:'POST',
         url:'/api/reg',
         contentType:'application/json',
         // data:JSON.stringify({
         //   username:$('#formReg [name=username]').val(),
         //   password:$('#formReg [name=password]').val(),
         //   repassword:$('#formReg [name=repassword]').val()
         // }),
         // data:format2Json($(this).serialize()),
         data:$(this).serialize(),
         success(res){
            // console.log(res);
            if(res.code!==0){
               return layer.msg(res.message)
            }
            $('#go2Logion').click()
            layer.msg('注册成功');
         }
      })
   })

   // 登陆页面的提交事件
   $('#formLogin').on('submit',function(e){
      e.preventDefault()
      $.ajax({
         method:'POST',
         url:'/api/login',
         // contentType:'application/json',
         // data:format2Json($(this).serialize()),
         data:$(this).serialize(),
         success(res){
            if(res.code!==0) return layer.msg(res.message)
            localStorage.setItem('token',res.token)
            location.href='./2.index.html'
         }
      })
   })
});