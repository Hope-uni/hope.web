import { PhaseRules } from '@/constants/rules';
import { Form, FormInstance, Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useTranslation } from 'react-i18next';

interface Props {
  form: FormInstance;
}

export default function PhaseForm({ form }: Props) {
  const { t } = useTranslation();

  return (
    <Form name="edit_phase" id="phase_form_antd" layout="vertical" form={form}>
      <Form.Item
        name="name"
        label={t('Phase.fields.name.label')}
        rules={PhaseRules.name}
      >
        <Input placeholder={t('Phase.fields.name.placeholder')} />
      </Form.Item>
      <Form.Item
        name="description"
        label={t('Phase.fields.description.label')}
        rules={PhaseRules.description}
      >
        <TextArea
          rows={4}
          placeholder={t('Phase.fields.description.placeholder')}
        />
      </Form.Item>
      <Form.Item
        name="scoreActivities"
        label={t('Phase.fields.scoreActivities.label')}
        rules={PhaseRules.scoreActivities}
      >
        <InputNumber
          min={0}
          type="number"
          keyboard={false}
          placeholder={t('Phase.fields.scoreActivities.placeholder')}
        />
      </Form.Item>
    </Form>
  );
}
