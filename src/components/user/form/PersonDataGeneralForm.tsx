import { Show } from '@/components/Show';
import { Rules } from '@/constants/rules';
import styles from '@/styles/modules/user.module.scss';
import { Col, Form, Input, Radio, Row } from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import { useTranslations } from 'next-intl';
import { Dispatch } from 'react';

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
  const t = useTranslations('_.User.fields');
  const t_role = useTranslations('_.Role');

  const Roles = [
    {
      label: t_role('catalog.patient'),
      value: 'patient',
    },
    {
      label: t_role('catalog.tutor'),
      value: 'tutor',
    },
    {
      label: t_role('catalog.therapist'),
      value: 'therapist',
    },
    {
      label: t_role('catalog.admin'),
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
            label={t('user_role.label')}
            rules={Rules.user.create.user_role}
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
            label={t('first_name.label')}
            rules={Rules.user.create.first_name}
          >
            <Input placeholder={t('first_name.label')} />
          </Form.Item>
        </Col>
        <Col sm={{ span: spanCol }} xs={{ span: 24 }}>
          <Form.Item name="second_name" label={t('second_name.label')}>
            <Input placeholder={t('second_name.placeholder')} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={gutterRow}>
        <Col sm={{ span: spanCol }} xs={{ span: 24 }}>
          <Form.Item
            name="first_surname"
            label={t('first_surname.label')}
            rules={Rules.user.create.first_surname}
          >
            <Input placeholder={t('first_surname.placeholder')} />
          </Form.Item>
        </Col>
        <Col sm={{ span: spanCol }} xs={{ span: 24 }}>
          <Form.Item name="second_surname" label={t('second_surname.label')}>
            <Input placeholder={t('second_surname.placeholder')} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
