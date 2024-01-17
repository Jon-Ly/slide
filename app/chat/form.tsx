'use client';

import { useRef } from 'react';
import TextInput from '../components/text-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { postMessage } from './actions';

type ChatFormProps = {
  callback?: (formData: FormData) => void | (() => void);
};

export default function ChatForm(props: ChatFormProps) {
  const { callback } = props;
  const formRef = useRef<HTMLFormElement>(null);

  async function submitForm(formData: FormData) {
    const response = await postMessage(formData);

    if (response) {
      formRef.current?.reset();
      callback?.(formData);
    }
  }

  return (
    <form
      ref={formRef}
      className='py-4 border-t flex gap-2 px-2'
      action={(formData) => {
        submitForm(formData);
      }}
    >
      <TextInput
        type='text'
        placeholder='Type something...'
        name='text'
        className='w-full'
      />
      <button type='submit' className='p-2 hover:bg-neutral-100 rounded-full'>
        <FontAwesomeIcon icon={faPaperPlane} width={20} height={20} />
      </button>
    </form>
  );
}
