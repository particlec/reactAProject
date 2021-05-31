import { Button, Col, Form, Input, Row, Select, Checkbox, message } from 'antd';
import React, { useState } from 'react';
import userService from './apis/userService';
import logo from './dark.png';
import {
  enName,
  getVCode,
  isIntegerOther,
  phoneRule,
  vCode,
} from './utils/validate';
import { useHistory } from 'react-router-dom';

function Register({
  form: { getFieldDecorator, validateFields, getFieldValue },
}) {
  let history = useHistory();
  let enNameRules = enName();
  const [timer, setTimer] = useState(false);
  const [minuteTimer, setMinuteTimer] = useState(60);
  const [agreement, setAgreement] = useState(false);
  const [messageId, setMessageId] = useState('');
  const [res, setRes] = useState({});

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

  function login() {
    history.push(`/home/login`);
  }

  function jump() {
    history.push(`/App/Declare`);
  }

  function funGetVerifyCode() {
    let phone = getFieldValue('phone');
    if (phone) {
      userService
        .getVerifyCode(phone)
        .then(res => {
          console.log(res);
          setMessageId(res.data.utData.messageId);
        })
        .catch(e => {
          message.warn(e);
        });
    } else {
    }
  }

  function funRegister() {
    if (!agreement) {
      message.info('请同意优特云用户协议');
    } else {
      validateFields((error, value) => {
        if (!error) {
          if (!timer) {
            message.info('请重新获取验证码');
          } else {
            let params = {};
            params['username'] = value.username;
            params['smsCode'] = value.captcha;
            params['password'] = value.password;
            params['mobile'] = value.phone;
            params['accountSystemKey'] = 'defat';
            params['messageId'] = messageId;
            params['appPrefix'] = 'orderApp';
            console.log(params);
            userService
              .useRegister(params)
              .then(res => {
                setRes(res);
                console.log(res);
                login();
              })
              .catch(err => {
                message.warn(res.data.utMsg);
                console.log(err);
              });
          }
        } else {
        }
      });
    }
  }

  const verifyPassword = (rule, value, callback) => {
    // const { form } = this.props;
    if (!getFieldValue('password')) {
      callback('请先设置密码!');
    } else if (value && value !== getFieldValue('password')) {
      setTimeout(() => {
        callback('两次密码不一致!');
      }, 500);
    } else {
      callback();
    }
  };

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
            <h1 style={{ color: 'white' }}>注册</h1>
            <Form>
              <Form.Item>
                {getFieldDecorator('phone', {
                  rules: [
                    {
                      validator: phoneRule,
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
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('captcha', {
                      rules: [
                        {
                          required: true,
                          message: '请输入短信验证码',
                        },
                        {
                          validator: vCode,
                        },
                      ],
                    })(<Input />)}
                  </Col>
                  <Col span={6}>
                    <Button
                      onClick={() => {
                        funGetVerifyCode();
                        timers();
                        setTimer(true);
                      }}
                    >
                      {timer ? minuteTimer : '请输入验证码'}
                    </Button>
                    {/*<ImageCode />*/}
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('username', {
                  // initialValue: basicValues?.username,
                  rules: enNameRules,
                })(
                  <Input
                    name={'username'}
                    autoComplete={'off'}
                    placeholder="请输入账号"
                    block="true"
                    style={{ marginBottom: '15px' }}
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  // initialValue: basicValues?.password,
                  rules: enNameRules,
                })(
                  <Input.Password
                    name={'password'}
                    autoComplete={'off'}
                    placeholder="请输入密码"
                    block="true"
                    style={{ marginBottom: '15px' }}
                  />,
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('passwordAgain', {
                  // initialValue: basicValues?.password,
                  rules: [{ validator: verifyPassword }],
                })(
                  <Input.Password
                    name={'password'}
                    autoComplete={'off'}
                    placeholder="请再次输入密码"
                    block="true"
                    style={{ marginBottom: '15px' }}
                  />,
                )}
              </Form.Item>

              <Checkbox
                style={{ color: 'white' }}
                onChange={() => {
                  setAgreement(true);
                }}
              >
                我已阅读并同意《<a onClick={jump}>优特云用户协议</a>》
              </Checkbox>

              <Button
                className="btn"
                type="submit"
                style={{ width: '60%' }}
                htmlType={'submit'}
                onClick={() => {
                  console.log(agreement);
                  funRegister();
                  // login();
                }}
              >
                注册
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Form.create({})(Register);
