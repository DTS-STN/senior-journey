import React from 'react'

export interface TableData {
  caption: string
  header: string[]
  rows: {
    data: string[]
  }[]
}

interface TableProps {
  tableData: TableData
}

const AccessibilityTable: React.FC<TableProps> = ({ tableData }) => {
  return (
    <div className="w-full overflow-x-scroll">
      <table className="min-w-full table-fixed border-collapse divide-y border text-left">
        <caption className="pb-4 text-left">{tableData.caption}</caption>
        <thead className="bg-gray-surface">
          <tr className="divide-x">
            {tableData.header.map((headerItem, index) => (
              <th scope="col" key={`${index}-${headerItem}`} className="w-[150px] px-3 py-2.5">
                {headerItem}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {tableData.rows.map((row) => (
            <tr key={row.data.toString()} className="divide-x">
              {row.data.map((cellData, index) => (
                <td key={`${index}-${cellData}`} className="px-3 py-2.5">
                  {cellData}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AccessibilityTable
