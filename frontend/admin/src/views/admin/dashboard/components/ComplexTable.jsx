// import CardMenu from "components/card/CardMenu";
import React from "react";
import Card from "components/card";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { Link } from "react-router-dom";
import { MdCheckCircle, MdCancel, MdEditSquare, MdDelete } from "react-icons/md";
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
      initialState
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // const{
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   prepareRow,
  //   page,
  //   canPreviousPage,
  //   canNextPage,
  //   pageOptions,
  //   pageCount,
  //   gotoPage,
  //   nextPage,
  //   previousPage,
  //   setPageSize,
  //   state: { pageIndex, pageSize }
  // } = useTable(
  //   {
  //     columns,
  //     data,
  //     initialState
  //   },
  //   usePagination
  // );

  const formatDate = (date) => {
    var formattedDate = new Date(date);
    let day = formattedDate.getDate();
    let month = (formattedDate.getMonth()) + 1;
    let year = formattedDate.getFullYear();

    if (day < 10) {
      day = '0' + day;
    }

    if (month < 10) {
      month = `0${month}`;
    }

    let timeString = `${day} - ${month} - ${year}`;

    return timeString.toString();
  }

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
    state: { pageIndex, pageSize }
  } = tableInstance;
  // initialState.pageSize = 20;

  const deleteTableRow = (rowId) => {
    props.deleteElement(rowId);
  }

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div class="mt-8 overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <p className="text-md tracking-wide text-gray-600">
                      {column.render("Header")}
                    </p>
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
                    } else if (cell.column.Header === "Register On") {
                      data = (
                        <p className="text-md font-bold text-navy-700 dark:text-white">
                          {formatDate(cell.value)}
                        </p>
                      );
                    } else if (cell.column.Header === "Actions") {
                      data = (
                        <div className="text-lg font-bold flex action-btn-wrap">
                          <Link to={`edit/${cell.value}`} className="action-btn">
                            <MdEditSquare className="text-navy-700" />
                          </Link>
                          <span className="action-btn" onClick={(e) => deleteTableRow(cell.value)}><MdDelete className="text-red-700" /></span>
                          <label class="switch">
                            <input type="checkbox"></input>
                             <span class="slider round"></span>
                            </label>
                        </div>
                      );
                    } else {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    }
                    return (
                      <td
                        className="pt-[14px] pb-[18px] sm:text-[14px]"
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
        <div className="border-t pagination py-[14px] border-gray-200">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="btn">
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn">
            {"<"}
          </button>{" "}
          <span className="page-str px-2">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage} className="btn">
            {">"}
          </button>{" "}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="btn">
            {">>"}
          </button>{" "}

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            className="border border-gray-700 px-[10px] py-[4px] per-page"
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
