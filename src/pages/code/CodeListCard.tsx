import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Input, List, Select, Tooltip, Spin } from 'antd';
import { CheckOutlined, EditOutlined, FileAddOutlined, SearchOutlined } from '@ant-design/icons';
import { cyan, green } from '@ant-design/colors';
import ICode, { CodeCardProps } from '@/models/code';
import CodeForm from '@/pages/code/CodeForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store_redux/reducer';
import { insertCode, updateCode } from '@/store_redux/code/action';
import { setLoading } from '@/store_redux/auth/action';

const { Option } = Select;

const CodeListCard: React.FC<CodeCardProps> = (props: CodeCardProps) => {
  const nameForCode = useSelector((state: RootState) => state.code.nameForCode);

  // dispatch를 사용하기 위한 준비
  const dispatch = useDispatch();

  const { cardType, list, selectedCodeCallback, parentCode } = props;
  const typeStr = cardType === 'GROUP' ? '그룹' : '상세';
  const color = cardType === 'GROUP' ? cyan : green;
  const defaultCode = {
    id: 0,
    parentCode: parentCode,
    code: '',
    codeName: '',
    status: '',
  };

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [searchCode, setSearchCode] = useState<string>('');
  const [formModalVisible, setFormModalVisible] = useState<boolean>(false);
  const [formIsCreate, setFormIsCreate] = useState<boolean>(false);
  const [codeFormValues, setCodeFormValues] = useState<ICode>(defaultCode);

  useEffect(() => {
    console.log(typeStr + ' list 가 변경되었다?');
    if (list && selectedIndex >= 0) {
      const item = list[selectedIndex];
      selectedCodeCallback(item);
    }
    if (formModalVisible) {
      setSelectedIndex(-1);
      setFormModalVisible(false);
    }
  }, [list]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [parentCode]);

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
                  setSelectedIndex(index);
                  selectedCodeCallback(item);
                }}
                style={{ cursor: 'pointer' }}
                key={item.id}
                actions={[
                  <Tooltip title="코드 편집" key="action_button">
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
                    <Avatar style={{ backgroundColor: color[4], verticalAlign: 'middle' }} size="large">
                      {isSelected ? <CheckOutlined /> : index + 1}
                    </Avatar>
                  }
                  title={item.code}
                  description={item.codeName}
                />
                <div>{nameForCode[item.status] ?? 'unknown'}</div>
              </List.Item>
            );
          }}
        />
      </Card>
      <CodeForm
        modalVisible={formModalVisible}
        onSubmit={async (isCreate: boolean, value: ICode): Promise<boolean> => {
          console.log('onSubmit >> ', value);
          dispatch(setLoading(true));
          if (isCreate) {
            dispatch(insertCode(value));
          } else if (selectedIndex > -1 && list) {
            dispatch(updateCode(value));
          }
          setFormModalVisible(false);
          setSelectedIndex(-1);
          return true;
        }}
        refreshCodeList={() => {
          console.log('refreshCodeList()');
        }}
        onCancel={() => setFormModalVisible(false)}
        isCreate={formIsCreate}
        values={codeFormValues}
        cardType={cardType}
      />
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
