import {
  Col,
  Row
} from 'antd';
import { useEffect, useState } from 'react';
import CM01LoginDomain from '../domains/LoginDomain';
import { Login } from './Login';
import './Login.less';
import { Register } from './Register';

export function LoginPage() {

  const [, domain] = CM01LoginDomain();

  useEffect(() => {
    domain.initDomain();
  }, [domain]);

  const [login, setLogin] = useState(true);

  return (
    <div className="full-screen">
      <Login login= {login} domain={domain} setLogin = {setLogin}/>

      <Register login ={login} domain={domain} setLogin = {setLogin}/>
      
      <Row span={24}>
        <Col span={24} className="full-screen bg bg-cover">
          <div
            style={{
              color: 'white',
              fontWeight: '500',
              fontSize: 25,
              width: '100%',
              textAlign: 'center',
              marginTop: 30,
              marginBottom: 70,
            }}
          >
            HỆ THỐNG QUẢN LÝ KHÁCH SẠN
          </div>
          <Row span={24}>
            <Col span={6} />
            <Col span={12}></Col>
            <Col span={6} />
          </Row>
          <div
            style={{
              color: 'white',
              fontWeight: '500',
              fontSize: 25,
              width: '100%',
              textAlign: 'center',
              marginTop: 30,
              marginBottom: 30,
              float: 'bottom',
              position: 'absolute',
              bottom: 0,
            }}
          >
            HỌC PHẦN THAY THẾ TỐT NGHIỆP
          </div>
        </Col>
        {/* --------------------------------------- */}
      </Row>
    </div>
  );
}
