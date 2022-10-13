var listArray = [];
var listID = 0;

function newTask()
{
    $( "#lists" ).empty();
    taskList.forEach(function (list)
    {
      if (list[2] == 'unclaimed')
      {
      $( "#lists" ).append(
        `<div class="input-group mb-3">
            <input type="text" disabled class="form-control" placeholder="`+ list[1] + `" aria-label="Text input with checkbox">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2" onclick="claimTask('` + list[0] + `')">Claim</button>
        </div>` );
      }
      if (list[2] == 'claimed')
      {
      $( "#lists" ).append(
        `<div class="input-group mb-3">
            <div class="input-group-text">
            <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" onclick="finishTask('` + list[0] + `')">
            </div>
            <input type="text" disabled class="form-control" placeholder="`+ list[1] + `" aria-label="Text input with checkbox">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2" onclick="abandonTask('` + list[0] + `')">Abandon</button>
        </div>` );
      }
      if (list[2] == 'finished')
      {
      $( "#lists" ).append(
        `<div class="input-group mb-3">
            <div class="input-group-text">
            <input class="form-check-input mt-0" checked checkbox type="checkbox" value="" aria-label="Checkbox for following text input" onclick="unfinishTask('` + list[0] + `')">
            </div>
            <input type="text" disabled class="form-control underline" placeholder="`+ list[1] + `" aria-label="Text input with checkbox">
        </div>` );
      }
    })
}

function addItem()
{
  list = $( "#listText" ).val();
  if (list.length > 0)
  {
    listArray.push([listID, list, 'unclaimed']);
    listID = listID + 1;
    $( "#listText" ).val(null);
    newTask();
  }
}

function claim(ID)
{
  listArray.forEach(function (list)
  {
    if (list[0] == ID)
    {
      list[2] = 'claimed';
    }
  })
  newTask();
}

function abandon(ID)
{
  listArray.forEach(function (list)
  {
    if (list[0] == ID)
    {
      list[2] = 'unclaimed';
    }
  })
  newTask();
}

function finish(ID)
{
  listArray.forEach(function (list)
  {
    if (list[0] == ID)
    {
      list[2] = 'finished';
    }
  })
  newTask();
}

function unfinished(ID)
{
  listArray.forEach(function (list)
  {
    if (list[0] == ID)
    {
      list[2] = 'claimed';
    }
  })
  newTask();
}

function remove()
{
  listArray.forEach(function (list)
  {
    if (list[2] == 'finished')
    {
      var temp = listArray.indexOf(list);
      if (temp !== -1)
      {
        listArray.splice(temp, 1);
      }
    }
  })
  newTask();
}