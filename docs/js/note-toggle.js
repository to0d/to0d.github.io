function toggleView(element1){
    element1 = document.getElementById(element1);             
    if (element1.style.display == 'block' || element1.style.display == '')
    {
        element1.style.display = 'none';
    } else {
        element1.style.display = 'block';	
    }	
}

function openUniView(element1){
    element1 = document.getElementById(element1);             
    element1.style.display = 'block';
}