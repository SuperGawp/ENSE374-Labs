function addItem()
{
    var text="";
    var input = document.getElementById("listText") = "";

    for(var i = 0; i < input.length; i++)
    {
        text += input[i].value;
    }

    div = document.createElement("div");
    div.className = "input-group mb-3";
        
    list = document.createElement("input");
    list.Type = "text";
    list.className = "form-control";
    
    document.getElementById("listText").value = "";

    document.getElementById("div").appendChild(list);

    document.getElementById("lists").appendChild(div);
}

function sort()
{
    
}