type Props = {
    title: string,
    options: string[],
};

const Selector = (props: Props) => {
  return (
    <div className="relative flex flex-row items-center">
      <span className="pr-2">{props.title}</span>
      <select className="w-40 appearance-none bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 shadow-sm rounded-md leading-tight focus:outline-none focus:shadow-outline">
        {props.options.map((opt, index) => {
            return (
                <option key={index}>{opt}</option>
            );
        })}
      </select>
      <span className="absolute right-4">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </span>
    </div>
  );
};

export default Selector;
