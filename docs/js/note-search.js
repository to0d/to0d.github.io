var text        = document.getElementById('in-sh-text');
var search_div  = document.getElementsByClassName('note-search')[0];
var rtb         = document.querySelector(".note-search table");
var go          = document.getElementById("go");
var dm          = document.getElementById('note-domain');
var his         = document.getElementById('in-sh-his-rst');
var his_cnt     = document.getElementById('in-sh-rst-cnt');

text.onkeyup = function(e){
    
    if (!e) e = window.event;
    
    // Entry Key
    if ((e.keyCode || e.which) == 13) {
        return;
    }
    
    search_tips(this.value);
}

text.onkeydown  = function(e){
    
    if (!e) e = window.event;

    // Entry Key
    if ((e.keyCode || e.which) == 13) {
        search_key(text.value, text.value);
    }
}


function search_key(key, key_his){

    search_div.style.display = key!=""?"block":"none";
    var sc = document.createElement("script");
    sc.src = "../search/su?wd="+key+"&cb=search_result"+"&dm="+dm.content;
    document.body.appendChild(sc);

    add_search_history(key_his);
}

function search_button(){
    search_key(text.value, text.value);
}

function search_tips(key){
    search_div.style.display = key!=""?"block":"none";
    var sc = document.createElement("script");
    sc.src = "../search/st?wd="+key+"&cb=tips_result";
    document.body.appendChild(sc);
}

const key_history_set = new Set();

function add_search_history(key){

    if(!key_history_set.has(key))
    {   
        key_history_set.add(key);
        
        var hisli = document.createElement("option");
        his.appendChild(hisli);
        
        var hisa = document.createElement("a");
        hisli.appendChild(hisa);
        
        hisa.innerHTML = key;
        hisa.href = "javascript:;";
        hisa.onclick=function(){
            search_key(key, key);
            text.value = key;
        }
    }
}

function tips_result(data){
    
    rtb.innerHTML="";
    
    var rowIdx = 0; 

    data.forEach(function(el){        
        
        var rtr = document.createElement("tr");
        rtb.appendChild(rtr);
        rtb.id = "in-sh-tr1";
 
        var rtdi = document.createElement("td");
        rtdi.innerHTML = (rowIdx++) + 1;
        rtdi.id = "ttdi";
        rtr.appendChild(rtdi);

        var rtdn = document.createElement("td");
        rtdn.id = "ttdn";
        rtr.appendChild(rtdn);
    
        var rtdna = document.createElement("a");
        rtdn.appendChild(rtdna);

        rtdna.href = "javascript:;";
        rtdna.onclick=function(){
            search_key(el.w, el.w);
            text.value = el.w;
        }
        rtdna.innerHTML = el.n;
        
        var rtdntc = document.createElement("td");        
        rtr.appendChild(rtdntc);
        rtdntc.id = "ttdc";
        if ( el.tc != "0")
        {   rtdntc.innerHTML = el.tc +" tags";
        }
        
        var rtdnnc = document.createElement("td");        
        rtr.appendChild(rtdnnc);
        rtdnnc.id = "ttdc";
        if ( el.nc != "0")
        {   rtdnnc.innerHTML = el.nc +" notes";
        }
    })
    
    his_cnt.innerHTML = ""+rowIdx;
}

function out_url_obj(e){
    
    if( e == null )
    {   return "";
    }
  
    var rst = "";
    
    switch(e.t)
    {
    case "t": // TAG
        rst = "<a href=\""+e.l+"\" target=\"_blank\"><i class=\"fa fa-tags fa-fw\"></i>"+e.c+"</a>";
        break;
        
    case "n": // NOTE
        rst = "<a href=\""+e.l+"\" target=\"_blank\">"+e.c+"</a>";
        break;
        
    case "e": // ENTRY
        rst = "<a href=\""+e.l+"\" target=\"_blank\">"+e.c+"</a>";
        break;

    case "d": // DOMAIN
        rst = "<a href=\""+e.l+"\" target=\"_blank\"><i class=\"fa fa-home fa-fw\"></i>"+e.c+"</a>";
        break;
        
    case "j": // JS
        rst = "<a href=\"javascript:;\" onclick=\"" + e.l + "\">"+e.c+"</a>";
        break;    

    case "o": // OTHER
    default:

        if( e.l != null)
        {
            rst = "<a href=\""+e.l+"\" target=\"_blank\">"+e.c+"</a>";
        }
        else
        {
            rst = e.c;
        }
    }

    if( e.n != null)
    {   rst= rst + " " +out_url_obj(e.n)
    }
    
    return rst;
}

function search_result(data){

    rtb.innerHTML="";
    
    var rowIdx = 0;
    var tagCount = 0;
    var nodeCount = 0;
    var docCount = 0;
    var entryCount = 0;
    
    data.rl.forEach(function(el){
        
        if ( el.n.t == "s")     // seperator
        {
            var rtr = document.createElement("tr");
            rtb.appendChild(rtr);
            rtb.id = "in-sh-tr1";
            
            var td1 = document.createElement("td");
            td1.innerHTML = "";
            td1.id = "rtdi";
            rtr.appendChild(td1);
            
            var td2 = document.createElement("td");
            td2.innerHTML = "<HR>"; 
            td2.id = "rtdn";
            rtr.appendChild(td2);
            
    
        }
        else
        {
            var rtr = document.createElement("tr");
            rtb.appendChild(rtr);
            rtb.id = "in-sh-tr1";

            var td1 = document.createElement("td");
            td1.innerHTML = (rowIdx++) + 1;
            td1.id = "rtdi";
            rtr.appendChild(td1);

            var td2 = document.createElement("td");
            td2.innerHTML = out_url_obj(el.n); 
            td2.id = "rtdn";
            rtr.appendChild(td2);
            
            var td3 = document.createElement("td");
            td3.innerHTML = out_url_obj(el.t);
            td3.id = "rtdt";
            rtr.appendChild(td3);
       
            var td4 = document.createElement("td");
            td4.innerHTML = out_url_obj(el.d);
            td4.id = "rtdd";
            rtr.appendChild(td4);
            
            switch(el.n.t)
            {
            case "t": // TAG 
                tagCount++
                break;
                
            case "n": // NOTE
                nodeCount++;
                break;

            case "f": // DOC
                docCount++;
                break;
                
            case "e": // ENTRY
                entryCount++;
                break;
            }
        }

    })
    
    his_cnt.innerHTML = ""+rowIdx+"/"+data.rc.tc
                      +" : tag "+tagCount+"/"+data.rc.tt
                      +", nodes "+nodeCount+"/"+data.rc.tn
                      +", entry "+entryCount+"/"+data.rc.te
                      +", doc "+docCount+"/"+data.rc.td;
    
    if(rowIdx < data.rc.tc)
    {    
        //var hisb = document.createElement("br");
        //his_cnt.appendChild(hisb);

        var hisa = document.createElement("a");
        his_cnt.appendChild(hisa);

        var key = data.k +" -a";
        
        hisa.innerHTML = " All";
        hisa.href = "javascript:;";
        hisa.onclick=function(){
            search_key(key, data.k);
            text.value = data.k;
        }
    }
}