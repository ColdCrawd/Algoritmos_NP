import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, InputNumber, Table } from 'antd';
const EditableContext = React.createContext(null);
const EditableRow = ({form, index, ...props }) => {
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} es requirido.`,
          },
        ]}
      >
        {dataIndex === 'name' ? (<Input ref={inputRef} onPressEnter={save} onBlur={save} />): (<InputNumber ref={inputRef} onPressEnter={save} onBlur={save} min={0} />)}
        
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingInlineEnd: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const EditTable = ({dataSource, setDataSource, form}) => {

  const [count, setCount] = useState(1);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
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
    {
      title: 'Acciones',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a onClick={()=>handleDelete(record.key)}> Borrar Producto</a>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Producto ${count}`,
      value: Math.floor(Math.random() * 100) + 1,
      weight: Math.floor(Math.random() * 100) + 1,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
       row: (props) => <EditableRow {...props} form={form} />,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Agregar Producto
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};
export default EditTable;