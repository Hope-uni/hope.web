import PictogramSentenceField from '@/components/activity/form/PictogramSentenceField/PictogramSentenceField';
import { ActivityRules } from '@/constants/rules';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import useActivityForm from '@/hooks/useActivityForm';
import { useFormActivityStore } from '@/lib/store/forms/formActivity';
import { FormActivityErrors } from '@/models/schema';
import { CreateActivityService } from '@/services/activity/activity.service';
import { ParseToErrorAntd } from '@/services/user/helpers';
import { Button, Flex, Form, Grid, Input, InputNumber, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

const { useBreakpoint } = Grid;

export default function ActivityForm() {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const { openNotification } = useOpenNotification();
  const [form] = Form.useForm();
  const [loadingForm, setLoadingForm] = useState(false);
  const { phaseList, setSolutionSentenceList } = useFormActivityStore();
  const solutionSentenceList = useFormActivityStore(
    useShallow((state) => state.solutionSentenceList),
  );

  const { invalidateListActivity } = useActivityForm();

  const pictogramSentence = Form.useWatch('pictogramSentence', form);

  useEffect(() => {
    const current = form.getFieldValue('pictogramSentence');
    const next = solutionSentenceList.map((item) => item.id);

    if (JSON.stringify(current) !== JSON.stringify(next)) {
      form.setFieldValue('pictogramSentence', next);
    }
  }, [form, solutionSentenceList]);

  useEffect(() => {
    form.validateFields(['pictogramSentence']);
  }, [form, pictogramSentence]);

  const applyErrors = useCallback(
    (validationErrors: FormActivityErrors) => {
      const errors = ParseToErrorAntd(validationErrors);
      if (errors.length > 0) {
        form.setFields(errors);
        form.scrollToField(errors[0].name, {
          behavior: 'smooth',
          block: 'center',
        });
      }
    },
    [form],
  );

  const handleSubmit = useCallback(async () => {
    try {
      setLoadingForm(true);

      const validateFormUser = await form.validateFields();

      if (validateFormUser.errorFields) {
        return;
      }

      const values = form.getFieldsValue();

      const res = await CreateActivityService(values);

      if (res.error && res.statusCode !== 201) {
        if (
          res.validationErrors &&
          Object.keys(res.validationErrors).length > 0
        ) {
          applyErrors(res.validationErrors as FormActivityErrors);
        }
        setLoadingForm(false);
        return;
      }

      await invalidateListActivity();

      openNotification.success({
        description: res.message,
      });

      setLoadingForm(false);
      form.resetFields();
      setSolutionSentenceList([]);
    } catch (error) {
      setLoadingForm(false);
    }
  }, [
    form,
    invalidateListActivity,
    openNotification,
    setSolutionSentenceList,
    applyErrors,
  ]);

  return (
    <Flex
      vertical
      gap={50}
      style={{
        width: '100%',
        padding: '10px',
        marginTop: '20px',
        marginBottom: '20px',
      }}
    >
      <Form
        name="form_category"
        id="activity_form_antd"
        layout="vertical"
        form={form}
        scrollToFirstError={true}
        style={{
          width: `${screens.xs ? '100%' : '90%'}`,
        }}
      >
        <Flex vertical style={{ width: `${screens.xs ? '100%' : '60%'}` }}>
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
        </Flex>

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
      <Flex justify="flex-end" gap={10}>
        <Button type="primary" onClick={handleSubmit} loading={loadingForm}>
          {t('Activity.actions.form.modal.ok_text_create')}
        </Button>
      </Flex>
    </Flex>
  );
}
