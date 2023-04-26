import React from 'react';
import TaskCard, { Task } from './TaskCard';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface NestedAccordionProps {
    sectionTitle: string;
    subSectionTitle: string;
    tasks: Task[];
}

const NestedAccordion: React.FC<NestedAccordionProps> = ({
    sectionTitle,
    subSectionTitle,
    tasks = [],
}) => {
    return (
        <div className="mb-4 container mx-auto">
            <Accordion>
                <AccordionSummary
                    className="bg-[#00363C] text-white"
                    expandIcon={tasks.length > 0 ? <ExpandMoreIcon className="text-white" /> : null}
                >
                    <div className="flex flex-col justify-between w-full">
                        <div className="flex items-center">
                            <span>{sectionTitle}</span>
                        </div>
                        <div>
                            <span className="text-xs text-gray-400">
                                {subSectionTitle}
                            </span>
                        </div>
                    </div>
                </AccordionSummary>
                {tasks.map((task) => (
                    <Accordion key={task.id}>
                        <AccordionSummary className="bg-white"
                            expandIcon={tasks.length > 0 ? <ExpandMoreIcon /> : null}
                        >
                            <div className="flex flex-col justify-between w-full">
                                <div className="flex items-center">
                                    <span>{task.title}</span>
                                </div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TaskCard showCheckbox={false} task={task} />
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Accordion>
        </div>
    );
};

export default NestedAccordion;
