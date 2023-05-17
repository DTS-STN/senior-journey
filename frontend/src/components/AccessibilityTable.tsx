import React from 'react'

export interface TableData {
  caption: string
  header: string[]
  rows: {
    id: number
    data: string[]
  }[]
}

interface TableProps {
  tableData: TableData
}

const AccessibilityTable: React.FC<TableProps> = ({ tableData }) => {
  return (
    <div className='overflow-x-scroll w-full'>
      <table className="min-w-full border-collapse divide-y border text-left">
        <caption className="text-left">{tableData.caption}</caption>
        <thead className="bg-gray-surface">
          <tr className="divide-x">
            {tableData.header.map((headerItem, index) => (
              <th scope="col" key={index} className="px-3 py-2.5">
                {headerItem}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {tableData.rows.map((row) => (
            <tr key={row.id} className="divide-x">
              {row.data.map((cellData, cellIndex) => (
                <td key={cellIndex} className="px-3 py-2.5">
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
