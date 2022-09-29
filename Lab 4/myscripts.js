function addItem()
{
    var li = document.createElement("li");  
    var input = document.getElementById("listText");
    li.innerHTML = input.value;
    input.value = "";

    document.getElementById("list").appendChild(li);
}