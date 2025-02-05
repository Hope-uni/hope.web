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
import { useTranslation } from 'react-i18next';
import { BsCloudDownloadFill } from 'react-icons/bs';

const { Dragger } = Upload;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface Props {
  form?: FormInstance;
  isEdit?: boolean;
  gutterRow?: number | [number, number];
  spanCol?: number;
}

export default function UserDataForm({
  form,
  isEdit = false,
  gutterRow = 0,
  spanCol = 24,
}: Props) {
  const { t } = useTranslation();
  const { isAdminRoleSelected } = useFormCreateUserStore();

  return (
    <Form
      name="create_login"
      id="create_user_form_antd"
      layout="vertical"
      className={styles.wrapper_form_create_user}
      form={form}
    >
      <Show>
        <Show.When isTrue={!isAdminRoleSelected}>
          <Form.Item label={t('User.fields.image_url.label')}>
            <Flex gap={30} className="flex_upload_dragger">
              <Avatar size={80} icon={<UserOutlined />} />
              <Form.Item
                name="image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                style={{
                  flex: 1,
                }}
              >
                <Dragger
                  className="uploadDragger"
                  name="files"
                  action="/upload.do"
                >
                  <p className="ant-upload-drag-icon">
                    <BsCloudDownloadFill size={30} />
                  </p>
                  <p className="ant-upload-text">
                    <strong>{t('components.dragger.title_bold')}</strong>{' '}
                    {t('components.dragger.title_regular')}
                  </p>
                  <p className="ant-upload-hint">
                    {t('components.dragger.caption')}
                  </p>
                </Dragger>
              </Form.Item>
            </Flex>
          </Form.Item>
        </Show.When>
      </Show>

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
