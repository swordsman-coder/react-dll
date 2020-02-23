/*
 * @Author: kusty
 * @Date: 2018-09-02 14:18:50
 * @Last Modified by: lizhaofeng
 * @Last Modified time: 2019-08-08 15:36:37
 */
import axios from 'axios';
import { Notify, Sweetalert } from 'ezrd';
import React from 'react';
import { JSEncrypt } from 'jsencrypt';

const style = {
  background: "transparent", marginBottom: "0", color: "#fff", wordBreak: "break-all", whiteSpace: "pre-wrap"
};
export default class http {
  static async request(method, url, data, loading = true) {
    const { hash } = window.location;
    const routeUrl = hash.indexOf('#') === 0 ? hash.substring(1) : hash;
    const queryIndex = url.indexOf('?');
    const apiIndex = url.indexOf('api') < -1 ? 0 : url.indexOf('api') + 4;
    const apiUrl = queryIndex > 0 ? url.substring(apiIndex, queryIndex) : url.substring(apiIndex);
    const userInfo = localStorage.getItem('EZPConsts');
    const userId = userInfo ? JSON.parse(userInfo).userId : 0;
    const timeStamp = new Date().getTime();
    const headerMsg = `${routeUrl}&${apiUrl}&${userId}&${timeStamp}`;
    const whiteList = [
      'localhost',
      '127.0.0.1'
    ];

    let publicKey = '-----BEGIN PUBLIC KEY-----';
    publicKey += 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkwG+nEY9xWb/1LjOnJ7e';
    publicKey += 'foun8/cu9cKyvqCUFNQKa1Dut01JfuTOkwH0X+tbSw3JC6gb2tApSXMRRLof3V6M';
    publicKey += 'EHXXivDaNLjRXD8uTkpzoqCmd+2aePuSLUhR20EGITNQcP7nLi+pXa2uAtllwc1I';
    publicKey += 'PX3209F2JqwffJuUzftQTnf4czoBCXuP4rXn5Nw6mhycSEg75Tm90v496xrAo0tB';
    publicKey += 'HlWO7WkW/GCRIIDIvknq7SDu2ZUGfSEP0Y6Gi6RudLl4ZTbJZzHIc/kr/+SfPy6P';
    publicKey += 'koWhUV2uorg1gnXAwEZKTOgqA1QmYP1TIbR1JlbmBdnagbydiLy1VUGFbcprOWDJ';
    publicKey += 'LwIDAQAB';
    publicKey += '-----END PUBLIC KEY-----';

    const enc = new JSEncrypt();
    enc.setPublicKey(publicKey);
    const param = {
      url,
      method,
      data
    };
    if (whiteList.includes(window.location.hostname)) {
      param.headers = { v: enc.encrypt(headerMsg) };
    }

    const res = await axios.request(param);

    if (this.isSuccess(res)) {
      const { data } = res;
      if (data.IsError) {
        let errorMsg = data.ErrorMsg;
        if (data.ErrorMsg === "900") {
          errorMsg = '未登录';
          // location.href = 'https://account.ezrpro.com/?rturl=' + location.href
        }
        if (data.SessionId) {
          errorMsg += `\n编号: ${data.SessionId}`;
        }
        if (data.OccurTime) {
          errorMsg += `\n时间: ${data.OccurTime}`;
        }
        if (data.ErrorContent) {
          errorMsg += `\n详情: ${data.ErrorContent}`;
        }
        // 兼容处理没有ErrorType字段时，使用旧报错
        if (data.ErrorType !== undefined) {
          Sweetalert.alert({
            type: 'apiError',
            apiErrorCode: data.ErrorType,
            closeBtn: true,
            maskClosable: false,
            content: data.ErrorType == 2 ? data.ErrorContent : errorMsg
          });
        } else {
          Notify.error(<pre style={style}>{errorMsg}</pre>, 3000);
        }

        throw errorMsg;
      } else {
        return data;
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

  static get(url, data = {}, loading = true) {
    return this.request('GET', url, data, loading);
  }

  static put(url, data, loading = true) {
    return this.request('PUT', url, data, loading);
  }

  static post(url, data, loading = true) {
    return this.request('POST', url, data, loading);
  }

  static delete(url, data, loading = true) {
    return this.request('DELETE', url, data, loading);
  }
}
