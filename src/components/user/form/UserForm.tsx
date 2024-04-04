import { Show } from '@/components/Show';
import EditUserForm from './EditUserForm';
import CreateUserForm from './CreateUserForm';

interface Props {
  isEdit?: boolean;
}

export default function UserForm({ isEdit = false }: Props) {
  return (
    <>
      <Show>
        <Show.When isTrue={!isEdit}>
          <CreateUserForm />
        </Show.When>
        <Show.Else>
          <EditUserForm />
        </Show.Else>
      </Show>
    </>
  );
}
