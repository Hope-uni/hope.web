import styles from '@/styles/modules/user.module.scss';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Flex, Form, Input, Row, Upload } from 'antd';
import { useTranslations } from 'next-intl';
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
  isEdit?: boolean;
  gutterRow?: number | [number, number];
  spanCol?: number;
}

export default function UserDataForm({
  isEdit = false,
  gutterRow = 0,
  spanCol = 24,
}: Props) {
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

      <Row gutter={gutterRow}>
        <Col sm={{ span: spanCol }} xs={{ span: 24 }}>
          <Form.Item name="username" label={t('username.label')}>
            <Input placeholder={t('username.placeholder')} />
          </Form.Item>
        </Col>
        <Col sm={{ span: spanCol }} xs={{ span: 24 }}>
          <Form.Item name="email" label={t('email.label')}>
            <Input placeholder={t('email.placeholder')} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
