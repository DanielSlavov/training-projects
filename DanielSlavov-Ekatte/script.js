var oReq = new XMLHttpRequest();
var obj;
var arr=[];

function findInfo2()
{
    if ( document.readyState !== 'complete' ) return;
    $("#info").html("");
    var name =$("input").val();
    var info="";
    var infoReq = new XMLHttpRequest();
    infoReq.onload=function(){
        var res;
        try{res = JSON.parse(this.responseText);}
        catch{ return;};
        res.forEach(function(el){
            info+=el["type"]+"";
            info+=el["name"]+" ";
            info+="общ."+el["mun_name"]+" ";
            info+="обл."+el["area_name"]+"\n";
            $("#info").append(info);
            $("#info").append("<br>");
            info="";
        })
    }
    infoReq.open("get","./findInfo.php?name="+name.toLowerCase().trim(),true);
    infoReq.send();
}


function findResults(str)
{
    if ( document.readyState !== 'complete' ) return;
    var searchRequest = new XMLHttpRequest();
    searchRequest.onload=function(){
    arr.length = 0
    var res;
    try{res = JSON.parse(this.responseText);}
    catch{ return;};
    res.forEach(function(el){
       if(!arr.includes(el))
       arr.push(el);
   })
    console.log(arr)
    }
    searchRequest.open("get","./findRes.php?str="+str.toLowerCase().trim(),true);
    searchRequest.send();
}

oReq.onload = function() {
    obj=JSON.parse(this.responseText)
    console.log(obj)
    $("#placesCount").text(obj["places_count"])
    $("#munCount").text(obj["mun_count"])
    $("#areasCount").text(obj["areas_count"])


    $("input").keyup(function(){    
        var start=$("input").val();
        findResults(start);

    })
    $("input").autocomplete({
        source:function(request, response) {
            response(arr.slice(0,10));
          },
        minLength: 2,
        select: function(event, ui) {
            event.preventDefault();
            $("input").val(ui.item.label);
        }
      });

};

oReq.open("get", "./load.php", true);
oReq.send();