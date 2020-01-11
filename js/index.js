(function () {
  const API_ROOT = "http://localhost:3000/projects";
  let $projectTbody = document.getElementById('table-tbody');
  let $tableThead = document.getElementById('table-thead');
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
  let itemTrId = 0;
  let dataDbJSON = [];
  let $inputValue = document.getElementById("table-search");
  let displayStyle = "overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;"

  function getListData() {
    var options = {
      url: API_ROOT,
      method: "GET",
      headers: {},
      data: {},
      success: function (res) {
        dataDbJSON = res;
        renderUserList(dataDbJSON);
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
      success: function () {
        return deleteItem(id);
      },
      fail: function (fail) {
        console.log("fail", fail);
      }
    }
    ajax(options);
  }

  document.getElementsByTagName('body')[0].addEventListener('click', function (e) {
    if (e.target.className === "delete-button") {
      displayDeleteDiv("visible", "rgba(0, 0, 0, 0.3)");
      itemTrId = e.target.parentNode.parentNode.id;
    }
    switch (e.target.id) {
      case "delete-yes":
        getDeleteCount(document.getElementById(itemTrId).childNodes[7].innerHTML);
        deleteItemData(itemTrId);
        updateCount();
        noDisplayDeleteDiv("hidden");
        break;
      case "delete-shut":
      case "delete-no":
        noDisplayDeleteDiv("hidden");
        break;
    }

    if (e.target.id === "iconfont-up") {
      activeCount = 0;
      pendingCount = 0;
      closedCount = 0;
      e.target.style.color = "#3080FE";
      e.target.nextElementSibling.style.color = "#aaa";
      renderUserList(sortUpDown(dataDbJSON));
    }

    if (e.target.id === "iconfont-down") {
      activeCount = 0;
      pendingCount = 0;
      closedCount = 0;
      e.target.style.color = "#3080FE";
      e.target.previousElementSibling.style.color = "#aaa";
      renderUserList(sortUpDown(dataDbJSON).reverse());
    }

    if (e.target.id === "iconfont-search") {
      if ($inputValue.value !== "") {
        renderUserList(matching(dataDbJSON, $inputValue.value));
      }else{
        renderUserList(dataDbJSON);
      }
    }
  });

  $main.addEventListener('mouseover', function (e) {
    if (e.target.className === "des") {
      e.target.style = "overflow: hidden;text-overflow: ellipsis;-webkit-line-clamp: 2;-webkit-box-orient: vertical;"
      e.target.addEventListener("mouseleave", function (e) {
        e.target.style = displayStyle;
      });
    }
  });

  document.addEventListener("keypress", function (e) {
    if ($inputValue.value !== "" && e.keyCode === 13) {
      renderUserList(matching(dataDbJSON, $inputValue.value));
    }else{
      renderUserList(dataDbJSON);
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

  function sortUpDown(arr) {
    arr.sort(function (a, b) {
      return Date.parse(new Date(a.endTime)) - Date.parse(new Date(b.endTime))
    });
    return arr;
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
  
  function getDeleteCount(data) {
    switch (data) {
      case "ACTIVE":
        activeCount--;
        break;
      case "PENDING":
        pendingCount--;
        break;
      case "CLOSED":
        closedCount--;
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

  function displayDeleteDiv(visibility, rgba) {
    $delete.style.visibility = visibility;
    $main.parentNode.style.backgroundColor = rgba;
    $tableThead.style.backgroundColor = rgba;
  }

  function noDisplayDeleteDiv(visibility) {
    $delete.style.visibility = visibility;
    $main.parentNode.style.backgroundColor = "transparent";
    $tableThead.style.backgroundColor =  "#ebecf0";
  }

  function matching(arr, inputValue) {
    let newArr = [];
    for (let i = 0; i<arr.length; i++) {
      if (arr[i].name.includes(inputValue)) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }

  getListData();
})();