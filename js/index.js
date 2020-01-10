(function () {
  const API_ROOT = "http://localhost:3000/projects";
  let $projectTbody = document.getElementById('table-tbody');
    // let $username = document.getElementById('username');
    // let $password = document.getElementById('password');

    // TODO： get user list，when success, run renderUserList
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

    // // TODO:  add user info,when success, run addItem
    // function addItemData(data) {
    //   var options = {
    //     url: API_ROOT,
    //     method: "POST",
    //     headers: {},
    //     data: data,
    //     success: function (res) {
    //       addItem(res);
    //     },
    //     fail: function (fail) {
    //       console.log("fail", fail);
    //     }
    //   }
    //   ajax(options);
    // }

    // // TODO: update user info,when success, run updateItem
    // // 提示：Math.random().toString(36).substring(2) 生成随机的字符串
    // function updateItemData(id) {
    //   var options = {
    //     url: API_ROOT + '/' + id,
    //     method: "PUT",
    //     headers: {},
    //     data: {
    //       "username": Math.random().toString(36).substring(2),
    //       "password": Math.random().toString(36).substring(2)
    //     },
    //     success: function (data) {
    //       updateItem(data);
    //     },
    //     fail: function (fail) {
    //       console.log("fail", fail);
    //     }
    //   }
    //   ajax(options);
    // }

    // // TODO: delete user info,,when success, run  deleteItem
    // function deleteItemData(id) {
    //   var options = {
    //     url: API_ROOT + '/' + id,
    //     method: "DELETE",
    //     headers: {},
    //     success: function (data) {
    //         return deleteItem(data);
    //     },
    //     fail: function (fail) {
    //         console.log("fail", fail);
    //     }
    //   }
    //   ajax(options);
    // }

    // document.getElementById('add-btn').addEventListener('click', function () {
    //     let $username = document.getElementById('username').value;
    //     let $password = document.getElementById('password').value;
    //     let data = {
    //         "username": $username, // Math.random().toString(36).substring(2),
    //         "password": $password
    //     }
    //     addItemData(data);
    // })

    // $userList.addEventListener('click', function (event) {
    //     let id = event.target.getAttribute('data-id') || event.target.parentElement.getAttribute('data-id');

    //     switch (true) {
    //         case event.target.innerHTML === 'X':
    //             deleteItemData(id);
    //             break;
    //         default:
    //             updateItemData(id);
    //     }
    // })

  function renderUserList(data) {
    if (!Array.isArray(data) && !data instanceof Array) {
      return false;
    }

    $projectTbody.innerHTML = data.reduce((acc, cur) => {
      return acc += `<tr id="${cur.id}">
      <td>${cur.name}</td>
      <td>${cur.description}</td>
      <td>${cur.endTime}</td>
      <td>${cur.status}</td>
      <td><input type="button" value="删除" /></td>
      </tr>`;
    }, '');
  }

    // function addItem(item) {
    //     var $item = document.createElement('li');
    //     $item.setAttribute('data-id', item.id);
    //     $item.innerHTML = `<span>用户名：${item.username} - 密码：${item.password}</span><span>X</span>`;
    //     $userList.appendChild($item);
    //     $username.value = '';
    //     $password.value = '';
    // }

    // function updateItem(item) {
    //     var $item = $userList.querySelector(`li[data-id='${item.id}']`);
    //     $item.innerHTML = `<span>用户名：${item.username} - 密码：${item.password}</span><span>X</span>`;
    // }

    // function deleteItem(id) {
    //     var $item = $userList.querySelector(`li[data-id='${id}']`);
    //     $userList.removeChild($item);
    // }

    getListData();

})();