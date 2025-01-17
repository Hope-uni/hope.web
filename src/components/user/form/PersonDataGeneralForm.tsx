import { Show } from '@/components/Show';
import { Rules } from '@/constants/rules';
import styles from '@/styles/modules/user.module.scss';
import { Col, Form, Input, Radio, Row } from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  setCurrentRole: Dispatch<React.SetStateAction<string>>;
  isEdit?: boolean;
  gutterRow?: number | [number, number];
  spanCol?: number;
}

export default function PersonDataGeneralForm({
  setCurrentRole,
  isEdit = false,
  gutterRow = 0,
  spanCol = 24,
}: Props) {
  const { t } = useTranslation();

  const Roles = [
    {
      label: t('Role.catalog.patient'),
      value: 'patient',
    },
    {
      label: t('Role.catalog.tutor'),
      value: 'tutor',
    },
    {
      label: t('Role.catalog.therapist'),
      value: 'therapist',
    },
    {
      label: t('Role.catalog.admin'),
      value: 'admin',
    },
  ];

  const handleChangeRole = (e: RadioChangeEvent) => {
    setCurrentRole(e.target.value);
  };

  return (
    <Form
      name="create_login"
      id="create_user_form_antd"
      layout="vertical"
      className={styles.wrapper_form_create_user}
    >
      <Show>
        <Show.When isTrue={!isEdit}>
          <Form.Item
            name="role"
            label={t('User.fields.user_role.label')}
            rules={Rules.user.user_role}
          >
            <Radio.Group onChange={handleChangeRole}>
              {Roles.map((item) => (
                <Radio.Button key={item.value} value={item.value}>
                  {item.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
        </Show.When>
      </Show>

      <Row gutter={gutterRow}>
        <Col sm={{ span: spanCol }} xs={{ span: 24 }}>
          <Form.Item
            name="first_name"
            label={t('User.fields.first_name.label')}
            rules={Rules.user.first_name}
          >
            <Input placeholder={t('User.fields.first_name.label')} />
          </Form.Item>
        </Col>
        <Col sm={{ span: spanCol }} xs={{ span: 24 }}>
          <Form.Item
            name="second_name"
            label={t('User.fields.second_name.label')}
          >
            <Input placeholder={t('User.fields.second_name.placeholder')} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={gutterRow}>
        <Col sm={{ span: spanCol }} xs={{ span: 24 }}>
          <Form.Item
            name="first_surname"
            label={t('User.fields.first_surname.label')}
            rules={Rules.user.first_surname}
          >
            <Input placeholder={t('User.fields.first_surname.placeholder')} />
          </Form.Item>
        </Col>
        <Col sm={{ span: spanCol }} xs={{ span: 24 }}>
          <Form.Item
            name="second_surname"
            label={t('User.fields.second_surname.label')}
          >
            <Input placeholder={t('User.fields.second_surname.placeholder')} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
