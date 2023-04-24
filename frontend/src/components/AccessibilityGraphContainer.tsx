import React, { useState } from 'react';
import AccessibilityTable, { TableData } from './AccessibilityTable';
import { Collapse, IconButton } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export interface AccessibilityGraphContainerProps {
    tableData: TableData,
    description: string
}

const AccessibilityGraphContainer: React.FC<AccessibilityGraphContainerProps> = ({ description, tableData }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div className="pb-2">
            
            <div>
                <IconButton onClick={handleClick}>
                    {open ? <ExpandMore /> : <ExpandLess />}
                </IconButton>
                <span>{tableData.caption}</span>
            </div>
            <Collapse in={open}>
                <AccessibilityTable tableData={tableData} />
                <p>{description}</p>
            </Collapse>
        </div>
    );
};

export default AccessibilityGraphContainer;
