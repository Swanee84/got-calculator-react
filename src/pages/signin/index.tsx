import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import styles from './index.less';
import logo from '@@/logo.webp';

import { RootState } from '@/store_redux/reducer';
import { signIn, setLoading } from '@/store_redux/auth/action';

import SwaneeFooter from '@/components/SwaneeFooter';
import { RouteConfigComponentProps } from 'react-router-config';
import { RoleConst } from '@/common/constant';
import { useDispatch, useSelector } from 'react-redux';

const SignIn: React.FC<RouteConfigComponentProps> = (props: RouteConfigComponentProps) => {
  const { isAuth, role, isLoading } = useSelector((state: RootState) => state.auth);

  // dispatch를 사용하기 위한 준비
  const dispatch = useDispatch();

  const { route } = props;

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (isAuth) {
      if (role === RoleConst.ADMIN) {
        props.history.push('/admin');
      } else {
        props.history.push('/');
      }
    }
  }, []);

  useEffect(() => {
    dispatch(setLoading(false));

    console.log('디스패치 끝');
    if (isAuth) {
      if (role === RoleConst.ADMIN) {
        props.history.push('/admin');
      } else {
        props.history.push('/');
      }
    }
  }, [isAuth]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>ProForm 테스트용 로그인.</title>
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <img alt="logo" width={300} height={300} className={styles.logo} src={logo} />
            <div className={styles.header}>
              <Link to="/">
                <span className={styles.title}>왕좌의 게임 가문원 관리</span>
              </Link>
            </div>
            <div className={styles.desc}>React + TS + Ant design + Mobx 를 이용한 왕겜 가문원 관리</div>
          </div>

          <div className={styles.main}>
            <ProForm
              submitter={{
                onSubmit: undefined,
                resetButtonProps: false,
                submitButtonProps: {
                  loading: isLoading,
                  size: 'large',
                  style: {
                    width: '100%',
                  },
                },
                searchConfig: {
                  submitText: '로그인하기',
                },
              }}
              onFinish={async (values) => {
                console.log('시작 values >> ', values); // values: {userId: "aaaaaaa", password: "2222222"}
                dispatch(setLoading(true));
                dispatch(signIn(values.userId, values.password));
              }}
            >
              <ProFormText
                name="userId"
                disabled={isLoading}
                fieldProps={{ size: 'large', prefix: <UserOutlined className={styles.prefixIcon} /> }}
                placeholder="아이디"
                rules={[{ required: true, message: '아이디를 입력해주세요' }]}
              />
              <ProFormText.Password
                name="password"
                disabled={isLoading}
                fieldProps={{ size: 'large', prefix: <LockOutlined className={styles.prefixIcon} /> }}
                placeholder="비밀번호"
                rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
              />
            </ProForm>
          </div>
        </div>
        <SwaneeFooter />
      </div>
    </HelmetProvider>
  );
};

export default SignIn;
