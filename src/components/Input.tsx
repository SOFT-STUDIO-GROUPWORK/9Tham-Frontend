type Props = {
  placeholder: string;
  className?: string;
  onChange?: any;
  value?: string;
  name?: string;
  required?: boolean;
};

const Input = (props: Props) => {

  return (
    <input
      name={props.name}
      className={`${props.className} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline`}
      id="username"
      type="text"
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      required={props.required || true}
    ></input>
  );
};

export default Input;
