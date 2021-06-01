/*
  数据验证器
  使用到 callback 回调函数
  回调函数：在一个函数中调用另外一个函数就是回调函数
  理解：js为单线程,异步编程,一般要等上一个A函数执行完,才能执行下一个函数B （completion）

  startsWith()函数 a.startsWith('-0')判断a 是不是-0开头的 字符串
 */

// int 类型校验器
import { useCallback } from 'react';

export const isIntegerOther = (rule, value, callback) => {
  if (value) {
    let _value = Number(value);
    if (
      isNaN(_value) ||
      String(value).includes('.') ||
      String(value).includes('+') ||
      String(value).startsWith('-0') ||
      (String(value).startsWith('0') && String(value) !== '0')
      // _value > 2147483648 || _value < -2147483647
    ) {
      callback('请输入 int 类型的值');
    }
  }
  callback();
};

export const enName = (rule, value, callback) => {
  return [
    {
      required: true,
      message: '请输入账号',
    },
    {
      max: 20,
      message: '最长不超过20个字符',
    },
    {
      pattern: /^[A-Za-z0-9_]+$/g,
      message: '仅支持大小写字母、数字和下划线',
    },
    {
      validator: (rule, value, callback) => {
        if (value) {
          let _value = value.replace(/_/g, '');
          if (value && _value.length === 0) {
            callback('不能全为下划线');
          }
          callback();
        } else {
          callback();
        }
      },
    },
  ];
};

export const vCode = (rule, value, callback) => {
  const vCode = /^\d{6}$/;
  if (value && !new RegExp(vCode).test(value)) {
    callback('验证码格式错误');
  } else {
    callback();
  }
};

// export const getVCode = (rule, value, callback, timer) => {
//   if (value && timer) {
//     callback('请先获取验证码');
//   } else {
//     callback();
//   }
// };

export const phoneRule = (rule, value, callback) => {
  const rules = /^1[3-9]\d{9}$/;
  if (value && !new RegExp(rules).test(value)) {
    callback('手机号格式错误');
  } else {
    callback();
  }
};

export const isInteger = (rule, value, callback) => {
  if (value) {
    if (Number(isNaN(value))) {
      callback('请输入int的值');
    }
  }
  // callback()
};
