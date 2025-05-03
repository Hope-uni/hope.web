import { AchievementRules } from '@/constants/rules';
import { Achievement } from '@/models/schema';
import { Form, FormInstance, Select } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  form: FormInstance;
  achievementList: Achievement[];
}

export default function AssignAchievementForm({
  form,
  achievementList,
}: Props) {
  const { t } = useTranslation();

  return (
    <Form
      name="add_achievement"
      id="create_user_form_antd"
      layout="vertical"
      form={form}
    >
      <Form.Item
        name="achievementId"
        label={t('Patient.fields.assign_achievements.label')}
        rules={AchievementRules.assignToPatient}
      >
        <Select
          placeholder={t('Patient.fields.assign_achievements.placeholder')}
          className="primary"
        >
          {achievementList.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
