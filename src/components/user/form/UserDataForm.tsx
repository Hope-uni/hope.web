import styles from '@/styles/modules/user.module.scss';
import { UserOutlined } from '@ant-design/icons';
import { BsCloudDownloadFill } from 'react-icons/bs';
import { Avatar, Flex, Form, Input, Upload } from 'antd';
import { useTranslations } from 'next-intl';

const { Dragger } = Upload;

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function UserDataForm() {
  const t = useTranslations('_.User.fields');
  const t_components = useTranslations('_.components');

  return (
    <Form
      name="create_login"
      id="create_user_form_antd"
      layout="vertical"
      className={styles.wrapper_form_create_user}
    >
      <Form.Item name="image_url" label={t('image_url.label')}>
        <Flex gap={30} className="flex_upload_dragger">
          <Avatar size={80} icon={<UserOutlined />} />
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            style={{
              flex: 1,
            }}
          >
            <Dragger className="uploadDragger" name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <BsCloudDownloadFill size={30} />
              </p>
              <p className="ant-upload-text">
                <strong>{t_components('dragger.title_bold')}</strong>{' '}
                {t_components('dragger.title_regular')}
              </p>
              <p className="ant-upload-hint">
                {t_components('dragger.caption')}
              </p>
            </Dragger>
          </Form.Item>
        </Flex>
      </Form.Item>

      <Form.Item name="username" label={t('username.label')}>
        <Input placeholder={t('username.placeholder')} />
      </Form.Item>

      <Form.Item name="email" label={t('email.label')}>
        <Input placeholder={t('email.placeholder')} />
      </Form.Item>

      <Form.Item name="password" label={t('password.label')}>
        <Input placeholder={t('password.placeholder')} />
      </Form.Item>

      <Form.Item name="confirm_password" label={t('confirma_password.label')}>
        <Input placeholder={t('confirma_password.placeholder')} />
      </Form.Item>
    </Form>
  );
}
