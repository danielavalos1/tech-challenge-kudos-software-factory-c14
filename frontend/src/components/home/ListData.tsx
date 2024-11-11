// components/MyResponseTable.tsx

import React from "react";
import { MyResponse } from "../../types";
import Table from "../Table";
import Form from "../Form";

interface ListDataProps {
  data: MyResponse["data"];
}

export const ListData: React.FC<ListDataProps> = ({ data }) => {
  console.log(data);
  if (!data) return null;
  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      {/* First Row */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Success Count
        </h2>
        <p className="text-2xl text-green-500">{data.successCount}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Failed Count
        </h2>
        <p className="text-2xl text-red-500">{data.failedCount}</p>
      </div>
      <div className="col-span-2">
        <Table>
          <Table.RowHeader className="bg-slate-200">
            <Table.CellHeader>
              <p>Row</p>
            </Table.CellHeader>
            <Table.CellHeader>Name</Table.CellHeader>
            <Table.CellHeader>Email</Table.CellHeader>
            <Table.CellHeader>Age</Table.CellHeader>
          </Table.RowHeader>
          <Table.Body>
            {data.errors.map((error) => (
              <Form key={error.row} onSubmit={() => {}}>
                <Table.Row>
                  <Table.Cell>{error.row}</Table.Cell>
                  <Table.Cell>
                    <Form.Input
                      type="text"
                      name="name"
                      value={error.record.name}
                      id="name"
                      onChange={() => {}}
                      error={error.details.name?.error}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Form.Input
                      type="text"
                      name="email"
                      value={error.record.email}
                      id="email"
                      onChange={() => {}}
                      error={error.details.email?.error}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Form.Input
                      type="number"
                      name="age"
                      value={error.record.age || 0}
                      id="age"
                      onChange={() => {}}
                      error={error.details.age?.error}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Form.Button>Retry</Form.Button>
                  </Table.Cell>
                </Table.Row>
              </Form>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
