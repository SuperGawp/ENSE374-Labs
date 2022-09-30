function addItem() {
    var div = document.createElement('div');
    div.className = "input-group mb-3";
    
    ans = document.createElement("input");
    ans.Type = "text";
    ans.className = "form-control";

    var inputVal = document.getElementById("listText").value;
    inputVal.innerHTML += inputVal;
    div.appendChild(inputVal);
    document.getElementById("lists").appendChild(div);
  }