/**
 * Created by Administrator on 2017/4/27.
 */
function addLoadEvent(func) {
    var oldonload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }else{
        window.onload=function () {
            oldonload();
            func();
        }
    }
}
function getHTTPObject(){
    if(typeof XMLHttpRequest=="undefined")
        XMLHttpRequest=function () {
            try{
                return new ActiveXObject("Msxml2.XMLHTTP.6.0");
            }catch (e){}
            try{
                return new ActiveXObject("Msxml2.XMLHTTP.3.0");
            }catch (e){}
            try{
                return new ActiveXObject("Msxml2.XMLHTTP");
            }catch (e){}
            return false;
        }
        return new XMLHttpRequest();
}
function submitFormAjax() {
    var request=getHTTPObject();
    if(!request){return false}
    request.withCredentials=true;
    var data='name='+encodeURIComponent(getItembyID('username').value)+'&pwd='+encodeURIComponent(getItembyID('password').value);
    request.open('POST','/carrots-admin-ajax/a/login/?',true);
    request.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');
    request.onreadystatechange=function () {
        if(request.readyState===4){
                    if(request.status===200||request.status==0){
                        var responseData=request.responseText;
                        responseData=JSON.parse(responseData);
                        if(responseData.message=="用户不存在"){
                            getItembyID("warning").innerHTML="用户不存在";
                        }else{
                            window.location.href="http://dev.admin.carrots.ptteng.com/#/login/?name="+getItembyID('username').value+"&pwd="+getItembyID('password').value;
                        }
                    }
                }
    };
    request.send(data);
}
function submitRequest() {
    var btn = getItembyID("submitBtn");
    btn.onclick = function () {
        var username_ = getItembyID("username").value;
        var pwd_ = getItembyID("password").value;
        if (username_ == "" || pwd_ == "") {
            Showbo.Msg.alert("请输入正确的用户名和密码")
        }
        if(checkUsername(username_)&&checkPWD(pwd_)){
            submitFormAjax();
            }else{}
    }
}
function checkUsername(s) {
    var rule=/^(\w|\W){1,20}$/;
    if(!rule.exec(s)){
        getItembyID("warning").innerHTML="用户名可以是中文、字母、数字、下划线，长度6-20";
        return false;
    }else{
        return true;
    }
}
function checkPWD(s) {

    var rule=/^(\w){6,20}$/;
    if(!rule.exec(s)){
        getItembyID("warning").innerHTML="密码可以是字母、数字、下划线，长度6-20";
        return false;
    }else{
        return true;
    }
}
addLoadEvent(submitRequest);

