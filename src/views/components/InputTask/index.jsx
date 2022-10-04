import React, { useState, useRef, useEffect } from 'react';
import styles from './index.module.scss';
import { useInput } from '../../../hooks/useInput';

const InputTask = ({ task, dispatch, taskInDrag }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editInput,] = useInput(task.title);
    const editInputRef = useRef();

    useEffect(() => {
        const node = editInputRef.current;

        if(node) {
            node.focus();
        }

    }, [isEdit]);

    const handleDone = e => {
        const isDone = e.target.checked;
        dispatch({type: 'TOGGLE_TASK_STATUS', id: task.id, isDone})
    };

    const handleEdit = () => {
        setIsEdit(true);
    };

    const handleSave = () => {
        const title = editInput.value;

        dispatch({type: 'SAVE_TASK', id: task.id, title});
        setIsEdit(false);
    };

    const handleDelete = () => {
        if (confirm("Are you sure?")) {
            dispatch({type: 'DELETE_TASK', id: task.id})
        }
    };

    const dragStartHandler = (e, task) => {
        taskInDrag.current = task;
    };

    const dragEndHandler = e => {
        e.currentTarget.style.background = '#DBE2EF';
    };

    const dragOverHandler = e => {
        e.preventDefault();
        e.currentTarget.style.background = 'white';

    }; 

    const dropHandler = (e, task) => {
        e.preventDefault();
        dispatch({
            type: 'CHANGE_ORDER',
            id: task.id,
            currentId: taskInDrag.current.id,
            order: task.order,
            currentOrder: taskInDrag.current.order
        });
        e.currentTarget.style.background = '#DBE2EF';
    };

    return (
        <div
            className={styles.inputTask}
            draggable="true"
            onDragStart={e => dragStartHandler(e, task)}
            onDragLeave={dragEndHandler}
            onDragEnd={dragEndHandler}
            onDragOver={dragOverHandler}
            onDrop={e => dropHandler(e, task)}
        >
            <label className={styles.inputTaskLabel}>
                <input
                    title={`Mark task as ${task.isDone ? 'undone' : 'done'}`}
                    type="checkbox"
                    checked={task.isDone || false}
                    onChange={handleDone}
                    className={styles.inputTaskCheckbox}
                />
                {
                    isEdit
                    ? <input ref={editInputRef} className={styles.inputTaskTitleEdit} type="text" {...editInput} />
                    : <h3 className={styles.inputTaskTitle}>{task.isDone ? <s>{task.title}</s> : task.title}</h3>
                }
            </label>
            {
                isEdit
                ? <button
                    onClick={handleSave}
                    aria-label="Save"
                    title="Save"
                    className={styles.inputTaskSave}
                />
                : <button
                    onClick={handleEdit}
                    aria-label="Edit"
                    title="Edit"
                    className={styles.inputTaskEdit}
                />
            }
            <button
                onClick={handleDelete}
                aria-label="Remove"
                title="Remove"
                className={styles.inputTaskRemove}
            />
        </div>
    );
};

export default React.memo(InputTask);