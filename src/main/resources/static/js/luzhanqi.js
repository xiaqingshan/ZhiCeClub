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
        $("#bh"+hori+"v"+vert).find('div[name="qiwei"]').addClass("anqi");
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




var fighting = false;
var tofightingid = undefined;
function clearQizi(handlerMM){
	handlerMM.children(".anqi").remove();
}

$("li[id^='bh']").click(function(){
    var toFightId = $("#"+tofightingid).find('div[name="qiwei"]');
    var thisId =$("#"+this.id).find('div[name="qiwei"]');
    if(fighting){
        if(qizixinxi[this.id].split("-")[0] != qizixinxi[tofightingid].split("-")[0]){
            //duijia gan
            console.log("duijia kaigan");
            var gongfang = qizixinxi[tofightingid].split("-")[1];
            var shoufang = qizixinxi[this.id].split("-")[1]
            if(chiziguanxi[gongfang] > chiziguanxi[shoufang ]){
                console.log("shengduifang tidaizhi");
                toFightId.text("");
                toFightId.removeClass(qizixinxi[tofightingid].split("-")[0]+"fangqizi");
                thisId.addClass(qizixinxi[tofightingid].split("-")[0]+"fangqizi");
                thisId.removeClass(qizixinxi[this.id].split("-")[0]+"fangqizi");
                thisId.text(qizixinxi[tofightingid].split("-")[1]);
                qizixinxi[this.id] = qizixinxi[tofightingid];
                qizixinxi[tofightingid] = undefined;
                fighting = false;
                tofightingid = undefined
            }else if(chiziguanxi[gongfang]== chiziguanxi[shoufang ]){
                console.log("yiyangda pingle")
                toFightId.removeClass(qizixinxi[tofightingid].split("-")[0]+"fangqizi");
                toFightId.text("");
                thisId.removeClass(qizixinxi[this.id].split("-")[0]+"fangqizi");
                thisId.text("");
                qizixinxi[this.id] = undefined;
                qizixinxi[tofightingid] = undefined;
                fighting = false;
                tofightingid = undefined
            }else{
                console.log("ganbuguo meibianhua");
                fighting = false;
                tofightingid = undefined
            }

        }else if(qizixinxi[this.id].split("-")[0] == qizixinxi[tofightingid].split("-")[0]){
            //benjia huan
            console.log("shibenjia huangeqizi caozuo");
            tofightingid = this.id;
        }else{
            //kongde yiwei
            console.log("yidong dao ci kongweizhi");
            toFightId.text("");
            toFightId.removeClass(qizixinxi[tofightingid].split("-")[0]+"fangqizi");
            thisId.addClass(qizixinxi[tofightingid].split("-")[0]+"fangqizi");
            thisId.removeClass(qizixinxi[this.id].split("-")[0]+"fangqizi");
            thisId.text(qizixinxi[tofightingid].split("-")[1]);
            qizixinxi[this.id] = qizixinxi[tofightingid];
            qizixinxi[tofightingid] = undefined;
            fighting = false;
            tofightingid = undefined
        }
    }else{
        if($(this).find(".anqi").length ==1 ){
        	$("#"+this.id).find('div[name="qiwei"]').removeClass("anqi");
        	$("#"+this.id).find('div[name="qiwei"]').addClass(qizixinxi[this.id].split("-")[0]+"fangqizi");
        	$("#"+this.id).find('div[name="qiwei"]').text(qizixinxi[this.id].split("-")[1]);
            qizixinxi[this.id] = qizixinxi[this.id].replace("-an","-ming");
        }else if($(this).find(".lanfangqizi").length ==1 || $(this).find(".hongfangqizi").length ==1){
            fighting = true;
            tofightingid = this.id;
        }
    }
});

$("#refreshBtn").click(function () {
    initAll();
    fighting = false;
    tofightingid = undefined;
});