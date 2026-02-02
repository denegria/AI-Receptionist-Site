import React from 'react';
import { cn } from '@/lib/utils';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DataTable<T>({ columns, data, onRowClick, className }: DataTableProps<T>) {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y border-slate-200">
          <tr>
            {columns.map((column, idx) => (
              <th key={idx} className={cn('px-6 py-3 font-semibold', column.className)}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.length > 0 ? (
            data.map((item, rowIdx) => (
              <tr
                key={rowIdx}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  'bg-white hover:bg-slate-50 transition-colors',
                  onRowClick && 'cursor-pointer'
                )}
              >
                {columns.map((column, colIdx) => (
                  <td key={colIdx} className={cn('px-6 py-4 text-slate-700', column.className)}>
                    {typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : (item[column.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-10 text-center text-slate-400">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
