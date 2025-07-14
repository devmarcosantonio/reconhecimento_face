import {

  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type Column,
  type Table,
} from '@tanstack/react-table';
import React from 'react';
import type { HTMLProps } from 'react';

interface TableProps<T = unknown> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  enableRowSelection?: boolean;
  onSelectRows?: (rows: T[]) => void;
  pageSize?: number;
}

function NewTable<T = unknown>({
  pageSize = 20,
  data,
  columns,
  enableRowSelection = false,
}: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    enableRowSelection: enableRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
  });

  return (
    <div className='w-full'>
      {/* Desktop Table */}
      <div className='hidden sm:block'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className='hover:bg-gray-100'>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className='px-6 py-4 whitespace-nowrap'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Table */}
      <div className='block sm:hidden'>
        {table.getRowModel().rows.length === 0 ? (
          <div className='text-center text-gray-500 py-4'>Nenhum dado encontrado.</div>
        ) : (
          <div className='flex flex-col gap-4'>
            {table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className='bg-white rounded shadow p-4 flex flex-col gap-2 border border-gray-200'
              >
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className='flex text-sm'>
                    <span className='font-semibold text-gray-700 min-w-[110px]'>
                      {typeof cell.column.columnDef.header === 'string'
                        ? cell.column.columnDef.header
                        : cell.column.id}:
                    </span>
                    <span className='ml-2 break-all'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='flex items-center gap-2 mt-2'>
        <span className='flex items-center gap-1'>
          <div>Página</div>
          <strong>
            {table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
          </strong>
        </span>

        <button
          className='border rounded p-1 disabled:opacity-50'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </button>
        <button
          className='border rounded p-1 disabled:opacity-50'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export function Filter<T>({ column, table }: { column: Column<T, unknown>; table: Table<T> }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  return typeof firstValue === 'number' ? (
    <div className='flex space-x-2'>
      <input
        type='number'
        value={((column.getFilterValue() as number[])?.[0] ?? '').toString()}
        onChange={(e) => column.setFilterValue((old: number[]) => [e.target.value, old?.[1]])}
        placeholder={`Min`}
        className='w-24 border shadow rounded'
      />
      <input
        type='number'
        value={((column.getFilterValue() as number[])?.[1] ?? '').toString()}
        onChange={(e) => column.setFilterValue((old: number[]) => [old?.[0], e.target.value])}
        placeholder={`Max`}
        className='w-24 border shadow rounded'
      />
    </div>
  ) : (
    <input
      type='text'
      value={(column.getFilterValue() ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className='w-36 border shadow rounded'
    />
  );
}

export function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return <input type='checkbox' ref={ref} className={className + ' cursor-pointer'} {...rest} />;
}

export default NewTable;
