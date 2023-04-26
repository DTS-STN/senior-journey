import React, { useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TaskCard, { Task } from './TaskCard';

interface AccordionProps {
    sectionTitle: string,
    subSectionTitle: string,
    children: React.ReactNode
}

const Accordion: React.FC<AccordionProps> = ({ sectionTitle = "", subSectionTitle = "", children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4 container mx-auto">
            <div
                className="bg-[#00363C] text-white  px-4 pt-6 py-2 cursor-pointer flex flex-col justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    <span>{sectionTitle}</span>
                    <div className="ml-auto">
                        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </div>
                </div>
                <div>
                    <span className="text-xs text-gray-400">{subSectionTitle}</span>
                </div>
            </div>
            {isOpen && (
                <div className="border">
                    {children}
                </div>
            )}
        </div>
    );
};

const AccordionInside: React.FC<Task> = (task) => {
    const [isOpenInner, setIsOpenInner] = useState(false);
    return (
        <div>
            <div
                className="bg-white text-black px-4 pt-6 py-2 border cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpenInner(!isOpenInner)}
            >
                <span>{task.title}</span>
                <strong>
                    {isOpenInner ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </strong>
            </div>
            {isOpenInner && (

                <TaskCard showCheckbox={false}
                    task={task} />
            )}
        </div>
    );
};



interface NestedAccordionProps {
    sectionTitle: string,
    subSectionTitle: string,
    tasks: Task[]
}

const NestedAccordion: React.FC<NestedAccordionProps> = ({ sectionTitle, subSectionTitle, tasks = [] }) => {
    return (
        <Accordion sectionTitle={sectionTitle} subSectionTitle={subSectionTitle}>
            {tasks.map((task) => (
                <div key={task.id}>
                    <AccordionInside {...task} />
                </div>
            ))}

        </Accordion>
    );
};

export default NestedAccordion;