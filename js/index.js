(function () {
  const API_ROOT = "http://localhost:3000/projects";
  let $projectTbody = document.getElementById('table-tbody');
  let $delete = document.getElementById('delete');
  let $main = document.getElementById("main");
  let $countAll = document.getElementById("count-all");
  let $countActive = document.getElementById("count-active");
  let $countPending = document.getElementById("count-pending");
  let $countClosed = document.getElementById("count-closed");
  let allCount = 0;
  let activeCount = 0;
  let pendingCount = 0;
  let closedCount = 0;
  let displayStyle = "overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;"

  function getListData() {
    var options = {
      url: API_ROOT,
      method: "GET",
      headers: {},
      data: {},
      success: function (res) {
        renderUserList(res);
      },
      fail: function (fail) {
        console.log("fail", fail);
      }
    }
    ajax(options);
  }

  function deleteItemData(id) {
    var options = {
      url: API_ROOT + '/' + id,
      method: "DELETE",
      headers: {},
      success: function (data) {
        return deleteItem(data);
      },
      fail: function (fail) {
        console.log("fail", fail);
      }
    }
    ajax(options);
  }

  document.getElementById('main').addEventListener('click', function (e) {
    if (e.target.className === "delete-button") {
      $delete.style.visibility = "visible";
      $main.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      var itemTrId = e.target.parentNode.parentNode.id;
      $delete.addEventListener('click', function (e) {
        if (e.target.id === "delete-yes") {
          $delete.style.visibility = "hidden";
          $main.style.backgroundColor = "transparent";
          deleteItemData(parseInt(itemTrId));
        }else if (e.target.id === "delete-shut" || e.target.id === "delete-no") {
          $delete.style.visibility = "hidden";
          $main.style.backgroundColor = "transparent";
        }
      });
    }
  });

  document.getElementById('main').addEventListener('mouseover', function (e) {
    if (e.target.className === "des") {
      e.target.style = "overflow: hidden;text-overflow: ellipsis;-webkit-line-clamp: 2;-webkit-box-orient: vertical;"
      e.target.addEventListener("mouseleave", function (e) {
        e.target.style = displayStyle;
      });
    }
  });
  

    

  function renderUserList(data) {
    if (!Array.isArray(data) && !data instanceof Array) {
      return false;
    }
    let paddingStyle = "padding: 10px";

    $projectTbody.innerHTML = data.reduce((acc, cur) => {
      getCount(cur);
      acc += `<tr id="${cur.id}" style="border-bottom: 1px solid gray">
      <td style="${paddingStyle}">${cur.name}</td>
      <td style="${paddingStyle}"><span class="des" style="${displayStyle}">${cur.description}</span></td>
      <td style="${paddingStyle}">${cur.endTime}</td>
      <td style="color: ${getStatusColor(cur)}; ${paddingStyle}">${cur.status}</td>
      <td style="${paddingStyle}"><input class="delete-button" type="button" value="删除" 
      style="background-color: #ee706d;
      padding: 5px;
      border: 0;
      border-radius: 3px;
      color: white" /></td>
      </tr>`;
      return acc;
    }, '');
    updateCount();
  }

  

  function getCount(data) {
    switch (data.status) {
      case "ACTIVE":
        activeCount++;
        break;
      case "PENDING":
        pendingCount++;
        break;
      case "CLOSED":
        closedCount++;
    }
  }

  function getStatusColor(data) {
    switch (data.status) {
      case "ACTIVE":
        return "#666666";
      case "PENDING":
        return "#ee706d";
      case "CLOSED":
        return "#f7da47";
    }
  }

  function updateCount() {
    allCount = activeCount + pendingCount + closedCount;
    $countAll.innerHTML = allCount;
    $countActive.innerHTML = activeCount;
    $countActive.nextElementSibling.innerHTML = Math.floor((activeCount / allCount)*100) + '%';
    $countPending.innerHTML = pendingCount;
    $countPending.nextElementSibling.innerHTML = Math.floor((pendingCount / allCount)*100) + '%';
    $countClosed.innerHTML = closedCount;
    $countClosed.nextElementSibling.innerHTML = Math.floor((closedCount / allCount)*100) + '%';
  }

  function deleteItem(id) {
    var $item = document.getElementById(id);
    $projectTbody.removeChild($item);
  }

  getListData();
})();