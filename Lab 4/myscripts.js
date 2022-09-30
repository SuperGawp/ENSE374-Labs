function addItem() 
{
    document.getElementById("lists").innerHTML = "";
    inputVal = document.getElementById("listText").value; 

    var div = document.createElement('div');
    div.className = "input-group mb-3";
    
    ans = document.createElement("input");
    ans.Type = "text";
    ans.className = "form-control";
    ans.placeholder = inputVal;

    div.appendChild(ans);
    document.getElementById("lists").appendChild(div);
  }