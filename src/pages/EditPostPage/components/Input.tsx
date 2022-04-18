type Props = {
    placeholder: string,
    className?: string,
}

const Input = (props: Props) => {
  
  return (
    <input
    className={`${props.className} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
    id="username"
    type="text"
    placeholder={props.placeholder}
  ></input>
  )
}

export default Input