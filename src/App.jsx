import "./App.css";
import { useState, useRef } from 'react';

function App() {
    const [todoList, setTodoList] = useState([]);
    const [currentTask, setCurrentTask] = useState("");
    const inputTask = useRef(null);

    const removeTask = (key) => {
        let arrCopy = [...todoList];
        arrCopy.splice(key, 1);
        setTodoList(arrCopy);
    };

    const toggleTask = (key) => {
        let arrCopy = [...todoList];
        arrCopy[key] = { ...arrCopy[key], completed: !arrCopy[key]?.completed };
        setTodoList(arrCopy);
    };

    const addTask = () => {
        setTodoList([...todoList, { text: currentTask, completed: false }]);
        inputTask.current.value = "";
        setCurrentTask("");
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    };

    return (
        <div className={"App"}>
            <h1> To Do List </h1>
            <div>
                <input
                    ref={inputTask}
                    type="text"
                    placeholder="Task..."
                    onChange={(event) => {
                        setCurrentTask(event.target.value);
                    }}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={addTask}> Add Task </button>
            </div>
            <hr />
            <ul>
                {todoList.map((task, key) => (
                    <div id="task" key={key} className={task.completed ? 'completed' : ''}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(key)}
                        />
                        <li className={task.completed ? 'taskCompleted' : ''}>{task.text}</li>
                        <button onClick={() => removeTask(key)}>
                            <img src={"trash.png"} style={{ width: '15px', height: '20px' }} alt="Trash Icon" />
                        </button>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default App;
