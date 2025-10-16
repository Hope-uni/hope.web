import {
  SearchableList,
  useAssignablePatients,
} from '@/components/common/Inputs/SearchableList';
import PatientListView from '@/components/patient/list/PatientListView';
import { SinglePatient } from '@/models/schema';
import style from '@/styles/modules/patient.module.scss';
import { Empty, Flex, Form, FormInstance, Input } from 'antd';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsTrash2Fill } from 'react-icons/bs';
import { FaCircleInfo } from 'react-icons/fa6';

interface Props {
  form: FormInstance;
  initialPatients: SinglePatient[];
}

export default function AssignPatientForm({ form, initialPatients }: Props) {
  const { t } = useTranslation();
  const { availableItems, selectedItems, handleChange, handleDeleteSelected } =
    useAssignablePatients<SinglePatient>(initialPatients, 'id');

  useEffect(() => {
    const patientIds = selectedItems.map((patient) => patient.id);
    form.setFieldValue('patients', patientIds);
  }, [form, selectedItems]);

  const handleChangeSearchableList = useCallback(
    (itemSelected: SinglePatient) => {
      handleChange(itemSelected);
      form.resetFields(['patientSelected']);
    },
    [form, handleChange],
  );

  return (
    <div>
      {initialPatients.length > 0 ? (
        <div>
          <div className={style.panelContainerAssignPatientToActivity}>
            <span className={style.panelContainerAssignPatientToActivityIcon}>
              <FaCircleInfo />
            </span>
            <p className={style.panelContainerAssignPatientToActivityText}>
              {t('Therapist.fields.assign_patients.info')}
            </p>
          </div>
          <Form
            form={form}
            name="assign_patient"
            id="create_user_form_antd"
            layout="vertical"
          >
            <Form.Item
              name="patientSelected"
              label={t('Therapist.fields.assign_patients.label')}
              style={{
                marginBottom: 0,
              }}
            >
              <SearchableList<SinglePatient>
                list={availableItems}
                keyValue="id"
                keyLabel="fullName"
                onChange={handleChangeSearchableList}
                placeholder={t('Therapist.fields.assign_patients.placeholder')}
              />
            </Form.Item>

            <Form.Item
              name="patients"
              className="input-hidden"
              extra={
                availableItems.length > 0
                  ? t('Therapist.fields.assign_patients.caption')
                  : t('Therapist.fields.assign_patients.all_patient_selected')
              }
            >
              <Input readOnly type="hidden" />
            </Form.Item>
          </Form>
          <div className={style.patientSelectedWrapper}>
            <h3 className={style.patientSelected_title}>
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
                listPatient={selectedItems}
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
