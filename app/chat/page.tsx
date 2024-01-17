import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextInput from '../components/text-input';
import { GetAllMessages } from '../types/message';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { getMessages } from './actions';

export default async function ChatPage() {
  const loggedInUser = '1';
  let messages = {} as GetAllMessages;
  
  try {
    messages = GetAllMessages.parse(await getMessages());
  } catch (ex) {
    throw new Error(`Failed to parse messages: ${ex}`);
  }

  async function onSubmit(formData: FormData) {
    'use server';

    console.log(formData);
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
      <form className='py-4 border-t flex gap-2 px-2' action={onSubmit}>
        <TextInput
          type='text'
          placeholder='Type something...'
          name='message'
          className='w-full'
        />
        <button type='submit' className='p-2 hover:bg-neutral-100 rounded-full'>
          <FontAwesomeIcon icon={faPaperPlane} width={20} height={20} />
        </button>
      </form>
    </main>
  );
}
