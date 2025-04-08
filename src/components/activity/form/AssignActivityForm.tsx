import PatientListView from '@/components/patient/list/PatientListView';
import { ActivityRules } from '@/constants/rules';
import { SinglePatient } from '@/models/schema';
import style from '@/styles/modules/patient.module.scss';
import { Empty, Flex, Form, FormInstance, Input, Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsSearch, BsTrash2Fill } from 'react-icons/bs';

interface Props {
  form: FormInstance;
  initialPatients: SinglePatient[];
  assignedPatients?: SinglePatient[];
}

export default function AssignActivityForm({
  form,
  initialPatients,
  assignedPatients = [],
}: Props) {
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const [availablePatients, setAvailablePatients] =
    useState<SinglePatient[]>(initialPatients);
  const [selectedPatients, setSelectedPatients] =
    useState<SinglePatient[]>(assignedPatients);

  useEffect(() => {
    const patientIds = selectedPatients.map((patient) => patient.id);
    form.setFieldValue('patients', patientIds);
  }, [form, selectedPatients]);

  const handleChange = useCallback(
    (idPatientSelected: number) => {
      const patientToRemove = initialPatients.find(
        (patient) => patient.id === idPatientSelected,
      );

      if (!patientToRemove) return;

      setSelectedPatients((prev) => [...prev, patientToRemove]);

      setAvailablePatients((prev) =>
        prev.filter((patient) => patient.id !== patientToRemove.id),
      );

      setDropdownOpen(false);
      form.resetFields(['patientSelected']);
    },
    [form, initialPatients],
  );

  const handleDeleteSelected = useCallback(
    (idPatientSelected: number) => {
      const patientToRemove = selectedPatients.find(
        (patient) => patient.id === idPatientSelected,
      );

      if (!patientToRemove) return;

      setSelectedPatients((prev) =>
        prev.filter((patient) => patient.id !== idPatientSelected),
      );

      setAvailablePatients((prev) => {
        if (!prev.some((patient) => patient.id === idPatientSelected)) {
          return [...prev, patientToRemove];
        }
        return prev;
      });
    },
    [selectedPatients],
  );

  return (
    <div
      style={{
        height: '400px',
      }}
    >
      {initialPatients.length > 0 ? (
        <div>
          <Form
            form={form}
            name="assign_patient"
            id="create_user_form_antd"
            layout="vertical"
          >
            <Form.Item
              name="patientSelected"
              label={t('Therapist.fields.assign_patients.placeholder')}
              style={{
                marginBottom: 0,
              }}
            >
              <Select
                className="primary custom-assign-patient"
                showSearch
                allowClear
                autoClearSearchValue={false}
                onChange={handleChange}
                open={dropdownOpen}
                tagRender={() => <></>}
                suffixIcon={<></>}
                prefix={<BsSearch />}
                maxTagCount={0}
                onDropdownVisibleChange={(open) => setDropdownOpen(open)}
                filterOption={(input, option) =>
                  (option?.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                disabled={availablePatients.length === 0}
              >
                {availablePatients.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.fullName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="patients"
              rules={ActivityRules.patientsToAssign}
              className="input-hidden"
            >
              <Input readOnly type="hidden" />
            </Form.Item>
          </Form>
          <div className={style.patientSelectedWrapper}>
            <h3
              className={style.patientSelected_title}
              style={{
                marginTop: '40px',
              }}
            >
              {t(
                'Therapist.actions.assign_patients.modal.title_patient_selected',
              )}
            </h3>
            <div
              className={style.patientSelected_scroll}
              style={{
                height: '250px',
              }}
            >
              <PatientListView
                listPatient={selectedPatients}
                actions={[
                  {
                    label: t(
                      'Therapist.actions.assign_patients.button_deselected',
                    ),
                    labelMobile: <BsTrash2Fill />,
                    actionCallback: handleDeleteSelected,
                    buttonProps: {
                      type: 'default',
                      className: 'primary_modal_footer_btn_cancel',
                    },
                  },
                ]}
              />
            </div>
          </div>
        </div>
      ) : (
        <Flex
          align="center"
          justify="center"
          style={{
            height: '100%',
          }}
        >
          <Empty
            description={t(
              'Activity.actions.assign_activity.feedback.no_available',
            )}
            style={{ marginTop: 30, width: '400px' }}
          />
        </Flex>
      )}
    </div>
  );
}
