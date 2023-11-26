
function open_file(file){
    var sc = document.createElement("script");
    sc.src = "../ctl/open_file?path="+file;
    document.body.appendChild(sc);
}

function make_learn(file){
    var sc = document.createElement("script");
    sc.src = "./make_learn?path="+file;
    document.body.appendChild(sc);
}

function open_select_file_change(obj){
    var path = obj.value;
    open_file(path);
    obj.options[0].selected =  true;
}