import config from '../config';

const { baseUrl } = config;

export const goToPage = (source, target) => {
  if (process.env.NODE_ENV === 'development') window.location.href = `/#/${target}`;
  if (process.env.NODE_ENV !== 'development') window.location.href = window.location.href.replace(source, target);
};

export const setSession = (obj, objName, source, target) => {
  sessionStorage[objName] = obj;
  goToPage(source, target);
};

export const goToNewPage = (source, target) => {
  if (process.env.NODE_ENV === 'development') window.open(`//${window.location.host}${window.location.pathname}#/${target}`);
  if (process.env.NODE_ENV !== 'development') window.open(window.location.href.replace(source, target));
};

export const toNewLine = (content) => {
  const reg = new RegExp("<br>", "g");
  return content ? content.replace(reg, "\n") : '';// 内容在网页上会自动换行体现
};
// 导出Excel
export const outExcel = (obj, reqMethod, url) => {
  const sfForm = document.createElement("form");
  sfForm.method = reqMethod;
  sfForm.action = baseUrl + url;
  for (const i in obj) {
    const tmpInput = document.createElement("input");
    tmpInput.type = "hidden";
    tmpInput.name = i;
    tmpInput.value = obj[i];
    sfForm.append(tmpInput);
  }
  document.body.appendChild(sfForm);
  sfForm.submit();
  sfForm.reset();
};
export const filterMapData = (arr) => {
  arr = arr.slice();
  function toParse(arr) {
    arr.forEach((item) => {
      if (item.child && Array.isArray(item.child)) {
        item.children = item.child;
        toParse(item.child);
      }
      item.id = item.value;
      item.title = item.name;
      delete item.child;
      delete item.name;
      delete item.value;
    });
    return arr;
  }
  return toParse(arr);
};
// 导出任务名称格式化
export const getFormatDownTaskName = (routeName) => {
  const nowDate = new Date();
  let year = nowDate.getFullYear();
  let month = nowDate.getMonth() + 1;
  let days = nowDate.getDate();
  year = year.toString().slice(-2);
  month = month < 10 ? `0${month}` : month;
  days = days < 10 ? `0${days}` : days;
  return `${year}${month}${days}${routeName}`;
};

export const totimestamp = (timestamp, showTime) => {
  if (!timestamp) { return; }
  if (timestamp.indexOf("Date") === -1) { return timestamp; }
  if (timestamp === '/Date(-62135596800000-0000)/') return "";
  if (timestamp === '/Date(-62135596800000)/') return "";
  const timestamps = timestamp.substring(6, 16);
  let str = '--';
  const date = new Date(timestamps * 1000);// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = `${date.getFullYear()}-`;
  const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
  let D = `${date.getDate()} `;
  D = D < 10 ? (`0${D}`) : D;
  let h = date.getHours();
  h = h < 10 ? `0${h}:` : `${h}:`;
  let m = date.getMinutes();
  m = m < 10 ? `0${m}:` : `${m}:`;
  let s = date.getSeconds();
  s = s < 10 ? (`0${s}`) : s;
  str = Y + M + D;
  if (showTime) {
    str = `${str} ${h}${m}${s}`;
  }
  return str.trim();
};

export const totimestamp2 = (timestamp) => {
  if (!timestamp) { return; }
  const timestamps = timestamp.toString().substring(0, 10);
  let str = '--';
  const date = new Date(timestamps * 1000);// 时间戳为10位需*1000，时间戳为13位的话不需乘1000

  const Y = `${date.getFullYear()}-`;
  const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
  let D = `${date.getDate()} `;
  D = D < 10 ? (`0${D}`) : D;
  str = Y + M + D;
  return str;
};

export const formatTime = (time, fmt) => {
  const d = new Date(time);
  const o = {
    "M+": d.getMonth() + 1, // 月份
    "d+": d.getDate(), // 日
    "h+": d.getHours(), // 小时
    "m+": d.getMinutes(), // 分
    "s+": d.getSeconds(), // 秒
    "q+": Math.floor((d.getMonth() + 3) / 3), // 季度
    S: d.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${d.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
  }
  return fmt;
};

export const unifyTime = () => {
  let nowDate = new Date();
  let year = nowDate.getFullYear();
  let month = nowDate.getMonth() + 1;
  let days = nowDate.getDate();
  month = month < 10 ? '0' + month : month;
  days = days < 10 ? '0' + days : days;
  let recipient = '' + year + month + days;
  return recipient
};

export const recentTime = (day) => {
  let nowDate = new Date();
  let recentDay = new Date(nowDate.getTime() - day * 60 * 60 * 1000)
  let year = recentDay.getFullYear();
  let month = recentDay.getMonth() + 1;
  let days = recentDay.getDate();
  month = month < 10 ? '0' + month : month;
  days = days < 10 ? '0' + days : days;
  let recipient =year + '-' + month+ '-' + days;
  return recipient
};

export const toThousands = (val) => {
  if (typeof val === 'string' || typeof val === 'number') {
    return val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  }
  return val;
};

/**
 * 
 * @param { 视频地址 } src
 * @param { 指定视频播放位置 } time 
 * @param { 回调函数，返回对应时间帧的图片文件 { imgBase64, imgFile } cb 
 */
export const getVideoFrameToImage = (src, time, cb) => {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  let video = document.createElement('video');
  video.setAttribute('crossOrigin', 'anonymous');
  video.src = src;
  video.addEventListener('loadeddata', function() {
    this.currentTime = Math.min(time, this.duration);
  })
  video.addEventListener('seeked', () => {
  let width = video.videoWidth;
  let height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(video, 0, 0, width, height);
  canvas.toBlob((blob) => { 
    let imageName = `${Date.now()}.jpg`;
    cb && cb({
        imgBase64: canvas.toDataURL('image/jpeg'),
        imgFile: new File([blob], imageName, {type: 'image/jpeg', lastModified: Date.now()})
    })
  },'image/jpeg', 1);
  })
}
export const getCursorPosition = (elementId) => {
  const el = document.getElementById(elementId);
  let pos = 0;
  if ('selectionStart' in el) {
      pos = el.selectionStart;
  } else if ('selection' in document) {
      el.focus();
      const Sel = document.selection.createRange();
      const SelLength = document.selection.createRange().text.length;
      Sel.moveStart('character', -el.value.length);
      pos = Sel.text.length - SelLength;
  }
  return pos;
}
export const isEmptyButZero = (obj) => {
  if(typeof obj === "undefined" || obj === null || obj === ""){
    return true;
  }else{
    return false;
  }
};
