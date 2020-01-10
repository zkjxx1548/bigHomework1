/**
options = {
  url: "",
  method: "",
  headers: {}, 
  data: "",
  success: function(result) {},  // 请求成功后调用此方法
  fail: function(error) {}    // 请求失败或出错后调用此方法
}
**/
window.ajax = function (options) {
  var xhr = new this.XMLHttpRequest();
  var method = options.method.toUpperCase();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        //这里要进行容错处理，判断options.success是否是一个函数
        options.success(JSON.parse(xhr.responseText));
      }
      else
        options.fail(status);
    }
  }
  xhr.open(method, options.url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  switch (method) {
    case "GET":
      xhr.send(null);
      break;
    case "POST":
      xhr.send(JSON.stringify(options.data));
      break;
    case "PUT":
      xhr.send(JSON.stringify(options.data));
      break;
    case "DELETE":
      xhr.send(null);
      break;
  }
}