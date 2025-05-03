import { AchievementRules, CategoryRules } from '@/constants/rules';
import { Form, FormInstance, Input } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  form: FormInstance;
}

export default function AchievementForm({ form }: Props) {
  const { t } = useTranslation();

  return (
    <Form
      name="form_achievement"
      id="achievement_form_antd"
      layout="vertical"
      form={form}
    >
      <Form.Item
        name="name"
        label={t('Achievement.fields.name.label')}
        rules={AchievementRules.name}
      >
        <Input placeholder={t('Achievement.fields.name.placeholder')} />
      </Form.Item>
      <Form.Item
        name="imageUrl"
        label={t('Achievement.fields.image.label')}
        rules={AchievementRules.image}
      >
        <Input placeholder={t('Achievement.fields.image.placeholder')} />
      </Form.Item>
    </Form>
  );
}
