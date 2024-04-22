import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

const Table = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
  });

  // console.log(data);

  // console.log(table.getHeaderGroups());

  return (
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
  );
};
export default Table;
