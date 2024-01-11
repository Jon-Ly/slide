type TextInputProps = {
  type: 'text' | 'password' | 'email';
  label?: string;
  name?: string;
  placeholder?: string;
  labelCompoennt?: React.ReactNode;
};

export default function TextInput(props: TextInputProps) {
  const { type, labelCompoennt, placeholder, label, name } = props;

  return (
    <label>
      {labelCompoennt || label}
      <input
        type={type}
        className='border border-gray-300 rounded-md py-1 px-2 w-full text-black active:outline-none focus:outline-none focus:ring-2 focus:ring-blue-500'
        name={name}
      />
    </label>
  );
}
