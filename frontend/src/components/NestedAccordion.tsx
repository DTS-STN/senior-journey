import React, { useState } from 'react';
import TaskCard, { Task } from './TaskCard';

interface AccordionProps {
    sectionTitle: string;
    children: React.ReactNode
}

const Accordion: React.FC<AccordionProps> = ({ sectionTitle = "", children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4 container mx-auto">
            <div
                className="bg-[#1c578a] text-white px-4 py-2 cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{sectionTitle}</span>
                <strong>
                {isOpen ? '-' : '+'}
                </strong>
            </div>
            {isOpen && (
                <div className="border px-4 py-2">
                    {children}
                </div>
            )}
        </div>
    );
};

const AccordionInside: React.FC<Task> = (task) => {
    const [isOpenInner, setIsOpenInner] = useState(false);
    return (
        <div className="mb-4">
            <div
                className="bg-gray-400 text-black px-4 py-2 cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpenInner(!isOpenInner)}
            >
                <span>title</span>
                <strong>
                    {isOpenInner ? '-' : '+'}
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
    sectionTitle: string;
    tasks: Task[];
}

const NestedAccordion: React.FC<NestedAccordionProps> = ({ sectionTitle, tasks = [] }) => {
    return (
        <Accordion sectionTitle={sectionTitle}>
            {tasks.map((task, index) => (
                <div className="mt-4" key={task.id}>
                    <AccordionInside key={task.id} {...task} />
                </div>
            ))}

        </Accordion>
    );
};

export default NestedAccordion;
