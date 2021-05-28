import React, { useEffect } from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import { RoleConst } from '@/common/constant';
import store from '@/store/index';
const { auth } = store;

const Dashboard: React.FC<RouteConfigComponentProps> = (props: RouteConfigComponentProps) => {
  const { route } = props;

  useEffect(() => {
    console.log('route >> ', route);
    console.log('auth.role >> ', auth.role);
    if (route?.roles.indexOf(auth.role) === -1) {
      props.history.push('/admin');
    }
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
