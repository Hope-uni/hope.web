import { Show } from '@/components/Show';
import styles from '@/styles/modules/user.module.scss';
import { Col, Form, Input, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
              <Form.Item name="bithday" label={t('User.fields.birthday.label')}>
                <Input placeholder={t('User.fields.birthday.placeholder')} />
              </Form.Item>
            </Show.When>
          </Show>
        </Col>
        <Col sm={{ span: spanCol }} xs={{ span: spanColFullWidth }}>
          <Show>
            <Show.When
              isTrue={inputVisibleByRole.gradeOfTea.includes(selectedRole)}
            >
              <Form.Item
                name="gradeOfTea"
                label={t('User.fields.grade_of_tea.label')}
              >
                <Select placeholder={t('User.fields.grade_of_tea.placeholder')}>
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
              <Form.Item name="bithday" label={t('User.fields.phase.label')}>
                <Select placeholder={t('User.fields.phase.placeholder')}>
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
                label={t('User.fields.tutor_in_charge.label')}
              >
                <Select
                  placeholder={t('User.fields.tutor_in_charge.placeholder')}
                >
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
          <Form.Item
            name="observations"
            label={t('User.fields.observations.label')}
          >
            <TextArea
              rows={4}
              placeholder={t('User.fields.observations.placeholder')}
            />
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
                label={t('User.fields.identification.label')}
              >
                <Input
                  placeholder={t('User.fields.identification.placeholder')}
                />
              </Form.Item>
            </Show.When>
          </Show>
        </Col>
        <Col sm={{ span: spanColMedium }} xs={{ span: spanColFullWidth }}>
          <Show>
            <Show.When
              isTrue={inputVisibleByRole.phoneNumber.includes(selectedRole)}
            >
              <Form.Item
                name="phoneNumber"
                label={t('User.fields.phone_number.label')}
              >
                <Input
                  placeholder={t('User.fields.phone_number.placeholder')}
                />
              </Form.Item>
            </Show.When>
          </Show>
        </Col>
        <Col sm={{ span: spanColMedium }} xs={{ span: spanColFullWidth }}>
          <Show>
            <Show.When
              isTrue={inputVisibleByRole.telephone.includes(selectedRole)}
            >
              <Form.Item
                name="telephone"
                label={t('User.fields.telephone.label')}
              >
                <Input placeholder={t('User.fields.telephone.placeholder')} />
              </Form.Item>
            </Show.When>
          </Show>
        </Col>
      </Row>
    </Form>
  );
}
