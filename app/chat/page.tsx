import TextInput from '../components/text-input';
import { GetAllMessages } from '../types/message';

export default async function ChatPage() {
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
    <main>
      <section>
        {messages.data.map((message) => {
          return <div key={message.id}>{message.text}</div>;
        })}
      </section>
      <TextInput type='text' placeholder='Type something...' name='message' />
    </main>
  );
}
