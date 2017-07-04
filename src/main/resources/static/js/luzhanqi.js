/**
 * Created by qingshan on 17-7-2.
 */


/**
 *
 */
var allRolesMap={
    junqi:'军棋',
    siling:'司令',
    junzhang:'军长',
    shizhang1:'师长',
    shizhang2:'师长',
    lvzhang1:'旅长',
    lvzhang2:'旅长',
    tuanzhang1:'团长',
    tuanzhang2:'团长',
    yingzhang1:'营长',
    yingzhang2:'营长',
    lianzhang1:'连长',
    lianzhang2:'连长',
    lianzhang3:'连长',
    paizhang1:'排长',
    paizhang2:'排长',
    paizhang3:'排长',
    gongbing1:'工兵',
    gongbing2:'工兵',
    gongbing3:'工兵',
    dilei1:'地雷',
    dilei2:'地雷',
    dilei3:'地雷',
    zhadan1:'炸弹',
    zhadan2:'炸弹'
};

var chiziguanxi ={
    '军棋':0,
    '司令':40,
    '军长':39,
    '师长':38,
    '旅长':37,
    '团长':36,
    '营长':35,
    '连长':34,
    '排长':33,
    '工兵':10,
    '地雷':2,
    '炸弹':1
};

var qizixinxi = {};

function initAll() {


    allRolesList = ["junqi","siling","junzhang","shizhang1","shizhang2","lvzhang1","lvzhang2","tuanzhang1","tuanzhang2","yingzhang1","yingzhang2","lianzhang1","lianzhang2","lianzhang3","paizhang1","paizhang2","paizhang3","gongbing1","gongbing2","gongbing3","dilei1","dilei2","dilei3","zhadan1","zhadan2"];
    redRolesList = ["junqi","siling","junzhang","shizhang1","shizhang2","lvzhang1","lvzhang2","tuanzhang1","tuanzhang2","yingzhang1","yingzhang2","lianzhang1","lianzhang2","lianzhang3","paizhang1","paizhang2","paizhang3","gongbing1","gongbing2","gongbing3","dilei1","dilei2","dilei3","zhadan1","zhadan2"];
    blueRolesList = ["junqi","siling","junzhang","shizhang1","shizhang2","lvzhang1","lvzhang2","tuanzhang1","tuanzhang2","yingzhang1","yingzhang2","lianzhang1","lianzhang2","lianzhang3","paizhang1","paizhang2","paizhang3","gongbing1","gongbing2","gongbing3","dilei1","dilei2","dilei3","zhadan1","zhadan2"];

    function huaqizi(hori,vert,hongorlan,role) {
        theNodeHandler = $("#bh"+hori+"v"+vert);
        theNodeHandler.removeClass("bingzhan");
        if(hongorlan == "hong"){
            theNodeHandler.addClass("anqi");
        }
        if(hongorlan == "lan"){
            theNodeHandler.addClass("anqi");
        }

        // theNodeHandler.text(role);
    }


    notInitList = [
        "0,6","1,6","2,6","3,6","4,6",
        "1,2","3,2","2,3","1,4","3,4",
        "1,8","3,8","2,9","1,10","3,10",
    ];



    for(v=12; v>-1; v--){
        for(h=4; h>-1; h--){
            if(notInitList.indexOf(h+','+v) == -1){
                if(redRolesList.length > 0){
                    bror = Math.random();
                }else{
                    bror = 0;
                }
                seed = Math.random();
                if(bror<0.5 && blueRolesList.length>0){
                    theRole = blueRolesList[parseInt(blueRolesList.length*seed)];
                    qizixinxi["bh"+h+"v"+v] = "lan-"+allRolesMap[theRole]+"-an";
                    blueRolesList.splice(parseInt(blueRolesList.length*seed), 1);
                }else{
                    theRole = redRolesList[parseInt(redRolesList.length*seed)];
                    qizixinxi["bh"+h+"v"+v] = "hong-"+allRolesMap[theRole]+"-an";
                    redRolesList.splice(parseInt(redRolesList.length*seed), 1);
                }
            }

        }
    }

    for(v=12; v>-1; v--){
        for(h=4; h>-1; h--){
            if(qizixinxi["bh"+h+"v"+v] != undefined){
                var guishufang = qizixinxi["bh"+h+"v"+v].split("-")[0];
                var qiziming = qizixinxi["bh"+h+"v"+v].split("-")[1];
                huaqizi(h,v,guishufang,qiziming);
            }
        }
    }
}

//
initAll();


var fighting = false;
var tofightingid = undefined;
$("div[id^='bh']").click(function(){
    mm = $("#"+this.id);
    if(fighting){
        if(qizixinxi[this.id].split("-")[0] != qizixinxi[tofightingid].split("-")[0]){
            var gongfang = qizixinxi[tofightingid].split("-")[1];
            var shoufang = qizixinxi[this.id].split("-")[1]
            if(chiziguanxi[gongfang] > chiziguanxi[shoufang ]){
                $("#"+tofightingid).text("");
                $("#"+tofightingid).removeClass(qizixinxi[tofightingid].split("-")[0]+"fangqizi");
                $("#"+this.id).addClass(qizixinxi[tofightingid].split("-")[0]+"fangqizi");
                $("#"+this.id).removeClass(qizixinxi[this.id].split("-")[0]+"fangqizi");
                $("#"+this.id).text(qizixinxi[tofightingid].split("-")[1]);
                qizixinxi[this.id] = qizixinxi[tofightingid];
                qizixinxi[tofightingid] = undefined;
                fighting = false;
                tofightingid = undefined
            }else if(chiziguanxi[gongfang]== chiziguanxi[shoufang ]){
                $("#"+tofightingid).removeClass(qizixinxi[tofightingid].split("-")[0]+"fangqizi");
                $("#"+tofightingid).text("");
                $("#"+this.id).removeClass(qizixinxi[this.id].split("-")[0]+"fangqizi");
                $("#"+this.id).text("");
                qizixinxi[this.id] = undefined;
                qizixinxi[tofightingid] = undefined;
                fighting = false;
                tofightingid = undefined
            }else{
                fighting = false;
                tofightingid = undefined
            }

        }else if(qizixinxi[this.id].split("-")[0] == qizixinxi[tofightingid].split("-")[0]){
            tofightingid = this.id;
        }else{
            fighting = false;
        }
    }else{
        if(this.className == "anqi"){
            mm.removeClass("anqi");
            mm.addClass(qizixinxi[this.id].split("-")[0]+"fangqizi");
            mm.text(qizixinxi[this.id].split("-")[1]);
            qizixinxi[this.id] = qizixinxi[this.id].replace("-an","-ming");
        }else if(this.className.indexOf("fangqizi") > -1){
            fighting = true;
            tofightingid = this.id;
        }
    }
});