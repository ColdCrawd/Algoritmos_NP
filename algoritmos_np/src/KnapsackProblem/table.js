import { Table } from 'antd';
import React from 'react'

const CommonTable = ({dataSource, loading}) => {
    const defaultColumns = [
        {
          title: 'Nombre',
          dataIndex: 'name',
          width: '30%',
          editable: true,
        },
        {
          title: 'Precio',
          dataIndex: 'value',
          editable: true,
        },
        {
          title: 'Peso',
          dataIndex: 'weight',
          editable: true,
        },
    ];

  return <Table loading={loading} dataSource={dataSource} columns={defaultColumns} />; 
}

export default CommonTable
