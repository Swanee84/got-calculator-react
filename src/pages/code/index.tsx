import React, { useEffect, useState } from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import store from '@/store/index';
import { Col, Row } from 'antd';
import CodeListCard from '@/pages/code/CodeListCard';
import ICode from '@/models/code';
const { auth, code } = store;

const CodeManagement: React.FC<RouteConfigComponentProps> = (props: RouteConfigComponentProps) => {
  const { route } = props;
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(-1);
  const [selectedDetailIndex, setSelectedDetailIndex] = useState<number>(-1);
  const [selectedGroupCode, setSelectedGroupCode] = useState<ICode | null>(null);

  useEffect(() => {
    console.log('route >> ', route);
    console.log('auth.role >> ', auth.role);

    if (route?.roles.indexOf(auth.role) === -1) {
      console.log('아이코 권한에 맞지 않는 페이지였구나.');
      props.history.push('/');
    }
  }, []);

  return (
    <Row gutter={12}>
      <Col span={12}>
        <CodeListCard cardType={'GROUP'} list={code.rootCodeGroupList} />
      </Col>
      <Col span={12}>
        <CodeListCard cardType={'DETAIL'} list={selectedGroupCode?.codeDetails} />
      </Col>
    </Row>
  );
};

export default CodeManagement;
