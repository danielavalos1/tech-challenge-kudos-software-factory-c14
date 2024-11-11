import React, { useState } from "react";
import { MyResponse } from "../../types";
import Table from "../Table";
import RetryForm from "./RetryForm";
interface ListDataProps {
  data: MyResponse["data"];
}

export const ListData: React.FC<ListDataProps> = ({ data }) => {
  const [refresh, setRefresh] = useState(0);

  const handleRetrySuccess = () => {
    setRefresh((prev) => prev + 1);
    console.log(refresh);
  };

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
              <RetryForm
                key={error.row}
                error={error}
                onRetrySuccess={handleRetrySuccess}
              />
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
