import FormItemDatePicker from '@/components/common/Inputs/FormItemDatePicker';
import { Show } from '@/components/Show';
import { UserRules } from '@/constants/rules';
import { useFormCreateUserStore } from '@/lib/store/forms/formCreateUser';
import styles from '@/styles/modules/user.module.scss';
import { Col, Form, FormInstance, Input, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

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
    errors,
    setErrors,
  } = useFormCreateUserStore();

  const tutorVerifiedList = useMemo(() => {
    const currentTutorId = fields?.tutorId;

    return tutorList.filter((tutor) =>
      !isEdit
        ? tutor.isVerified
        : tutor.isVerified || tutor.id === currentTutorId,
    );
  }, [fields?.tutorId, isEdit, tutorList]);

  useEffect(() => {
    if (isEdit) {
      form?.setFieldsValue(fields);
    }
  }, [fields, form, isEdit]);

  useEffect(() => {
    if (errors?.specific && errors?.specific?.length > 0) {
      form?.setFields(errors?.specific);
      setErrors({
        ...errors,
        specific: undefined,
      });
    }
  }, [errors, form, setErrors]);

  return (
    <Form
      name="create_login_specific"
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
              <FormItemDatePicker
                name="birthday"
                label={t('User.fields.birthday.label')}
                placeholder={t('User.fields.birthday.placeholder')}
                currentRoleSelected={currentRoleSelected}
              />
            </Col>
          </Row>
        </Show.When>
      </Show>

      {
        <Show>
          <Show.When isTrue={currentRoleSelected.name === 'Paciente'}>
            <Show>
              <Show.When isTrue={!isEdit}>
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
              </Show.When>
            </Show>
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
                    {tutorVerifiedList.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.fullName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Show>
                <Show.When isTrue={!isEdit}>
                  <Col
                    sm={{ span: spanColFullWidth }}
                    xs={{ span: spanColFullWidth }}
                  >
                    <Form.Item
                      name="observations"
                      label={t('User.fields.observations.label')}
                      rules={UserRules.user.observations}
                    >
                      <TextArea
                        rows={4}
                        placeholder={t('User.fields.observations.placeholder')}
                      />
                    </Form.Item>
                  </Col>
                </Show.When>
              </Show>
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
