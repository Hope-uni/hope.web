import FormItemDragger from '@/components/common/Inputs/FormItemDragger';
import { IMAGE_PLACEHOLDER } from '@/constants/OptimizedImage';
import { UserRules } from '@/constants/rules';
import { useFormCreateUserStore } from '@/lib/store/forms/formCreateUser';
import styles from '@/styles/modules/user.module.scss';
import { Col, Form, FormInstance, Input, Row, Upload } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { isEdit, fields } = useFormCreateUserStore();

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
      <Form.Item>
        <FormItemDragger
          label={t('User.fields.image_url.label')}
          name="imageFile"
          placeholderImage={IMAGE_PLACEHOLDER.USER}
          previewPlacement="outside"
          imgCropProps={{
            cropShape: 'round',
          }}
          shape="circle"
          initialImage={form?.getFieldValue('imageUrl')}
        />
      </Form.Item>

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
