const Table = ({ columns, data, handleClickRow, selectRow, type = '' }) => {
  return (
    <div className={'parent_table'}>
      <table className={`table ${type === '' ? '' : `admin-` + type}`}>
        <thead className={'table-title-background'}>
          <tr className={'table-title'}>
            {columns.map((item, i) => (
              <th>{item.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className={'table-body'}>
          {data.map((item, i) => (
            <tr
              onClick={() => handleClickRow(i, item)}
              className={`table-body-content ${selectRow === i ? 'active' : ''}`}
            >
              {columns.map((col, id) => (
                <td key={id + i} className="clamp">
                  {col.cell(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
