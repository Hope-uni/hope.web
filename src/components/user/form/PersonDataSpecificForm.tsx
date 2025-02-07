import { Show } from '@/components/Show';
import { UserRules } from '@/constants/rules';
import { useFormCreateUserStore } from '@/lib/store/formCreateUser';
import styles from '@/styles/modules/user.module.scss';
import { Col, DatePicker, Form, FormInstance, Input, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const { Option } = Select;

interface Props {
  form?: FormInstance;
  gutterRow?: number | [number, number];
  spanCol?: number;
  spanColMedium?: number;
}

const inputVisibleByRole = {
  birthday: ['Paciente', 'Terapeuta', 'Tutor'],
  teaGrade: ['Paciente'],
  teaPhase: ['Paciente'],
  tutorInCharge: ['Paciente'],
  observations: ['Paciente'],
  identification: ['Terapeuta', 'Tutor'],
  phoneNumber: ['Terapeuta', 'Tutor'],
  telephone: ['Tutor'],
};

const spanColFullWidth = 24;
const ThreeYearsAgo = dayjs(new Date()).subtract(3, 'years');
const SixteenYearsAgo = dayjs(new Date()).subtract(16, 'years');

export default function PersonDataSpecificForm({
  form,
  gutterRow = 0,
  spanCol = spanColFullWidth,
  spanColMedium = spanColFullWidth,
}: Props) {
  const { t } = useTranslation();
  const {
    currentRoleSelected,
    phaseList,
    degreeList,
    tutorList,
    fields,
    isEdit,
  } = useFormCreateUserStore();

  useEffect(() => {
    if (isEdit) {
      form?.setFieldsValue(fields);
    }
  }, [fields, form, isEdit]);

  const disabledFutureDate = (current: any) => {
    if (currentRoleSelected.name === 'Paciente') {
      return current && current.valueOf() >= ThreeYearsAgo;
    }

    return current && current.valueOf() >= SixteenYearsAgo;
  };

  return (
    <Form
      name="create_login"
      id="create_user_form_antd"
      layout="vertical"
      className={styles.wrapper_form_create_user}
      form={form}
    >
      <Show>
        <Show.When
          isTrue={inputVisibleByRole.birthday.includes(
            currentRoleSelected.name,
          )}
        >
          <Row gutter={gutterRow}>
            <Col
              sm={{ span: spanColFullWidth }}
              xs={{ span: spanColFullWidth }}
            >
              <Form.Item
                name="birthday"
                label={t('User.fields.birthday.label')}
                rules={UserRules.user.birthday}
              >
                <DatePicker
                  placeholder={t('User.fields.birthday.placeholder')}
                  defaultPickerValue={ThreeYearsAgo}
                  disabledDate={disabledFutureDate}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Show.When>
      </Show>

      {
        <Show>
          <Show.When isTrue={currentRoleSelected.name === 'Paciente'}>
            <Row gutter={gutterRow}>
              <Col sm={{ span: spanCol }} xs={{ span: spanColFullWidth }}>
                <Form.Item
                  name="teaDegreeId"
                  label={t('User.fields.grade_of_tea.label')}
                  rules={UserRules.user.gradeOfTea}
                >
                  <Select
                    placeholder={t('User.fields.grade_of_tea.placeholder')}
                  >
                    {degreeList.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {`${item.name}: ${item.description}`}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col sm={{ span: spanCol }} xs={{ span: spanColFullWidth }}>
                <Form.Item
                  name="phaseId"
                  label={t('User.fields.phase.label')}
                  rules={UserRules.user.phase}
                >
                  <Select placeholder={t('User.fields.phase.placeholder')}>
                    {phaseList.map((item, index) => (
                      <Select.Option key={item.id} value={item.id}>
                        {`Fase ${index + 1} - ${item.name}`}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={gutterRow}>
              <Col
                sm={{ span: spanColFullWidth }}
                xs={{ span: spanColFullWidth }}
              >
                <Form.Item
                  name="tutorId"
                  label={t('User.fields.tutor_in_charge.label')}
                  rules={UserRules.user.tutorInCharge}
                >
                  <Select
                    placeholder={t('User.fields.tutor_in_charge.placeholder')}
                  >
                    {tutorList.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.fullName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col
                sm={{ span: spanColFullWidth }}
                xs={{ span: spanColFullWidth }}
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
              </Col>
            </Row>
          </Show.When>
        </Show>
      }

      <Row gutter={gutterRow}>
        <Col sm={{ span: spanColMedium }} xs={{ span: spanColFullWidth }}>
          <Show>
            <Show.When
              isTrue={inputVisibleByRole.identification.includes(
                currentRoleSelected.name,
              )}
            >
              <Form.Item
                name="identificationNumber"
                label={t('User.fields.identification.label')}
                rules={UserRules.user.identification}
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
              isTrue={inputVisibleByRole.phoneNumber.includes(
                currentRoleSelected.name,
              )}
            >
              <Form.Item
                name="phoneNumber"
                label={t('User.fields.phone_number.label')}
                rules={UserRules.user.phoneNumber}
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
              isTrue={inputVisibleByRole.telephone.includes(
                currentRoleSelected.name,
              )}
            >
              <Form.Item
                name="telephone"
                label={t('User.fields.telephone.label')}
                rules={UserRules.user.telephone}
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
