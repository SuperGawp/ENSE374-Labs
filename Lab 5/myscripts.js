var listArray = [];

function newDiv() 
{
    document.getElementById("lists").innerHTML = "";
    for(i = 0; i < listArray.length; i++)
    {
        var div = document.createElement('div');
        div.className = "input-group mb-3";
        
        ans = document.createElement("input");
        ans.Type = "text";
        ans.className = "form-control";
        ans.placeholder = listArray[i];
        ans.setAttribute("disabled",inputVal);

        button = document.createElement("button");
        button.Type = "button";
        button.className = "btn btn-outline-secondary";
        button.innerHTML = "Claim";

        checkDiv = document.createElement("div");
        checkDiv.className = "input-group-text";

        checkBox = document.createElement("input");
        checkBox.Type = "checkbox";
        checkBox.className = "form-check-input mt-0";

        checkDiv.appendChild(checkBox);
        
        div.appendChild(checkDiv);
        div.appendChild(ans);
        div.appendChild(button);
        
        document.getElementById("lists").appendChild(div);
        document.getElementById("listText").value = "";
    }
}

function addItem()
{
    inputVal = document.getElementById("listText").value; 
    listArray.push(inputVal);
    newDiv();
}

function sortList()
{
    listArray.sort();
    newDiv();
}