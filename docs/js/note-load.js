
var note_domain = null;
var note_tag = null;
var note_status_index = 0;
var note_load_status_id = null;
var note_load_output_id = null;
var url_type = null;
var load_request_count = 0;
var load_answer_count = 0;
const request_id_set = new Set();

var load_begin_time = new Date().getTime();

function set_domain_name(domain){
    note_domain = domain;
}

function set_tag_name(tag){
    note_tag = tag;
}

function set_load_output_id(id){
    note_load_output_id = id;
}

function set_load_status_id(id){
    note_load_status_id = id;
}

function set_url_type(type){
    url_type = type;
}

function set_content(id, data){
    
    if(request_id_set.has(id))
    {   load_answer_count = load_answer_count + 1;
        update_load_status();
    }

    var element  = document.getElementById(id);
    element.innerHTML = data.data  
    element.type="text/html";    
}

function update_load_status(){
    
    if(note_load_status_id!=null)
    {
        var element  = document.getElementById(note_load_status_id);
        var load_time = new Date().getTime() - load_begin_time;
        var status_val = "" + load_answer_count + "/" + load_request_count+" " + load_time;
        
        if( load_answer_count < load_request_count )
        {   status_val = "<font color=\"red\">" + status_val + "</font>";
        }
        
        element.innerHTML = status_val;  
        element.type="text/html"; 
    }
}

function load_rulp(rulp_expr, format_style, result_id, size_id){
    
    var cmd = "../page/load?id=\""+result_id+"\"&view=\""+format_style+"\"&cb=\"set_content\"&dm=\""+note_domain+"\"&tag=\""+note_tag;
    
    if( size_id != null )
    {   cmd = cmd + "\"&si=\""+size_id;
    }
    
    if( note_load_output_id != null )
    {
        var status_li_id  = note_load_output_id + "_" + note_status_index;
        note_status_index = note_status_index + 1;

        var se1 = document.createElement(note_load_output_id+"_li");
        se1.innerHTML = "<li>Loading " + rulp_expr + " : <b id=\""+status_li_id+"\"></b></li>"
        se1.type="text/html";

        var element  = document.getElementById(note_load_output_id);
        element.appendChild(se1);
        
        cmd = cmd + "\"&ti=\""+status_li_id;
    }
    
    if( url_type !=null )
    {   cmd = cmd + "\"&ut=\""+url_type;        
    }
    
    cmd = cmd + "\"&rulp=" + rulp_expr;
    
    var sc = document.createElement("script");    
    sc.src = cmd;
 
    load_request_count = load_request_count + 1;    
    request_id_set.add(result_id);
    update_load_status();
    document.body.appendChild(sc);
}