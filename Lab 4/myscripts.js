var listArray = [];

function addItem()
{
    input = document.getElementById("listText").value;
    listArray.push(input);
    document.getElementById("listText").value = "";
    list();
}

function list()
{
    document.getElementById("lists").innerHTML = "";
    for(i = 0; i < listArray.length; i++)
    {
        div = document.createElement("div");
        div.className = "input-group mb-3";
            
        ans = document.createElement("input");
        ans.Type = "text";
        ans.className = "form-control";
        ans.placeholder = listArray[i];
        ans.setAttribute("disabled", listArray[i]);

        div.appendChild(ans);
        document.getElementById("lists").appendChild(div);
    }
}

function sort()
{
    
}