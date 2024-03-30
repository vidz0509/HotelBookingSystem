// import CardMenu from "components/card/CardMenu";
import React from "react";
import Card from "components/card";
import {
  useGlobalFilter,
  usePagination,
  useTable,
  useFilters,
  useSortBy,
} from "react-table";
import { Link } from "react-router-dom";
import {
  MdCheckCircle,
  MdCancel,
  MdEditSquare,
  MdDelete,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { useMemo } from "react";

const ComplexTable = (props) => {
  const { columnsData, tableData } = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const initialState = React.useMemo(() => props.initialState);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const formatDate = (date) => {
    var formattedDate = new Date(date);
    let day = formattedDate.getDate();
    let month = formattedDate.getMonth() + 1;
    let year = formattedDate.getFullYear();

    if (day < 10) {
      day = "0" + day;
    }

    if (month < 10) {
      month = `0${month}`;
    }

    let timeString = `${day} - ${month} - ${year}`;

    return timeString.toString();
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;
  // initialState.pageSize = 20;

  const deleteTableRow = (rowId) => {
    props.deleteElement(rowId);
  };

  const updateTableRow = (event, rowId) => {
    props.updateElement(rowId, event.target.checked);
  };

  function getStatus(str) {
    let status = str.split("_");
    return status;
  }

  const handleSearchChange = (e) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value); // Set the global filter value
  };

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <form className="mt-5 p-2">
        <input
          type="search"
          name="text"
          placeholder="Search Here...."
          className=" bg-white p-2 outline-none float-end"
          style={{ border: "1px solid black", width: "20%", borderRadius: "10px", }}
          value={globalFilter || ''}
          onChange={handleSearchChange}
        />
      </form>
      <div class="mt-8 overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-5 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <span className="flex">
                      <span className="text-md tracking-wide text-gray-600">
                        {column.render("Header")}
                      </span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <span>
                            <MdKeyboardArrowDown className="h-6 w-6" />
                          </span>
                        ) : (
                          <span>
                            <MdKeyboardArrowUp className="h-6 w-6" />
                          </span>
                        )
                      ) : (
                        <span>
                          <MdKeyboardArrowDown className="h-6 w-6" />
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "Status") {
                      data = (
                        <div className="flex items-center gap-2">
                          <div className={`rounded-full text-xl`}>
                            {cell.value ? (
                              <MdCheckCircle className="text-green-500" />
                            ) : (
                              <MdCancel className="text-red-500" />
                            )}
                          </div>
                          <p className="text-xl font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "Register On" || cell.column.Header === "Expired On" || cell.column.Header === "Check In" || cell.column.Header === "Check Out" ) {
                      data = (
                        <p className="text-md font-bold text-navy-700 dark:text-white">
                          {formatDate(cell.value)}
                        </p>
                      );
                    } else if (cell.column.Header === "Actions") {
                      data = (
                        <div className="action-btn-wrap flex items-center text-lg font-bold">
                          {!props.isCustomerTable && (
                            <>
                              <Link
                                to={`edit/${getStatus(cell.value)[0]}`}
                                className="action-btn"
                              >
                                <MdEditSquare className="text-navy-700" />
                              </Link>
                              <span
                                className="action-btn"
                                onClick={(e) => deleteTableRow(getStatus(cell.value)[0])}
                              >
                                <MdDelete className="text-red-700" />
                              </span>
                            </>
                          )}
                          <label class="switch">
                            <input
                              type="checkbox"
                              onClick={(e) =>
                                updateTableRow(e, getStatus(cell.value)[0])
                              }
                              defaultChecked={
                                getStatus(cell.value)[1] === "true"
                              }
                            />
                            <span class="slider round"></span>
                          </label>
                        </div>
                      );
                    } else if (cell.column.Header === "Image") {
                      cell.value ? (
                        <>
                          {Array.isArray(cell.value)
                            ? (data = (
                              <img
                                src={cell.value[0]}
                                className="table-img h-[80px] w-[80px] py-1 px-1"
                              />
                            ))
                            : (data = (
                              <img
                                src={cell.value}
                                className="table-img h-[80px] w-[80px] py-1 px-1"
                              />
                            ))}
                        </>
                      ) : (
                        (data = (
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            -
                          </p>
                        ))
                      );
                    } else if (cell.column.Header === "isOneTime") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                          {cell.value === true ? 'Yes' : 'No'}
                        </p>
                      );
                    }
                    else {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    }
                    return (
                      <td
                        className="pt-[14px] pb-[18px] sm:text-[14px] "
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination border-t border-gray-200 py-[14px]">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="btn"
          >
            {"<<"}
          </button>{" "}
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="btn"
          >
            {"<"}
          </button>{" "}
          <span className="page-str px-2">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="btn"
          >
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="btn"
          >
            {">>"}
          </button>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            className="per-page border border-gray-700 px-[10px] py-[4px]"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
};

export default ComplexTable;
