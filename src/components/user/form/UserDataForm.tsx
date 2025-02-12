import { Show } from '@/components/Show';
import { UserRules } from '@/constants/rules';
import { useFormCreateUserStore } from '@/lib/store/formCreateUser';
import styles from '@/styles/modules/user.module.scss';
import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Col,
  Flex,
  Form,
  FormInstance,
  Input,
  Row,
  Upload,
} from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsCloudDownloadFill } from 'react-icons/bs';

const { Dragger } = Upload;

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface Props {
  form?: FormInstance;
  gutterRow?: number | [number, number];
  spanCol?: number;
}

export default function UserDataForm({
  form,
  gutterRow = 0,
  spanCol = 24,
}: Props) {
  const { t } = useTranslation();
  const { isAdminRoleSelected, isEdit, fields } = useFormCreateUserStore();

  useEffect(() => {
    if (isEdit) {
      form?.setFieldsValue(fields);
    }
  }, [fields, form, isEdit]);

  return (
    <Form
      name="create_login_user"
      id="create_user_form_antd"
      layout="vertical"
      className={styles.wrapper_form_create_user}
      form={form}
    >
      <Row gutter={gutterRow}>
        <Col sm={{ span: spanCol }} xs={{ span: 24 }}>
          <Form.Item
            name="username"
            label={t('User.fields.username.label')}
            rules={UserRules.user.username}
          >
            <Input placeholder={t('User.fields.username.placeholder')} />
          </Form.Item>
        </Col>
        <Col sm={{ span: spanCol }} xs={{ span: 24 }}>
          <Form.Item
            name="email"
            label={t('User.fields.email.label')}
            rules={UserRules.user.email}
          >
            <Input placeholder={t('User.fields.email.placeholder')} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
