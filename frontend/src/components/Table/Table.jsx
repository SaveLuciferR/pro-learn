const Table = ({ columns, data, handleClickRow, selectRow }) => {

    return (
        <div className={"parent_table"}>
            <table className={'table'}>
                <thead className={"table-title-background"}>
                    <tr className={"table-title"}>
                        {columns.map((item, i) => <th>{item.header}</th>)}
                    </tr>
                </thead>
                <tbody className={'table-body'}>
                    {data.map((item, i) =>
                        <tr onClick={() => handleClickRow(i, item)} className={`table-body-content ${selectRow === i ? 'active' : ''}`}>
                            {columns.map((col, id) => <td key={id + i}>{col.cell(item)}</td>)}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;