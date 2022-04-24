import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import { IPagination } from "../TagEditPage";

type Props = {
  pagination: IPagination;
  handleOnClick: (value: number) => void;
};

const Pagination = ({ pagination, handleOnClick }: Props) => {
  let active =
    "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium";
  let inactive =
    "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium";

  let disableClass = "bg-gray-100 ";
  let normalStepClass =
    "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500";

  let previousPage = pagination.currentPage - 1;
  let nextPage = pagination.currentPage + 1;

  return (
    <div className="w-full bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      {/* resposive mobile start */}
      <div className="flex-1 flex justify-between sm:hidden">
        <Link
          to="/"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </Link>
        <Link
          to="/"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
      {/* resposive mobile end */}

      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {pagination.perPage * (pagination.currentPage - 1) + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {pagination.perPage * (pagination.currentPage - 1) +
                pagination.currentTotal}
            </span>{" "}
            of <span className="font-medium">{pagination.total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => handleOnClick(previousPage)}
              disabled={previousPage < 1}
              className={
                previousPage < 1
                  ? `${disableClass}  ${normalStepClass}  rounded-l-md`
                  : `${normalStepClass}  rounded-l-md`
              }
            >
              <span className="sr-only">Previous</span>
              <FaChevronLeft className="h-3 w-6" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

            {Array.from(Array(pagination.lastPage).keys()).map(
              (value, index) => {
                value += 1;
                return (
                  <button
                    key={index}
                    aria-current="page"
                    onClick={() => handleOnClick(value)}
                    className={
                      value === pagination.currentPage
                        ? `${active}`
                        : `${inactive}`
                    }
                  >
                    {value}
                  </button>
                );
              }
            )}

            {/* <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span> */}
            <button
              onClick={() => handleOnClick(nextPage)}
              disabled={nextPage > pagination.lastPage}
              className={
                nextPage > pagination.lastPage
                  ? `${disableClass}  ${normalStepClass}  rounded-r-md`
                  : `${normalStepClass}  rounded-r-md`
              }
            >
              <span className="sr-only">Next</span>
              <FaChevronRight className="h-3 w-6" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
