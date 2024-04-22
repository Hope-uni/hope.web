import { Show } from '@/components/Show';
import styles from '@/styles/modules/user.module.scss';
import { Col, Form, Input, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useTranslations } from 'next-intl';

const { Option } = Select;

interface Props {
  selectedRole: string;
  isEdit?: boolean;
  gutterRow?: number | [number, number];
  spanCol?: number;
  spanColMedium?: number;
}

const inputVisibleByRole = {
  birthday: ['patient'],
  gradeOfTea: ['patient'],
  phase: ['patient'],
  tutorInCharge: ['patient'],
  observations: ['patient'],
  identification: ['therapist', 'tutor'],
  phoneNumber: ['therapist', 'tutor'],
  telephone: ['tutor'],
};

const spanColFullWidth = 24;

export default function PersonDataSpecificForm({
  selectedRole,
  isEdit = false,
  gutterRow = 0,
  spanCol = spanColFullWidth,
  spanColMedium = spanColFullWidth,
}: Props) {
  const t = useTranslations('_.User.fields');

  console.log(selectedRole);

  return (
    <Form
      name="create_login"
      id="create_user_form_antd"
      layout="vertical"
      className={styles.wrapper_form_create_user}
    >
      <Row gutter={gutterRow}>
        <Col sm={{ span: spanCol }} xs={{ span: spanColFullWidth }}>
          <Show>
            <Show.When
              isTrue={inputVisibleByRole.birthday.includes(selectedRole)}
            >
              <Form.Item name="bithday" label={t('birthday.label')}>
                <Input placeholder={t('birthday.placeholder')} />
              </Form.Item>
            </Show.When>
          </Show>
        </Col>
        <Col sm={{ span: spanCol }} xs={{ span: spanColFullWidth }}>
          <Show>
            <Show.When
              isTrue={inputVisibleByRole.gradeOfTea.includes(selectedRole)}
            >
              <Form.Item name="gradeOfTea" label={t('grade_of_tea.label')}>
                <Select placeholder={t('grade_of_tea.placeholder')}>
                  <Option value="demo">demo</Option>
                </Select>
              </Form.Item>
            </Show.When>
          </Show>
        </Col>
      </Row>

      <Row gutter={gutterRow}>
        <Col sm={{ span: spanCol }} xs={{ span: spanColFullWidth }}>
          <Show>
            <Show.When isTrue={inputVisibleByRole.phase.includes(selectedRole)}>
              <Form.Item name="bithday" label={t('phase.label')}>
                <Select placeholder={t('phase.placeholder')}>
                  <Option value="demo">Fase 1</Option>
                </Select>
              </Form.Item>
            </Show.When>
          </Show>
        </Col>
        <Col sm={{ span: spanCol }} xs={{ span: spanColFullWidth }}>
          <Show>
            <Show.When
              isTrue={inputVisibleByRole.tutorInCharge.includes(selectedRole)}
            >
              <Form.Item
                name="tutorInCharge"
                label={t('tutor_in_charge.label')}
              >
                <Select placeholder={t('tutor_in_charge.placeholder')}>
                  <Option value="demo">Demo</Option>
                </Select>
              </Form.Item>
            </Show.When>
          </Show>
        </Col>
      </Row>

      <Show>
        <Show.When
          isTrue={inputVisibleByRole.observations.includes(selectedRole)}
        >
          <Form.Item name="observations" label={t('observations.label')}>
            <TextArea rows={4} placeholder={t('observations.placeholder')} />
          </Form.Item>
        </Show.When>
      </Show>

      <Row gutter={gutterRow}>
        <Col sm={{ span: spanColMedium }} xs={{ span: spanColFullWidth }}>
          <Show>
            <Show.When
              isTrue={inputVisibleByRole.identification.includes(selectedRole)}
            >
              <Form.Item
                name="identification"
                label={t('identification.label')}
              >
                <Input placeholder={t('identification.placeholder')} />
              </Form.Item>
            </Show.When>
          </Show>
        </Col>
        <Col sm={{ span: spanColMedium }} xs={{ span: spanColFullWidth }}>
          <Show>
            <Show.When
              isTrue={inputVisibleByRole.phoneNumber.includes(selectedRole)}
            >
              <Form.Item name="phoneNumber" label={t('phone_number.label')}>
                <Input placeholder={t('phone_number.placeholder')} />
              </Form.Item>
            </Show.When>
          </Show>
        </Col>
        <Col sm={{ span: spanColMedium }} xs={{ span: spanColFullWidth }}>
          <Show>
            <Show.When
              isTrue={inputVisibleByRole.telephone.includes(selectedRole)}
            >
              <Form.Item name="telephone" label={t('telephone.label')}>
                <Input placeholder={t('telephone.placeholder')} />
              </Form.Item>
            </Show.When>
          </Show>
        </Col>
      </Row>
    </Form>
  );
}
