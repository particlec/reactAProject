import React from 'react';
import { withRouter } from 'react-router-dom';

function ClipBottom({ history }) {
  function jump() {
    history.push(`/App/Declare`);
  }

  return (
    <div
      style={{
        weight: '100%',
        height: '939',
      }}
    >
      <div
        className={'login-bottom1'}
        style={{
          backgroundColor: 'black',
          // zIndex: '9',
          marginBottom: '100px',
          textAlign: 'center',
        }}
      >
        <div>
          <a className={'bottom-span'} onClick={jump}>
            帮助
          </a>
          <a className={'bottom-span'} onClick={jump}>
            隐私
          </a>
          <a className={'bottom-span'} onClick={jump}>
            条款
          </a>
        </div>
        <div>
          <span style={{ color: 'white' }}>
            copyright <span className={'copyright'}>&copy;</span>{' '}
            2021广东优特云科技出品
          </span>
        </div>
      </div>
    </div>
  );
}
export default withRouter(ClipBottom);
