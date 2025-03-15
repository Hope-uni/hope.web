import { ActivityRules } from '@/constants/rules';
import { useFormActivityStore } from '@/lib/store/forms/formActivity';
import { Form, FormInstance, Input, InputNumber, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useTranslation } from 'react-i18next';
import PictogramSentenceField from '@/components/activity/form/PictogramSentenceField';
import { useEffect } from 'react';

interface Props {
  form: FormInstance;
}

export default function ActivityForm({ form }: Props) {
  const { t } = useTranslation();
  const { phaseList } = useFormActivityStore();
  const { solutionSentenceList } = useFormActivityStore();
  const pictogramSentence = Form.useWatch('pictogramSentence', form);

  useEffect(() => {
    form.setFieldValue(
      'pictogramSentence',
      solutionSentenceList.map((item) => item.id),
    );
  }, [form, solutionSentenceList]);

  useEffect(() => {
    form.validateFields(['pictogramSentence']);
  }, [form, pictogramSentence]);

  return (
    <Form
      name="form_category"
      id="activity_form_antd"
      layout="vertical"
      form={form}
      scrollToFirstError={true}
    >
      <Form.Item
        name="name"
        label={t('Activity.fields.name.label')}
        rules={ActivityRules.name}
      >
        <Input placeholder={t('Activity.fields.name.placeholder')} />
      </Form.Item>

      <Form.Item
        name="description"
        label={t('Activity.fields.description.label')}
        rules={ActivityRules.description}
      >
        <TextArea
          rows={4}
          placeholder={t('Activity.fields.description.placeholder')}
        />
      </Form.Item>

      <Form.Item
        name="satisfactoryPoints"
        label={t('Activity.fields.satisfactoryPoints.label')}
        rules={ActivityRules.satisfactoryPoints}
      >
        <InputNumber
          min={0}
          type="number"
          keyboard={false}
          placeholder={t('Activity.fields.satisfactoryPoints.placeholder')}
        />
      </Form.Item>

      <Form.Item
        name="phaseId"
        label={t('Activity.fields.phase.label')}
        rules={ActivityRules.phase}
      >
        <Select placeholder={t('Activity.fields.phase.placeholder')}>
          {phaseList.map((item, index) => (
            <Select.Option key={item.id} value={item.id}>
              {`Fase ${index + 1} - ${item.name}`}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label={t('Activity.fields.pictogramSentence.label')}
        style={{
          marginBottom: '0',
        }}
        required
      >
        <PictogramSentenceField />
      </Form.Item>

      <Form.Item
        name="pictogramSentence"
        className="input-hidden"
        rules={ActivityRules.pictogramSentence}
        validateFirst={false}
      >
        <Input readOnly type="hidden" />
      </Form.Item>
    </Form>
  );
}
