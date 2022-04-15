import { Link } from "react-router-dom";
type Props = {
  title: string;
  description: string;
  type: string;
};

const Card = (props: Props) => {
  return (
    <Link to="/">
      <div className="p-1 px-1.5 flex flex-col items-center bg-white rounded-lg border shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        {/* left */}
        <div className="flex flex-col justify-between">
          <img
            className="object-cover w-full h-96 lg:h-40 lg:w-48 rounded"
            src="http://buddhismarticles.com/wp-content/uploads/2007/08/monks-1822569_1280.jpg"
            alt=""
          />
        </div>
        {/* right */}
        <div className="flex flex-col justify-between p-4">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {props.description}
          </p>
          <button className="btn bg-amber-600 rounded-full text-white px-2 py-1 max-w-fit">
            {props.type}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
