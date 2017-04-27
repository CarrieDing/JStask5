/**
 * Created by Administrator on 2017/4/27.
 */
(function(){
    var config = [{
        url: '/login',
        responseText: {
            status:200,
            user: []
        },
        response: function(rq){
            console.log("rq.data:"+rq);
            this.responseText.user.push({
                mock_name:"joe",
                mock_pwd:"111"
            });
            this.responseText.user.push({
                mock_name:"carrie",
                mock_pwd:"111"
            });
            this.responseText.user.push({
                mock_name:"alex",
                mock_pwd:"111"
            });
            this.responseText.user.push({
                mock_name:"jason",
                mock_pwd:"111"
            });
            this.responseText.user.push({
                mock_name:"admin",
                mock_pwd:"111"
            });
        }
    }];
    for(var i = 0;i < config.length;i++){
        $.mockjax(config[i]);
    }
    $("#submitBtn").click(function(){
        var username_=account.userCell.value;
        var pwd_=account.password.value;
        if(username_==""||pwd_==""){
             Showbo.Msg.alert("请输入正确的用户名和密码")
         }else{
            $.ajax({
                type:"GET",
                url: '/login',
                async:true,
                success: function(result){
                    var getUser = JSON.stringify(result.user,["mock_name"]);
                    var Obj_User = JSON.parse(getUser);
                    var userArr=[];
                    $.each(Obj_User,function(i,item){
                       userArr.push(item.mock_name);
                    });
                    if($.inArray(username_,userArr)>=0){
                        Showbo.Msg.alert("用户存在，你已经登录");
                        $('#warning').html("");
                    }else{
                        $('#warning').html("用户名不存在");
                    }
                },
                error:function(xhr){
                    console.log(xhr);
                    alert("Other error！");
                }
            });
        }
    });
})()

