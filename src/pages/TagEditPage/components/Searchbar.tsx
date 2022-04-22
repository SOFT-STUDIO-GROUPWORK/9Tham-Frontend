import { FaSearch } from "react-icons/fa";

type Props = {
  onClick?: any;
};

const Searchbar = (props: Props) => {
  return (
    <div className="flex flex-1">
      <input
        className="grow px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid shadow-sm border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-600 focus:outline-none"
        id="filter"
        type="search"
        placeholder="ค้นหา..."
      />
      <button
        onClick={props.onClick}
        className="btn px-6 py-3 bg-amber-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-sm hover:bg-amber-600 hover:shadow-lg focus:bg-amber-600  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-700 active:shadow-lg transition duration-150 ease-in-out "
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default Searchbar;
