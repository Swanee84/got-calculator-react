import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, message, Modal, Radio, Spin } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import ICode, { CodeFormProps } from '@/models/code';
import { useDispatch, useSelector } from 'react-redux';
import { insertCode, updateCode, deleteCode } from '@/store_redux/code/action';
import { RootState } from '@/store_redux/reducer';
import { setLoading } from '@/store_redux/auth/action';

const FormItem = Form.Item;

const CodeForm: React.FC<CodeFormProps> = (props: CodeFormProps) => {
  const { codeList, getCodeGroup } = useSelector((state: RootState) => state.code);
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleSubmit, onCancel, isCreate, values, refreshCodeList, cardType } = props;
  const [codeFieldReadonly, setCodeFieldReadonly] = useState<boolean>(false);
  const [formValues, setFormValues] = useState(values);
  const typeStr = cardType === 'GROUP' ? '그룹' : '상세';
  const actionStr = isCreate ? '등록' : '수정';

  // dispatch를 사용하기 위한 준비
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('group value >> ', values);
    setFormValues(values);
    form.setFieldsValue(values as any);
    return () => {
      form.resetFields();
    };
  }, [values]);

  useEffect(() => {
    setCodeFieldReadonly(!isCreate);
  }, [modalVisible]);

  const okHandle = async () => {
    const fieldsValue = (await form.validateFields()) as ICode;
    if (values?.id) {
      fieldsValue.id = values.id;
    }
    const success = await handleSubmit(isCreate, fieldsValue);
    if (success) {
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
    const deleteConfirm = await deleteConfirmModal(`${typeStr} 코드 삭제 여부`, `${typeStr} 코드를 삭제하시겠습니까?\n이 실행은 되돌릴 수 없습니다.`);
    if (!deleteConfirm) {
      return;
    }
    const codeId = values?.id;
    if (codeId) {
      dispatch(setLoading(true));
      dispatch(deleteCode(codeId));
    }
  };

  const renderFooter = () => {
    return (
      <Spin spinning={isLoading}>
        {isCreate ? null : (
          <Button danger style={{ float: 'left' }} onClick={deleteButtonAction}>
            완전 삭제
          </Button>
        )}
        <Button onClick={onCancel}>취소</Button>
        <Button type="primary" onClick={() => okHandle()}>
          저장
        </Button>
      </Spin>
    );
  };
  return (
    <Modal destroyOnClose title={`${typeStr} 코드 ${actionStr}`} visible={modalVisible} footer={renderFooter()} onOk={okHandle} onCancel={onCancel}>
      <Spin spinning={isLoading}>
        <Form form={form} initialValues={formValues}>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={`상위 코드`} name="parentCode">
            <Input disabled={true} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label={`${typeStr} 코드`}
            name="code"
            rules={[{ required: true, message: `${typeStr} 코드는 필수 입니다.`, min: 2 }]}
          >
            <Input
              placeholder={`${typeStr} 코드 입력`}
              disabled={codeFieldReadonly}
              addonAfter={
                isCreate ? null : (
                  <Checkbox
                    onChange={(e) => {
                      setCodeFieldReadonly(!e.target.checked);
                      if (!e.target.checked) {
                        form.setFieldsValue({
                          code: values?.code,
                        });
                      }
                    }}
                  >
                    변경
                  </Checkbox>
                )
              }
            />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label={`${typeStr} 코드 명`}
            name="codeName"
            rules={[{ required: true, message: `${typeStr} 코드 명은 필수 입니다.`, min: 1 }]}
          >
            <Input placeholder={`${typeStr} 코드 명 입력`} />
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="상태" name="status" rules={[{ required: true, message: '상태는 필수입니다.' }]}>
            <Radio.Group buttonStyle="solid">
              {getCodeGroup(codeList, 'STATUS').map((code: ICode) => (
                <Radio.Button key={code.code} value={code.code}>
                  {code.codeName}
                </Radio.Button>
              ))}
            </Radio.Group>
          </FormItem>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CodeForm;
