import TextInput from '../components/text-input';
import { GetAllMessages } from '../types/message';

export default async function ChatPage() {
  const loggedInUser = '1';

  const messages = (await (
    await fetch('http://localhost:3000/api/messages?pagenumber=1&pagesize=10', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json()) as GetAllMessages;

  try {
    GetAllMessages.parse(messages);
  } catch (ex) {
    console.log(ex);
  }

  return (
    <main className='m-auto w-[70%] h-full flex flex-col justify-end'>
      <section className='flex flex-col gap-2 overflow-y-auto p-2'>
        {messages.data.map((message) => {
          if (message.userId === loggedInUser) {
            return (
              <div className='bg-red-200 max-w-96 w-fit p-2 self-end' key={message.id}>
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
      <TextInput
        type='text'
        placeholder='Type something...'
        name='message'
        className='py-2'
      />
    </main>
  );
}
