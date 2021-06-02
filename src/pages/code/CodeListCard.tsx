import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Form, Input, List, message, Modal, Radio, Tooltip } from 'antd';
import { CheckOutlined, EditOutlined, FileAddOutlined, SearchOutlined, WarningOutlined } from '@ant-design/icons';
import { cyan } from '@ant-design/colors';
import ICode, { CodeCardProps, CodeFormProps } from '@/models/code';
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
                  setSelectedIndex(index);
                  if (!item.codeDetails) {
                    item.codeDetails = code.getCodeGroup(item.code);
                  }
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

const FormItem = Form.Item;

const CodeForm: React.FC<CodeFormProps> = (props: CodeFormProps) => {
  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleSubmit, onCancel, isCreate, values, refreshCodeList, cardType } = props;

  const [formValues, setFormValues] = useState(values);

  useEffect(() => {
    console.log('group value >> ', values);
    setFormValues(values);
    form.setFieldsValue(values as any);
    return () => {
      form.resetFields();
    };
  }, [values]);

  const okHandle = async () => {
    const fieldsValue = (await form.validateFields()) as ICode;
    console.log('fieldsValue::', fieldsValue);
    const success = await handleSubmit(isCreate, fieldsValue);
    if (success) {
      refreshCodeList();
      form.resetFields();
    }
  };

  const deleteConfirmModal = (title: string, content: string, okText = '삭제', cancelText = '취소') => {
    return new Promise<boolean>((resolve) => {
      Modal.confirm({
        title,
        icon: <WarningOutlined />,
        content,
        okText,
        onOk: () => {
          resolve(true);
        },
        onCancel: () => {
          resolve(false);
        },
        cancelText,
      });
    });
  };

  const deleteButtonAction = async () => {
    const deleteConfirm = await deleteConfirmModal('그룹 코드 삭제 여부', '그룹 코드를 삭제하시겠습니까?\n이 실행은 되돌릴 수 없습니다.');
    if (!deleteConfirm) {
      return;
    }
    const codeStr: string = values?.code ?? '';
    if (codeStr) {
      message.success('삭제되었습니다.');
      refreshCodeList();
      onCancel();
    }
  };

  const renderFooter = () => {
    return (
      <>
        {isCreate ? null : (
          <Button danger style={{ float: 'left' }} onClick={deleteButtonAction}>
            삭제
          </Button>
        )}
        <Button onClick={onCancel}>취소</Button>
        <Button type="primary" onClick={() => okHandle()}>
          저장
        </Button>
      </>
    );
  };
  return (
    <Modal
      destroyOnClose
      title={`${cardType === 'GROUP' ? '그룹' : '상세'} 코드 ${isCreate ? '등록' : '수정'}`}
      visible={modalVisible}
      footer={renderFooter()}
      onOk={okHandle}
      onCancel={onCancel}
    >
      <Form form={form} initialValues={formValues}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="그룹 코드"
          name="groupCode"
          rules={[{ required: true, message: '그룹 코드는 필수 입니다.', min: 2 }]}
        >
          <Input placeholder="그룹 코드 입력" readOnly={!isCreate} />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="그룹 코드 명"
          name="groupCodeName"
          rules={[{ required: true, message: '그룹 코드 명은 필수 입니다.', min: 1 }]}
        >
          <Input placeholder="그룹 코드 명 입력" />
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="상태" name="status">
          <Radio.Group buttonStyle="solid">
            {code.getCodeGroup('STATUS').map((code: ICode) => (
              <Radio.Button key={code.code} value={code.code}>
                {code.codeName}
              </Radio.Button>
            ))}
          </Radio.Group>
        </FormItem>
      </Form>
    </Modal>
  );
};
