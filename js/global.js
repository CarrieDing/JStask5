/**
 * Created by Administrator on 2017/4/12.
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
function getItemValue(id) {
    var item = getItembyID(id);
    return item.value;
}
function changeValue(id,val) {
    var setValue=getItembyID(id);
    setValue.value=val;
}
function getItembyID(id) {
    if (!document.getElementById(id)) return false;
    return document.getElementById(id);
}
function pageJump(url) {
    self.location=url;
}
function hideItem(id) {
    var item=getItembyID(id);
    item.style.display="none";
}
function showItem(id) {
    var item=getItembyID(id);
    item.style.display="block";
}

function getQueryString(name) {
    var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)","i");
    var r=window.location.search.substr(1).match(reg);
    if(r!=null) return (r[2]); return null;
}
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
function getCookie(name){
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null){
        return decodeURIComponent(arr[2]);
    }else{
        return null;
    }
}
function calcTime(date1,date2) {
    var interval=date2-date1;
    var days=Math.floor(interval/(24*3600*1000));
    var leave1=interval%(24*3600*1000);
    var hours=Math.floor(leave1/(3600*1000));
    var leave2=leave1%(3600*1000);
    var minutes=Math.floor(leave2/(60*1000));
    var leave3=leave2%(60*1000);
    var seconds=Math.floor(leave3/1000);
    return hours+"小时"+minutes+"分钟";
}
function NumberToChinese(num){
    var chnNumChar = {零:0,一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9};
    var chnUnitChar = ["","十","百","千"];
    var chnUnitSection = ["","万","亿","万亿"];
    var unitPos = 0;
    var strIns = '', chnStr = '';
    var needZero = false;

    if(num === 0){
        return chnNumChar[0];
    }

    while(num > 0){
        var section = num % 10000;
        if(needZero){
            chnStr = chnNumChar[0] + chnStr;
        }
        strIns = SectionToChinese(section);
        strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];

        chnStr = strIns + chnStr;
        needZero = (section < 1000) && (section > 0);
        num = Math.floor(num / 10000);
        unitPos++;
    }

    return chnStr;
}

function SectionToChinese(section){
    var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
    var chnUnitSection = ["","万","亿","万亿"];
    var chnUnitChar = ["","十","百","千"];
    var strIns = '', chnStr = '';
    var unitPos = 0;
    var zero = true;
    while(section > 0){
        var v = section % 10;
        if(v === 0){
            if(!zero){
                zero = true;
                chnStr = chnNumChar[v] + chnStr;
            }
        }else{
            zero = false;
            strIns = chnNumChar[v];
            strIns += chnUnitChar[unitPos];
            chnStr = strIns + chnStr;
        }
        unitPos++;
        section = Math.floor(section / 10);
    }
    return chnStr;
}






