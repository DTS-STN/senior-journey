import React, { useState } from 'react';
import AccessibilityTable, { TableData } from './AccessibilityTable';
import { Collapse, IconButton } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const tableData: TableData = {
    caption: 'Enquiries',
    header: ['2008-09', '2009-10', '2010-11'],
    rows: [
      {
        id: 1,
        label: 'Enquiries',
        data: ['80,189.56', '65,297,98', '70,387.33']
      },
      {
        id: 2,
        label: 'Threshold',
        data: ['70,000.24', '70,000.24', '75,000.09']
      },
    ],
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        {open ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
      <Collapse in={open}>
        <AccessibilityTable tableData={tableData} />
      </Collapse>
    </div>
  );
};

export default App;
