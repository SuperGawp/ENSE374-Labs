var listArray = [];
var listID = 0;

function buildList()
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

function addTask()
{
  list = $( "#list" ).val();
  if (list.length > 0)
  {
    taskList.push([taskID, list, 'unclaimed']);
    taskID = taskID + 1;
    $( "#list" ).val(null);
    buildList();
  }
}

function claimTask(ID)
{
  taskList.forEach(function (list)
  {
    if (list[0] == ID)
    {
      list[2] = 'claimed';
    }
  })
  buildList();
}

function abandonTask(ID)
{
  taskList.forEach(function (list)
  {
    if (list[0] == ID)
    {
      list[2] = 'unclaimed';
    }
  })
  buildList();
}

function finishTask(ID)
{
  taskList.forEach(function (list)
  {
    if (list[0] == ID)
    {
      list[2] = 'finished';
    }
  })
  buildList();
}

function unfinishTask(ID)
{
  taskList.forEach(function (list)
  {
    if (list[0] == ID)
    {
      list[2] = 'claimed';
    }
  })
  buildList();
}

function removeComplete()
{
  taskList.forEach(function (list)
  {
    if (list[2] == 'finished')
    {
      var index = taskList.indexOf(list);
      if (index !== -1)
      {
        taskList.splice(index, 1);
      }
    }
  })
  buildList();
}