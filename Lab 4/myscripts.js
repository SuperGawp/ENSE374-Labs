var listArray = [];

function addItem() 
{
    inputVal = document.getElementById("listText").value; 
    listArray.push(inputVal);

    for(i = 0; i < listArray.length; i++)
    {
        document.getElementById("lists").innerHTML = "";
    
        var div = document.createElement('div');
        div.className = "input-group mb-3";
        
        ans = document.createElement("input");
        ans.Type = "text";
        ans.className = "form-control";
        ans.placeholder = inputVal;
    
        div.appendChild(ans);
        document.getElementById("lists").appendChild(div);
    }
  }