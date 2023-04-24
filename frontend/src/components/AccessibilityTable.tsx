
import React from 'react';

export interface TableData {
    caption: string,
    header: string[],
    rows: {
        id: number,
        label: string,
        data: string[]
    }[]
}


interface TableProps {
    tableData: TableData;
}

const AccessibilityTable: React.FC<TableProps> = ({ tableData }) => {
    return (
        <table>
            <caption>{tableData.caption}</caption>
            <thead>
                <tr>
                    <th></th>
                    {tableData.header.map((headerItem, index) => (
                        <th key={index}>{headerItem}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableData.rows.map((row, rowIndex) => (
                    <tr key={row.id}>
                        <th> {row.label} </th>
                        {row.data.map((cellData, cellIndex) => (
                            <td key={cellIndex}>{cellData}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AccessibilityTable;
