import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { DefaultFooter } from '@ant-design/pro-layout';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './index.less';
import './UserLayout.less';
import SwaneeFooter from '../../components/SwaneeFooter';

const SignIn = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>ProForm 테스트용 로그인.</title>
      </Helmet>

      <div className="container">
        <div className="content">
          <div className="top">
            <img alt="logo" width={300} height={300} className="logo" src="/assets/logo.webp" />
            <div className="header">
              <Link to="/">
                <span className="title">왕좌의 게임 가문원 관리</span>
              </Link>
            </div>
            <div className="desc">React + TS + Ant design + Mobx 를 이용한 왕겜 가문원 관리</div>
          </div>

          <div className="main">
            <ProForm
              submitter={{
                onSubmit: undefined,
                resetButtonProps: {
                  loading: submitting,
                  size: 'large',
                },
                submitButtonProps: {
                  loading: submitting,
                  size: 'large',
                  style: {
                    width: '100%',
                  },
                },
                searchConfig: {
                  submitText: '로그인하기',
                },
              }}
              onFinish={(values) => {
                console.log('values >> ', values);
                // valeu: {userId: "aaaaaaa", password: "2222222"}
                setSubmitting(true);
                setTimeout(() => {
                  setSubmitting(false);
                }, 1200);
                return Promise.resolve();
              }}
            >
              <ProFormText
                name="userId"
                disabled={submitting}
                fieldProps={{ size: 'large', prefix: <UserOutlined className="prefixIcon" /> }}
                placeholder="아이디"
                rules={[{ required: true, message: '아이디를 입력해주세요' }]}
              />
              <ProFormText.Password
                name="password"
                disabled={submitting}
                fieldProps={{ size: 'large', prefix: <LockOutlined className="prefixIcon" /> }}
                placeholder="비밀번호"
                rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
              />
              {/*<Button*/}
              {/*  block*/}
              {/*  type="primary"*/}
              {/*  size="large"*/}
              {/*  loading={submitting}*/}
              {/*  onClick={() => {*/}
              {/*    setSubmitting(true);*/}
              {/*    setTimeout(() => {*/}
              {/*      setSubmitting(false);*/}
              {/*    }, 1200);*/}
              {/*  }}*/}
              {/*>*/}
              {/*  로그인*/}
              {/*</Button>*/}
            </ProForm>
          </div>
        </div>
        <SwaneeFooter />
      </div>
    </HelmetProvider>
  );
};

export default SignIn;
