import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Form, Input, List, Modal, Radio, Tooltip } from 'antd';
import { CheckOutlined, EditOutlined, FileAddOutlined, SearchOutlined, WarningOutlined } from '@ant-design/icons';
import { cyan } from '@ant-design/colors';
import ICode, { CodeCardProps } from '@/models/code';
import { RouteConfigComponentProps } from 'react-router-config';
import store from '@/store';
const { auth, code } = store;

const defaultCode = {
  parentCode: 'ROOT',
  code: '',
  codeName: '',
  status: '',
};
const CodeListCard: React.FC<CodeCardProps> = (props: CodeCardProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [searchCode, setSearchCode] = useState<string>('');
  const [formModalVisible, setFormModalVisible] = useState<boolean>(false);
  const [formIsCreate, setFormIsCreate] = useState<boolean>(false);
  const [codeFormValues, setCodeFormValues] = useState<ICode>(defaultCode);

  const { cardType, list } = props;
  const typeStr = cardType === 'GROUP' ? '그룹' : '상세';

  return (
    <>
      <Card
        title={
          <>
            <Tooltip title={`${typeStr} 코드 추가`}>
              <Button
                type="primary"
                shape="circle"
                icon={<FileAddOutlined />}
                onClick={() => {
                  setFormIsCreate(true);
                  setCodeFormValues(defaultCode);
                  setFormModalVisible(true);
                }}
              />
            </Tooltip>
            <span style={{ marginLeft: '8px' }}>{`${typeStr} 코드 목록`}</span>
          </>
        }
        extra={
          <>
            <Input
              size="small"
              placeholder="코드, 혹은 명칭 검색"
              prefix={<SearchOutlined />}
              onChange={(e) => {
                setSearchCode(e.target.value.trim());
              }}
            />
          </>
        }
      >
        <List
          dataSource={filterCode(list, searchCode)}
          renderItem={(item: ICode, index) => {
            const isSelected = selectedIndex === index;
            return (
              <List.Item
                onClick={async () => {
                  console.log('리스트를 클릭했다. ', index);
                }}
                style={{ cursor: 'pointer' }}
                key={item.id}
                actions={[
                  <Tooltip title="코드 편집">
                    <Button
                      type="primary"
                      disabled={!isSelected}
                      shape="circle"
                      icon={isSelected ? <EditOutlined /> : null}
                      onClick={() => {
                        console.log('그룹 편집 버튼 클릭');
                        setFormIsCreate(false);
                        setFormModalVisible(true);
                        console.log('그룹 코드 정보 입력');
                        setCodeFormValues(item);
                      }}
                    />
                  </Tooltip>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar style={{ backgroundColor: cyan[4], verticalAlign: 'middle' }} size="large">
                      {isSelected ? <CheckOutlined /> : index + 1}
                    </Avatar>
                  }
                  title={item.code}
                  description={item.codeName}
                />
                <div>
                  {item.parentCode !== 'ROOT' ? item.parentCode : null}
                  <br />
                  {code.getNameForCode(item.status)}
                </div>
              </List.Item>
            );
          }}
        />
      </Card>
    </>
  );
};

const filterCode = (list: ICode[] | undefined, search: string) => {
  if (!list) {
    return [];
  }
  const searchCode = search.toUpperCase();
  if (!search || search === '') {
    return list;
  }
  return list.filter((item: ICode) => {
    const code = item.code;
    const name = item.codeName;
    return code.indexOf(searchCode) > -1 || name.indexOf(searchCode) > -1;
  });
};

export default CodeListCard;
