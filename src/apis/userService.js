import instance, { instanceForm } from '../utils/axiosInstance';

export const appPrefix = 'https://oauthdev2.utcook.com';

export default {
  /**
   * 获取当前用户信息
   * @returns {Promise<AxiosResponse<any>>}
   */
  getUserInfo: ({ params }) => {
    return instance.post('/uaa/login/checkPwdLoginParam', params);
  },

  // jump: () => {
  //   return instance.get('/development-console');
  // },
  // useRegister: ({ params }) => {
  //   return instance.post('/uaa/login/checkMobileRegisterParam', params);
  // },

  useRegister: params => {
    return instance.post('/uaa/login/checkMobileRegisterParam', params);
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

  mobileLoginApi: data => {
    return instance.post('/uaa/login/checkMobileLoginParam', data);
  },
};
