import { CategoryRules } from '@/constants/rules';
import { Form, FormInstance, Input } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  form: FormInstance;
}

export default function CategoryForm({ form }: Props) {
  const { t } = useTranslation();

  return (
    <Form
      name="form_category"
      id="category_form_antd"
      layout="vertical"
      form={form}
    >
      <Form.Item
        name="name"
        label={t('Category.fields.name.label')}
        rules={CategoryRules.name}
      >
        <Input placeholder={t('Category.fields.name.placeholder')} />
      </Form.Item>
      <Form.Item
        name="icon"
        label={t('Category.fields.icon.label')}
        rules={CategoryRules.icon}
      >
        <Input placeholder={t('Category.fields.icon.placeholder')} />
      </Form.Item>
    </Form>
  );
}
