import { getMessages } from './actions';
import ChatForm from './form';

export default async function ChatPage() {
  const loggedInUser = 1;
  let messages = await getMessages();

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
      <ChatForm />
    </main>
  );
}
