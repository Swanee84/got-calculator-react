import React, { useEffect } from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import { RoleConst } from '@/common/constant';
import store from '@/store/index';
const { auth } = store;

const Code: React.FC<RouteConfigComponentProps> = (props: RouteConfigComponentProps) => {
  const { route } = props;

  useEffect(() => {
    console.log('route >> ', route);
    console.log('auth.role >> ', auth.role);

    if (route?.roles.indexOf(auth.role) === -1) {
      console.log('아이코 권한에 맞지 않는 페이지였구나.');
      props.history.push('/');
    }
  }, []);

  return <div>Code</div>;
};

export default Code;
