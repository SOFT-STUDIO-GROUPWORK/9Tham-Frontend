import ITag from "../../../interfaces/ITag";

type Props = {
  title?: string;
  value: string;
  options:string[];
  onChange: any;
  isDefault?: boolean;
};

const Selector = (props: Props) => {
  return (
    <span className="relative flex flex-row items-center w-fit">
      <span className={props.title ? "mr-2" : ""}>{props.title}</span>
      <select
        onChange={props.onChange}
        className="w-40 appearance-none bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 shadow-sm rounded-md leading-tight focus:outline-none focus:shadow-outline"
        defaultValue={"เลือกหมวดหมู่"}
      >
        {props.isDefault ? <option value="เลือกหมวดหมู่" disabled>เลือกหมวดหมู่</option> : <></>}
        {props.options.map((opt, index) => {
          return <option key={index} value={opt}>{opt}</option>;
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
    </span>
  );
};

export default Selector;
