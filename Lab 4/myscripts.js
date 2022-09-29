function addItem()
{
    listText = document.getElementById('listText').value;
    
    div = document.createElement("div");
    div.className = "input-group mb-3";
        
    list = document.createElement("input");
    list.Type = "text";
    list.className = "form-control";

    document.getElementById("div").appendChild(list);
    document.getElementById("lists").innerHTML = "";
    document.getElementById("lists").appendChild(div);
}

function sort()
{
    
}