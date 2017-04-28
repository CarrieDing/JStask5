/**
 * Created by Administrator on 2017/4/28.
 */
/**
 * Created by Administrator on 2017/4/27.
 */
var username_=$("#username");
var pwd_=$("#password");
var warning_=$("#warning");

$(document).ready(function () {
    $("#submitBtn").click(function () {
        if (username_.val() == "" || pwd_.val()== "") {
            Showbo.Msg.alert("请输入正确的用户名和密码")
        }else{
            if(checkUsername(username_.val())&&checkPWD(pwd_.val())){
                $.ajax({
                    type:"POST",
                    url:"/carrots-admin-ajax/a/login/?",
                    data:{name:username_.value,pwd:pwd_.value},
                    contentType:'application/x-www-form-urlencoded;charset=UTF-8',
                    async:true,
                    success:function (result) {
                        responseData=JSON.stringify(result);
                        if(responseData.message=="用户不存在"){
                            $("#warning").innerHTML="用户不存在";
                        }else{
                            window.location.href="http://dev.admin.carrots.ptteng.com/#/login/?name="+$('#username').value+"&pwd="+$('#password').value;
                        }
                    },
                    error:function (xhr) {
                        console.log(xhr);
                        alert("sorry！ miss some error！");
                    }
                });
            }else{}
        }
    });
});

function checkUsername(s) {
    var rule=/^(\w|\W){1,20}$/;
    if(!rule.exec(s)){
        warning_.html("用户名可以是中文、字母、数字、下划线，长度6-20");
        return false;
    }else{
        return true;
    }
}
function checkPWD(s) {

    var rule=/^(\w){6,20}$/;
    if(!rule.exec(s)){
        warning_.html("密码可以是字母、数字、下划线，长度6-20");
        return false;
    }else{
        return true;
    }
}

