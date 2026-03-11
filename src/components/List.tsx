
// import { useEffect } from 'react'
import supabase from '../utils/supabase'
import { useNavigate } from 'react-router-dom'
import './css/List.css'
import useTasks from '../hooks/useTasks'
import { useState } from 'react'


function List() {

    // const { tasks, task, setTask, getTasks, addTask, removeTask, loading, error } = useTasks();
    const { tasks, isLoading, error, addTask, removeTask } = useTasks();
    const navigate = useNavigate();
    const [ task, setTask ] = useState('');

    async function handleSignOut() {
        await supabase.auth.signOut();
        navigate('/');
    }

    function handleAdd(){
        if (!task.trim()) return;
        addTask.mutate(task, { onSuccess: () => setTask('')});
    }

    return (
        <div className="list-container">
            <div className="list-header">
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
            <div className="list-input-row">
                <input
                    value={task}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add a task..."
                    type="text"/>
                <button onClick={handleAdd}>Add</button>
            </div>
            { error ? (
                <p>Failed to load tasks</p>
            ) : isLoading ? (
                <p>loading...</p>
            ) : (
                <ul>
                    {tasks.map((x) => (
                        <li className='listItems' onClick={() => removeTask.mutate(x.id)} key={x.id}>
                            {x.task}
                        </li>
                    ))}
                </ul>
            )}
            
        </div>
    );
}

export default List