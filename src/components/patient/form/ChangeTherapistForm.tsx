import { UserRules } from '@/constants/rules';
import { Achievement, SingleTutorTherapist } from '@/models/schema';
import { Form, FormInstance, Select } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  form: FormInstance;
  availableTherapistList: SingleTutorTherapist[];
}

export default function ChangeTherapistForm({
  form,
  availableTherapistList,
}: Props) {
  const { t } = useTranslation();

  return (
    <Form
      name="change_therapist"
      id="change_therapist_form_antd"
      layout="vertical"
      form={form}
    >
      <Form.Item
        name="therapist"
        label={t('Patient.fields.change_therapist.label')}
        rules={UserRules.user.therapistInCharge}
      >
        <Select
          placeholder={t('Patient.fields.change_therapist.placeholder')}
          className="primary"
        >
          {availableTherapistList.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.fullName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
