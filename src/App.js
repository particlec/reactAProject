import logo from './dark.png';
import React, {useState} from "react";
import {Button, Form, Input} from 'antd';
import './App.css';
import MD5 from 'crypto-js/md5';
import QRCode from 'qrcode.react';

function App(
) {
    let loginData = {
        userId:"",
        pass:''
    };
    const [userId,setUserId] = useState('');
    const [pass,setPass] = useState('');
  return (
    <div className="App">
          <div style={{background:`url(${logo})`,backgroundSize:'100% 100%' }} className="login">
              <div style={{border:' 1px solid #c0c0c0',marginLeft:"100px",height:'300px',width:'200px',borderColor:'rgba(151, 151, 151, 0.1)'}}>
                  <Form>

                      <Form.Item label="用户名">
                              <Input
                                  onChange={event => setUserId(MD5(event.target.value))}
                                  autoComplete={'off'}
                                  placeholder="请输入用户名"

                              />,
                      </Form.Item>

                      <Form.Item label="密码">
                              <Input
                                  onChange={event => setPass(MD5(event.target.value))}
                                  autoComplete={'off'}
                                  placeholder="请输入函数中文名"
                              />,
                      </Form.Item>
                  </Form>
                  <Button onClick={()=>{loginData.userId= userId ;  loginData.pass= pass;}} >
                      Sign in
                  </Button>
                  <QRCode
                      size={191}
                      value={`https://www.baidu.com//`}
                  />


              </div>
          </div>
    </div>
  );
}

export default App;
