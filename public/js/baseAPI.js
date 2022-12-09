
// 预先处理Ajax参数选项的回调函数
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://127.0.0.1' + options.url;
  
    // 统一为有权限的接口，设置 headers 请求头
    if (options.url.indexOf('/my') !== -1) {
      options.headers = {
        Authorization: localStorage.getItem('token') || '',
      }
    }
  
    // 全局挂载 complete 回调函数
    options.complete = function (res) {
      // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
      console.log(res)
      if (res.responseJSON.status === 1) {
        if (res.responseJSON.msg === '身份认证失败！') {
          // 1. 强制清空 token
          window.localStorage.removeItem('token');
          // 2. 强制跳转到登录页面
          window.location.href = '/api';
        }
        else if(res.responseJSON.msg === '登录失败！' || res.responseJSON.msg === '用户不存在！') {
          window.localStorage.removeItem('token');
          alert('登录失败' + '\n' + '(账户或密码有误！)')
        }
      }
    }
  });
  
