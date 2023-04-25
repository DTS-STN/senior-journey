// components/TaskCard.tsx
import Chip from '@mui/material/Chip';
import MarkDown from './MarkDown'

export interface Task {
    "id": number,
    "display-order": number,
    "answer-key": string,
    "is-time-sensitive": boolean,
    "title": string,
    "description": string,
    "link-title": string,
    "links": string,
    "tag": string
}

interface TaskCardProps {
    showCheckbox?: boolean
    task: Task
}

const TaskCard: React.FC<TaskCardProps> = ({
    showCheckbox = false,
    task,
}) => {
    return (
        <div className="relative bg-white rounded-lg shadow-md p-6 mb-4">
            {showCheckbox && (
                <input type="checkbox" className="relative top-2 w-6 h-6 mb-4" />
            )}
            {showCheckbox && (<hr />)}
            <MarkDown content={task.description} />
            {task['link-title'] && (<h5 className="text-s pb-4">{task['link-title']}</h5>)}
            <MarkDown content={task.links} />
            <Chip label={task.tag} />
        </div>
    )
}

export default TaskCard