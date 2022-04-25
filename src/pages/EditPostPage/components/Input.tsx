type Props = {
    placeholder: string,
    className?: string,
    onChange?: any,
    value?: string,
}

const Input = (props: Props) => {

  return (
    <input
    className={`${props.className} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
    id="username"
    type="text"
    placeholder={props.placeholder}
    onChange={props.onChange}
    value={props.value}
  ></input>
  )
}

export default Input