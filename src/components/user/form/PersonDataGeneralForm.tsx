import { Show } from '@/components/Show';
import { Genders } from '@/constants/Forms';
import { UserRules } from '@/constants/rules';
import { useFormCreateUserStore } from '@/lib/store/formCreateUser';
import styles from '@/styles/modules/user.module.scss';
import { Col, Form, FormInstance, Input, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  form?: FormInstance;
  gutterRow?: number | [number, number];
  spanCol?: number;
}

export default function PersonDataGeneralForm({
  form,
  gutterRow = 0,
  spanCol = 24,
}: Props) {
  const { t } = useTranslation();
  const { isAdminRoleSelected, roleList, isEdit, fields } =
    useFormCreateUserStore();

  useEffect(() => {
    if (isEdit) {
      form?.setFieldsValue(fields);
    }
  }, [fields, form, isEdit]);

  return (
    <Form
      name="create_login"
      id="create_user_form_antd"
      layout="vertical"
      className={styles.wrapper_form_create_user}
      form={form}
    >
      <Show>
        <Show.When isTrue={!isEdit}>
          <Form.Item
            name="roles"
            label={t('User.fields.user_role.label')}
            rules={UserRules.user.user_role}
            validateStatus="success"
          >
            <Select placeholder={t('User.fields.user_role.placeholder')}>
              {roleList.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Show.When>
      </Show>

      <Show>
        <Show.When isTrue={!isAdminRoleSelected} name="personalData">
          <Row gutter={gutterRow}>
            <Col sm={{ span: spanCol }} xs={{ span: 24 }}>
              <Form.Item
                name="firstName"
                label={t('User.fields.first_name.label')}
                rules={UserRules.user.first_name}
              >
                <Input placeholder={t('User.fields.first_name.label')} />
              </Form.Item>
            </Col>
            <Col sm={{ span: spanCol }} xs={{ span: 24 }}>
              <Form.Item
                name="secondName"
                label={t('User.fields.second_name.label')}
              >
                <Input placeholder={t('User.fields.second_name.placeholder')} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={gutterRow}>
            <Col sm={{ span: spanCol }} xs={{ span: 24 }}>
              <Form.Item
                name="surname"
                label={t('User.fields.first_surname.label')}
                rules={UserRules.user.first_surname}
              >
                <Input
                  placeholder={t('User.fields.first_surname.placeholder')}
                />
              </Form.Item>
            </Col>
            <Col sm={{ span: spanCol }} xs={{ span: 24 }}>
              <Form.Item
                name="secondSurname"
                label={t('User.fields.second_surname.label')}
              >
                <Input
                  placeholder={t('User.fields.second_surname.placeholder')}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={gutterRow}>
            <Col sm={{ span: 24 }} xs={{ span: 24 }}>
              <Form.Item
                name="gender"
                label={t('User.fields.gender.label')}
                rules={UserRules.user.gender}
              >
                <Select
                  placeholder={t('User.fields.gender.placeholder')}
                  options={Genders}
                />
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }} xs={{ span: 24 }}>
              <Form.Item
                name="address"
                label={t('User.fields.address.label')}
                rules={UserRules.user.address}
              >
                <TextArea
                  rows={4}
                  placeholder={t('User.fields.address.placeholder')}
                />
              </Form.Item>
            </Col>
          </Row>
        </Show.When>
      </Show>
    </Form>
  );
}
