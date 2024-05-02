import { useState } from 'react';
import OldTable from '../Table/OldTable';
import DATA from './data';

const AdminFeedback = () => {
  const [data, setData] = useState(DATA);

  const columns = [
    {
      accessorKey: 'task',
      header: 'Task',
      size: 272,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 272,
      cell: (props) => <p>{props.getValue()?.name}</p>,
    },
    {
      accessorKey: 'due',
      header: 'Data',
      size: 272,
      cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>,
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
      size: 272,
      cell: (props) => <p>{props.getValue()}</p>,
    },
  ];
  return (
    <div>
      <OldTable data={data} columns={columns} />
    </div>
  );
};

export default AdminFeedback;
