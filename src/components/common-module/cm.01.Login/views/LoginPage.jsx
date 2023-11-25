import { useEffect, useState } from 'react';
import CM01LoginDomain from '../domains/LoginDomain';
import { Footer } from './Footer';
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
      
      <Footer/>
    </div>
  );
}
