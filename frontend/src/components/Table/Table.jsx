import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Table = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: 'onChange',
  });

  // console.log(data);

  // console.log(table.getHeaderGroups());

  let countPages = [];

  // useEffect(() => {
  //   for (let i = 0; i < table.getPageCount(); i++) {
  //     countPages.push(i);
  //   }
  //   // console.log(countPages);
  // }, []);

  const getCountPages = () => {
    for (let i = 0; i < table.getPageCount(); i++) {
      countPages.push(i);
    }
  };

  return (
    <>
      <div className="table" style={{ width: '100%' }}>
        {table.getHeaderGroups().map((headerGroup) => (
          <div className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <div className="th" style={{ width: header.getSize() }} key={header.id}>
                {header.column.columnDef.header}
                {/* <div
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
                className={`table-resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
              /> */}
              </div>
            ))}
          </div>
        ))}
        {table.getRowModel().rows.map((row) => (
          <div className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <div className="td" style={{ width: cell.column.getSize() }} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
      {getCountPages()}
      <ul
        className="slider-under-element pagination"
        role="navigation"
        aria-label="Pagination"
        style={countPages.length <= 1 ? { display: 'none' } : {}}
      >
        {console.log(countPages.length)}
        {console.log(countPages.length <= 1)}
        <li
          key={0}
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="slider-arrow"
        >
          <Link to={''} className="slider-arrow-text">
            {'<'}
          </Link>
        </li>
        {/* {'Page ' + (table.getState().pagination.pageIndex + 1) + ' of ' + table.getPageCount()} */}

        {Object.keys(countPages).map((i) => {
          return (
            <li
              key={i + 1}
              className={`slider-digit${
                countPages[i] === table.getState().pagination.pageIndex ? ' active' : ''
              }`}
            >
              {countPages[i] + 1}
            </li>
          );
        })}
        <li
          key={countPages.length + 1}
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className="slider-arrow"
        >
          <Link to={''} className="slider-arrow-text">
            {'>'}
          </Link>
        </li>
      </ul>
      <div></div>
    </>
  );
};
export default Table;
