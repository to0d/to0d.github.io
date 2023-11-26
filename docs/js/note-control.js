

function load_control_panel(){
    load_option("opt_access_box", "allow_network_access");
}


function load_option(box_id, option_id){

    var sc = document.createElement("script");
    sc.src = "./control?t=q&o="+option_id+"&action=update_box&id="+box_id;
    document.body.appendChild(sc);

}

function update_option(box_id, option_id){

    var box = document.getElementById("opt_access_box")
    var sc = document.createElement("script");
    
    sc.src = "./control?t=s&o="+option_id+"&v="+box.checked;
    document.body.appendChild(sc);
}

function update_box(data){
    
    var box_id = data.id;
    var box_status = data.s;
    var box_description = data.d;
 
    var box = document.getElementById(""+box_id);
    var box_des = document.getElementById(""+box_id+"_des");
    
    box.checked = (box_status == "true" ? true : false);
    box_des.innerHTML = ""+box_description;
}

function click_box_access()
{
    update_option("opt_access_box", "allow_network_access");    
    load_option("opt_access_box", "allow_network_access");
}

