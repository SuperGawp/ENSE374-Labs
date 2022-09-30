function addItem() 
{
    document.getElementById("lists").innerHTML = "";

    var div = document.createElement('div');
    div.className = "input-group mb-3";
    
    ans = document.createElement("input");
    ans.Type = "text";
    ans.className = "form-control";

    inputVal = document.getElementById("listText").value = ""; 
    div.appendChild(inputVal);
    document.getElementById("lists").appendChild(div);
  }