import React, { useEffect, useState } from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import { Col, Row, message } from 'antd';
import CodeListCard from '@/pages/code/CodeListCard';
import ICode from '@/models/code';
import { useSelector } from 'react-redux';
import { RootState } from '@/store_redux/reducer';

const CodeManagement: React.FC<RouteConfigComponentProps> = (props: RouteConfigComponentProps) => {
  const { route } = props;
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(-1);
  const [selectedDetailIndex, setSelectedDetailIndex] = useState<number>(-1);
  const [selectedRootCode, setSelectedRootCode] = useState<ICode | null>(null);

  const role = useSelector((state: RootState) => state.auth.role);
  const rootCodeGroupList = useSelector((state: RootState) => state.code.rootCodeList);

  useEffect(() => {
    console.log('route >> ', route);
    console.log('role >> ', role);

    if (route?.roles.indexOf(role) === -1) {
      message.warning('권한에 맞지 않는 페이지입니다.');
      props.history.push('/');
    }
  }, []);

  return (
    <Row gutter={12}>
      <Col span={12}>
        <CodeListCard
          cardType={'GROUP'}
          list={rootCodeGroupList}
          selectedCodeCallback={(selectedCode) => {
            console.log('ROOT: ', selectedCode);
            setSelectedRootCode(selectedCode);
          }}
          parentCode="ROOT"
        />
      </Col>
      <Col span={12}>
        <CodeListCard
          cardType={'DETAIL'}
          list={selectedRootCode?.codeDetails}
          selectedCodeCallback={(selectedCode) => {
            console.log('detail: ', selectedCode);
          }}
          parentCode={selectedRootCode?.code || ''}
        />
      </Col>
    </Row>
  );
};

export default CodeManagement;
