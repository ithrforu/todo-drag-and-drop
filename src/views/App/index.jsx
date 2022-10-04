import React, { useRef } from 'react';
import styles from './index.module.scss';
import { InputPlus } from '../components/InputPlus';
import InputTask from '../components/InputTask';
import { useLocalStorageReducer } from '../../hooks/useLocalStorageReducer';
import { tasksReduser } from '../../reducers/tasksReducer';
import { sortTasks } from '../../utils/sortTasks';

export const App = () => {
  const [tasks, dispatch] = useLocalStorageReducer(tasksReduser, [], 'tasks');
  const sortedTasks = tasks.sort(sortTasks);
  const taskInDrag = useRef();

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>Todos App</h1>
      <section className={styles.articleSection}>
          <InputPlus
            dispatch={dispatch}
          />
      </section>
      <section className={styles.articleSection}>
        {tasks.length <= 0 && (
          <p className={styles.articleText}>There is no one task.</p>
        )}
        {sortedTasks && sortedTasks.map((task) => (
          <InputTask
            key={task.id}
            task={task}
            dispatch={dispatch}
            taskInDrag={taskInDrag}
          />
        ))}
      </section>
    </article>
  );
}