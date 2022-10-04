import React, { useRef } from 'react';
import { useInput } from '../../../hooks/useInput';
import { generateId } from '../../../utils/generateId'

import styles from './index.module.scss';

export const InputPlus = ({dispatch}) => {
    const [taskInput, setTaskInputValue] = useInput('');
    const inputRef = useRef();

    const addTask = title => {
        dispatch({type: 'ADD_TASK', title, id: generateId()});
        setTaskInputValue('');
        inputRef.current.focus();
    };

    const handleClick = () => {
        addTask(taskInput.value)
    };

    const handleEnterKey = e => {
        if(e.key === 'Enter') {
            addTask(taskInput.value);
        }
    }

    return (
        <div className={styles.inputPlus}>
            <input
                {...taskInput}
                ref={inputRef}
                onKeyDown={handleEnterKey}
                type="text"
                className={styles.inputPlusValue}
                placeholder="Type here..."
            />
            <button
                onClick={handleClick}
                title="Add task"
                aria-label="Add"
                className={styles.inputPlusButton}
            />
        </div>
    );
}
