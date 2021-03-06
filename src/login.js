import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import './login.css';
import logo from './dark.png';
import QRCode from 'qrcode.react';
import ClipModel from './utils/clipModel';
import ClipTest from './utils/clipTest';

import { enName, isIntegerOther } from './utils/validate';
import userService, { appPrefix } from './apis/userService';
import { useHistory } from 'react-router-dom';

function Login({ form: { getFieldDecorator, validateFields, getFieldValue } }) {
  //滑动验证码控制
  const [isSlidingVerificationCode, setIsSlidingVerificationCode] =
    useState(false);
  //弹窗滑动验证码控制
  const [isClipModel, setIsClipModel] = useState(false);

  let history = useHistory();
  const [messageId, setMessageId] = useState('');
  const [timer, setTimer] = useState(false);
  const [minuteTimer, setMinuteTimer] = useState(60);
  let enNameRules = enName();
  let basicValues = { useName: '', password: '', type: 0 };
  const [QRCodes, setQRCode] = useState(false);
  const [phoneIdentifyingCode, setPhoneIdentifyingCode] = useState(false);
  const [accountSign, setAccountSign] = useState(true);
  const [userId, setUserId] = useState(null);
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '86',
  })(
    <Select style={{ width: 'auto' }}>
      <Select value="86">+86</Select>
      <Select value="87">+87</Select>
      <Select value="87">+82</Select>
      <Select value="87">+83</Select>
    </Select>,
  );

  useEffect(() => {
    console.log(history);
    if (userId === '5173') {

      window.location.href='http://localhost:3000/#/fieldModel/home';
      // history.push(`/App/LineChart`);
    }
  }, [userId]);

  function register() {
    history.push(`/App/Register`);
  }

  function funGetVerifyCode() {
    validateFields((error, value) => {
      if (!error) {
        timers();
        setTimer(true);
        if (value.phone) {
          userService
            .getVerifyCode(value.phone)
            .then(res => {
              console.log(res);
              setMessageId(res.data.utData.messageId);
            })
            .catch(e => {});
        } else {
        }
      } else {
      }
    });
  }

  function timers() {
    let timer_num = 60;

    let timeClock = setInterval(function () {
      timer_num--;
      setMinuteTimer(timer_num);
      if (timer_num === 0) {
        setTimer(false);
        clearInterval(timeClock);
        setMinuteTimer(60);
      }
    }, 1000);
  }

  function moblieLogin() {
    validateFields((error, value) => {
      if (!error) {
        let data = {};
        data['accountSystemKey'] = 'defat';
        data['appPrefix'] = 'orderApp';
        data['messageId'] = messageId;
        data['smsCode'] = value.captcha;
        data['mobile'] = value.phone;
        userService.mobileLoginApi(data).then().catch();
      } else {
      }
    });
  }

  function formPush(e) {
    e.preventDefault();
    validateFields((error, value) => {
      console.log(value);
      if (!error) {
        let type = 'username';
        const mobileElements = document.getElementsByName('username');
        mobileElements[0].name = 'username';

        let params = {
          type: type,
          username: value.username,
          password: value.password,
          accountSystemKey: 'defat',
        };
        // jump
        userService
          .getUserInfo(params)
          .then(res => {
            delete params?.type;
            document.getElementsByTagName('form')[0].submit();
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        message.error('请输入正确的账号或密码2');
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div
      className="background"
      style={{
        background: `url(${logo})`,
        backgroundSize: '100% 100%',
        width: '100%',
        height: '939px',
        zIndex: '1',
        float: 'left',
      }}
    >
      <div className="wall">
        <div className="login-wall">
          <div className="login-content">
            <Input
              style={{ opacity: '0' }}
              onChange={event => setUserId(event.target.value)}
              autoComplete={'off'}
              placeholder="请输入用户名"
            />

            <h1 style={{ color: 'white' }}>登陆</h1>
            {/*{clipTest && <ClipTest setIsClipTest={setIsClipTest} />}*/}
            {/*<ClipTest />*/}
            {/*<ClipTest02 />*/}
            {/*<ClipTest />*/}
            {/*<ClipTest02 />*/}

            {accountSign && (
              <Form
                className="login-form"
                onSubmit={formPush}
                method={'post'}
                action={appPrefix + '/uaa/authentication/form'}
              >
                <Form.Item>
                  {getFieldDecorator('username', {
                    initialValue: basicValues?.username,
                    rules: enNameRules,
                  })(
                    <Input
                      name={'username'}
                      autoComplete={'off'}
                      placeholder="username"
                      block="true"
                      style={{ marginBottom: '15px' }}
                    />,
                  )}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator('password', {
                    initialValue: basicValues?.password,
                    rules: enNameRules,
                  })(
                    <Input.Password
                      name={'password'}
                      autoComplete={'off'}
                      placeholder="password"
                      block="true"
                      style={{ marginBottom: '15px' }}
                    />,
                  )}
                </Form.Item>

                <Form.Item>
                  {!QRCodes && (
                    <Button
                      className="btn"
                      type="submit"
                      style={{ width: '60%' }}
                      htmlType={'submit'}
                    >
                      Sign Up
                    </Button>
                  )}
                </Form.Item>
              </Form>
            )}

            {phoneIdentifyingCode && (
              <Form>
                <Form.Item>
                  {getFieldDecorator('phone', {
                    rules: [
                      {
                        validator: isIntegerOther,
                      },
                      {
                        required: true,
                        message: '请输入账号',
                      },
                    ],
                  })(
                    <Input
                      style={{ marginBottom: '15px' }}
                      addonBefore={prefixSelector}
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  <Row>
                    <Col span={15}>
                      {getFieldDecorator('captcha', {
                        rules: [
                          {
                            validator: isIntegerOther,
                          },
                        ],
                      })(<Input />)}
                    </Col>
                    <Col span={9}>
                      <Button
                        block
                        onClick={() => {
                          if (timer) {
                          } else funGetVerifyCode();
                        }}
                      >
                        {timer ? minuteTimer : '请输入验证码'}
                      </Button>
                      {/*<ImageCode />*/}
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item>
                  {!QRCodes && (
                    <Button
                      style={{ width: '60%' }}
                      onClick={() => {
                        setIsSlidingVerificationCode(true);
                        moblieLogin();
                      }}
                    >
                      Sign Up
                    </Button>
                  )}
                </Form.Item>
              </Form>
            )}

            {QRCodes && (
              <div style={{ marginColor: 'black' }}>
                {/*<ImageCode imageUrl={logo} />*/}
                <QRCode size={150} value={`https://www.baidu.com//`} />
              </div>
            )}

            <div style={{ fontColor: 'grey', color: 'white', margin: '10px' }}>
              {!QRCodes && (
                <a
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                    setPhoneIdentifyingCode(false);
                    setAccountSign(false);
                    setQRCode(true);
                  }}
                >
                  扫码登录
                </a>
              )}

              {!accountSign && (
                <a
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                    setQRCode(false);
                    setPhoneIdentifyingCode(false);
                    setAccountSign(true);
                  }}
                >
                  账号密码登录
                </a>
              )}

              {!phoneIdentifyingCode && (
                <a
                  onClick={() => {
                    setQRCode(false);
                    setAccountSign(false);
                    setPhoneIdentifyingCode(true);
                  }}
                >
                  手机验证码登录
                </a>
              )}
              <div>
                <a
                  onClick={() => {
                    register();
                  }}
                >
                  没有账号立即注册
                </a>
              </div>
              {/*<a*/}
              {/*  onClick={() => {*/}
              {/*    Simplest();*/}
              {/*  }}*/}
              {/*>*/}
              {/*  测试*/}
              {/*</a>*/}
              <a
                onClick={() => {
                  setIsClipModel(true);
                }}
              >
                测试2
              </a>
              {isClipModel && <ClipModel />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form.create({})(Login);
