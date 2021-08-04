import React, { useEffect } from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import { RoleConst } from '@/common/constant';
import store from '@/store_mobx/index';
import { useSelector } from 'react-redux';
import { RootState } from '@/store_redux/reducer';

const Dashboard: React.FC<RouteConfigComponentProps> = (props: RouteConfigComponentProps) => {
  const { route } = props;
  const role = useSelector((state: RootState) => state.auth.role);

  useEffect(() => {
    console.log('route >> ', route);
    console.log('auth.role >> ', role);
    if (route?.roles.indexOf(role) === -1) {
      props.history.push('/admin');
    }
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
