// components/TaskCard.tsx
import ResourceTagButton from './ResourceTagButton'
import MarkDown from './MarkDown'

export interface Task {
    id: string;
    description: string;
    linkTitle: string;
    links: string;
    tags: string;
  }

interface TaskCardProps {
    showCheckbox?: boolean
    task: Task
}

const TaskCard: React.FC<TaskCardProps> = ({
    showCheckbox = false,
    task,
}) => {

const tagsArray = task.tags ? task.tags.split(" ").map(tag => tag.replace(/_/g, ' ')) : [];
    return (
        <div className="relative bg-white rounded-lg shadow-md p-6 mb-4">
            {showCheckbox && (
                <input type="checkbox" className="relative top-2 w-6 h-6 mb-4" />
            )}
            {showCheckbox && (<hr />)}
            <MarkDown content={task.description} />
            {task.linkTitle && (<h5 className="text-s pb-4">{task.linkTitle}</h5>)}
            <MarkDown content={task.links} />
            {tagsArray.map((tag, index) => (
                <ResourceTagButton key={`${task.id}-${tag}`}>{tag}</ResourceTagButton>
            ))}
        </div>
    )
}

export default TaskCard
