import useCapsLockDetector from '@/hooks/useCapsLockEvent';
import { Input } from 'antd';
import FormItem, { FormItemProps } from 'antd/lib/form/FormItem';
import { useMemo } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';

interface Props extends FormItemProps {
  placeholderInput: string;
  showWarningOnCapsLock?: boolean;
}

const InputPassword = ({
  placeholderInput,
  showWarningOnCapsLock = true,
  ...props
}: Props) => {
  const capsLockOn = useCapsLockDetector();

  const validateCapsLockOn = useMemo(() => {
    return showWarningOnCapsLock ? capsLockOn : false;
  }, [capsLockOn, showWarningOnCapsLock]);

  return (
    <FormItem
      validateStatus={validateCapsLockOn ? 'warning' : undefined}
      help={validateCapsLockOn ? 'Warning: Caps Lock is ON!' : undefined}
      {...props}
    >
      <Input.Password
        iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
        type="password"
        placeholder={placeholderInput}
        prefix={validateCapsLockOn ? <IoWarningOutline /> : undefined}
      />
    </FormItem>
  );
};

export default InputPassword;
