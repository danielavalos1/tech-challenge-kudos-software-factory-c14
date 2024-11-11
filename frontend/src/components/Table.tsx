import React from "react";
import { twMerge } from "tailwind-merge";
interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table = ({ children, className }: TableProps) => {
  const classes = twMerge(
    "flex flex-col justify-between items-center w-full",
    className
  );
  return <div className={classes}>{children}</div>;
};

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

export const TableRowHeader: React.FC<TableRowProps> = ({
  children,
  className,
}) => {
  const classes = twMerge(
    "w-full flex flex-row overflow-x-auto py-2 px-4 rounded-t",
    className
  );
  return <div className={classes}>{children}</div>;
};

export const TableBody: React.FC<TableRowProps> = ({ children, className }) => {
  const classes = twMerge("w-full flex flex-col justify-center", className);
  return <div className={classes}>{children}</div>;
};

export const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
  const classes = twMerge(
    "w-full flex flex-row overflow-x-auto gap-2 p-2 justify-between ",
    className
  );
  return <div className={classes}>{children}</div>;
};

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export const TableCellHeader: React.FC<TableCellProps> = ({
  children,
  className,
}) => {
  const classes = twMerge(
    "bg-inherit dark:bg-gray-800 w-full text-gray-800 dark:text-white text-xl font-mono uppercase",
    className
  );
  return <div className={classes}>{children}</div>;
};

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
}) => {
  const classes = twMerge(
    "bg-white dark:bg-gray-800 w-full font-mono text-gray-800 dark:text-white flex flex-col justify-baseline",
    className
  );
  return <div className={classes}>{children}</div>;
};

Table.RowHeader = TableRowHeader;
Table.Row = TableRow;
Table.CellHeader = TableCellHeader;
Table.Cell = TableCell;
Table.Body = TableBody;

export default Table;
