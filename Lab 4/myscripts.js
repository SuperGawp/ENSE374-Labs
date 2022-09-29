function addItem()
{
    var input = document.getElementById("listText");

    if(input != null)
    {
        div = document.createElement("div");
        div.className = "input-group mb-3";
         
        list = document.createElement("input");
        list.Type = "text";
        list.className = "form-control";
        
        document.getElementById("listText").value = "";

        document.getElementById("lists").appendChild(div);
    }
}

function sort()
{
    
}