/*
 * @Author: kusty
 * @Date: 2018-09-02 14:18:50
 * @Last Modified by: lizhaofeng
 * @Last Modified time: 2019-08-08 15:36:37
 */
/* eslint-disable */
import axios from 'axios';
import { Notify, Sweetalert } from 'ezrd';
import React from 'react';
import config from '../config';
import qs from 'qs';
import { JSEncrypt } from 'jsencrypt';
const {
  baseUrl
} = config;

export default class http {
  static async request(method, url, data) {
    const hash = window.location.hash;
    const routeUrl = hash.indexOf('#') === 0 ? hash.substring(1) : hash;
    const queryIndex = url.indexOf('?');
    const apiIndex = url.indexOf('api') < -1? 0: url.indexOf('api') + 4;
    const apiUrl = queryIndex > 0 ? url.substring(apiIndex, queryIndex) : url.substring(apiIndex);
    const userInfo = localStorage.getItem('EZPConsts');
    const userId = userInfo? JSON.parse(userInfo).userId : 0;
    const timeStamp = new Date().getTime();
    const headerMsg = `${routeUrl}&${apiUrl}&${userId}&${timeStamp}`;
    const whiteList = [
      'localhost',
      '127.0.0.1'
    ]
    let publicKey = '-----BEGIN PUBLIC KEY-----';
    publicKey += 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkwG+nEY9xWb/1LjOnJ7e';
    publicKey += 'foun8/cu9cKyvqCUFNQKa1Dut01JfuTOkwH0X+tbSw3JC6gb2tApSXMRRLof3V6M';
    publicKey += 'EHXXivDaNLjRXD8uTkpzoqCmd+2aePuSLUhR20EGITNQcP7nLi+pXa2uAtllwc1I';
    publicKey += 'PX3209F2JqwffJuUzftQTnf4czoBCXuP4rXn5Nw6mhycSEg75Tm90v496xrAo0tB';
    publicKey += 'HlWO7WkW/GCRIIDIvknq7SDu2ZUGfSEP0Y6Gi6RudLl4ZTbJZzHIc/kr/+SfPy6P';
    publicKey += 'koWhUV2uorg1gnXAwEZKTOgqA1QmYP1TIbR1JlbmBdnagbydiLy1VUGFbcprOWDJ';
    publicKey += 'LwIDAQAB';
    publicKey += '-----END PUBLIC KEY-----';
    let enc = new JSEncrypt();
    enc.setPublicKey(publicKey);
    const param = {
      url,
      method,
      data,
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    if (whiteList.includes(location.hostname)) {
      param.headers.v = enc.encrypt(headerMsg)
    }
    if (data) {
      param.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    const res = await axios.request(param);
    if (this.isSuccess(res)) {
      const data = res.data;
      if (data.IsError) {
        let errorMsg = data.ErrorMsg;
        if (data.ErrorMsg === "900") {
          errorMsg = '未登录';
          // location.href = 'https://account.ezrpro.com/?rturl=' + location.href
        }
        if (data.SessionId) {
          errorMsg += "\n编号: " + data.SessionId;
        }
        if (data.OccurTime) {
          errorMsg += "\n时间: " + data.OccurTime;
        }
        if (data.ErrorContent) {
          errorMsg += "\n详情: " + data.ErrorContent;
        }
        // 兼容处理没有ErrorType字段时，使用旧报错
        if (data.ErrorType !== undefined) {
          Sweetalert.alert({
            type: 'apiError',
            apiErrorCode: data.ErrorType,
            closeBtn: true,
            maskClosable: false,
            content: errorMsg
          })
        } else {
          Notify.error(<pre style={{background:"transparent",marginBottom:"0",color:"#fff",wordBreak: "break-all",whiteSpace: "pre-wrap"}}>{errorMsg}</pre>,3000);
        }
        
        throw errorMsg;
      } else {
        let fileName = 'ezr下载文件';
        let fileType = 'xlsx';
        let mimeType = '';
        const matchResult = res['headers']['content-disposition'].match(/name=(\S*);/)
        console.log(matchResult, '文件流');
        if (matchResult) {
          fileName = decodeURI(matchResult[1]);
          const nameArr = fileName.split('.');
          fileType = nameArr[nameArr.length - 1];
        }
        switch (fileType) {
          case 'doc':
            mimeType = 'application/msword';
            break;
          case 'docx':
            mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            break;
          case 'zip':
            mimeType = 'application/zip';
            break;
          case 'xls':
            mimeType = 'application/vnd.ms-excel';
            break;
          default: // 默认xlsx
            mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        }
        let blob = new Blob([res.data], {
          type: `${mimeType};charset=utf-8`
        });
        let src = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.setAttribute('href', src);
        a.setAttribute('download', fileName);
        let evObj = document.createEvent('MouseEvents');
        evObj.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
        a.dispatchEvent(evObj);
      }
    } else {
      throw this.requestException(res);
    }
  }
  static isSuccess(res) {
    const code = res.status;
    if (code !== 200) {
      return false;
    }
    return true;
  }
  /**
   * 异常
   */
  static requestException(res) {
    error.status = res.status;
    return error;
  }
  static formGet(url) { // get的是文件地址，直接下载
    const form = document.createElement('form');
    form.setAttribute('id', 'downloadErrorExcel');
    form.setAttribute('method', 'get');
    form.setAttribute('action', url);
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(form);
    form.submit();
    body.removeChild(form);
  }
  static post(url, data) { // post的走加密，处理文件流
    this.request('POST', url, qs.stringify(data));
  }

  static get(url, data) { // get的走加密，处理文件流
    this.request('get', url, qs.stringify(data));
  }
}