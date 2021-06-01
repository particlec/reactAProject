import instance, { instanceForm } from '../utils/axiosInstance';

export const appPrefix = 'https://oauthdev2.utcook.com';

export default {
  /**
   * 获取当前用户信息
   * @returns {Promise<AxiosResponse<any>>}
   */
  getUserInfo: ({ type, username, password, accountSystemKey }) => {
    return instance.post('/uaa/login/checkPwdLoginParam', {
      type,
      username,
      password,
      accountSystemKey,
    });
  },

  useRegister: ({
    username,
    smsCode,
    password,
    mobile,
    accountSystemKey,
    messageId,
    appPrefix,
  }) => {
    return instance.post('/uaa/login/checkMobileRegisterParam', {
      username,
      smsCode,
      password,
      mobile,
      accountSystemKey,
      messageId,
      appPrefix,
    });
  },

  jump: params => {
    return instanceForm.post('/uaa/authentication/form', params);
  },

  getVerifyCode: mobile => {
    return instance.post('/uaa/public/sendVerifyCode', {
      mobile: mobile,
      appPrefix: 'orderApp',
    });
  },

  mobileLoginApi: ({
    accountSystemKey,
    appPrefix,
    messageId,
    smsCode,
    mobile,
  }) => {
    return instance.post('/uaa/login/checkMobileLoginParam', {
      accountSystemKey,
      appPrefix,
      messageId,
      smsCode,
      mobile,
    });
  },
};
