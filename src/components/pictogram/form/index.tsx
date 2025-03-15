import { PictogramRules } from '@/constants/rules/pictogram';
import { useFormPictogramStore } from '@/lib/store/forms/formPictogram';
import { Form, FormInstance, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  form: FormInstance;
}

export default function PictogramForm({ form }: Props) {
  const { t } = useTranslation();
  const { categoryList } = useFormPictogramStore();

  return (
    <Form
      name="form_pictogram"
      id="pictogram_form_antd"
      layout="vertical"
      form={form}
    >
      <Form.Item
        name="name"
        label={t('Pictogram.fields.name.label')}
        rules={PictogramRules.name}
      >
        <Input placeholder={t('Pictogram.fields.name.placeholder')} />
      </Form.Item>

      <Form.Item
        name="categoryId"
        label={t('Pictogram.fields.category.label')}
        rules={PictogramRules.category}
      >
        <Select placeholder={t('Pictogram.fields.category.placeholder')}>
          {categoryList.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="imageUrl"
        label={t('Pictogram.fields.image.label')}
        rules={PictogramRules.image}
      >
        <Input placeholder={t('Pictogram.fields.image.placeholder')} />
      </Form.Item>
    </Form>
  );
}
