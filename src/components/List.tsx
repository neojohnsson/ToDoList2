
import { useState } from 'react'
import supabase from '../utils/supabase'
import { useNavigate } from 'react-router-dom'

function List() {

    const [ tasks, setTasks ] = useState<{ id: number, task: string}[]>([]);
    const [ task, setTask ] = useState('');
    const navigate = useNavigate();

    async function getTasks() {
        const { data, error } = await supabase.from('tasks').select()
        if ( error ) throw new Error(error.message);
        setTasks(data);
    }

    async function addTask() {
        if (!task.trim()) return;
        const { error } = await supabase.from('tasks').insert({ text: task })
        if ( error ) throw new Error(error.message);
        await getTasks();
    }

    async function removeTask( id : number ) {
        const { error } = await supabase.from('tasks').delete().eq('id', id);
        if ( error ) throw new Error(error.message);
        await getTasks();
    }

    async function handleSignOut() {
        await supabase.auth.signOut();
        navigate('/');
    }

    return (
        <div>
            <div>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
            <div>
                <input 
                    value={task} 
                    onKeyDown={(e) => e.key === 'Enter' && addTask()} 
                    onChange={(e) => setTask(e.target.value)} 
                    type="text"/>
                <button>Add Task</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li onClick={() => removeTask(task.id)} key={task.id}>
                        {task.task}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default List