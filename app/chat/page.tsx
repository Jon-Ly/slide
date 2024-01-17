'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextInput from '../components/text-input';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { getMessages, postMessage } from './actions';
import { useEffect, useRef, useState } from 'react';
import { PaginatedMessages } from '../types/message';

export default function ChatPage() {
  const loggedInUser = 1;
  const formRef = useRef<HTMLFormElement>(null);
  const [messages, setMessages] = useState<PaginatedMessages>({
    data: [],
    hasMoreData: false,
  });

  useEffect(() => {
    (async () => {
      setMessages(await getMessages());
    })();
  }, []);

  async function submitForm(formData: FormData) {
    const response = await postMessage(formData);

    if (response) {
      formRef.current?.reset();
      (async () => {
        setMessages(await getMessages());
      })();
    }
  }

  return (
    <main className='m-auto w-[70%] h-full flex flex-col justify-end'>
      <section className='flex flex-col gap-2 overflow-y-auto px-2 py-4'>
        {messages.data.map((message) => {
          if (message.userId === loggedInUser) {
            return (
              <div
                className='bg-red-200 max-w-96 w-fit p-2 self-end'
                key={message.id}
              >
                <p>{message.text}</p>
              </div>
            );
          } else {
            return (
              <div className='bg-blue-200 max-w-96 w-fit p-2' key={message.id}>
                {message.text}
              </div>
            );
          }
        })}
      </section>
      <form
        ref={formRef}
        className='py-4 border-t flex gap-2 px-2'
        action={submitForm}
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
    </main>
  );
}
