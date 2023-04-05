'use client';
import { useState } from 'react';
import styles from '../page.module.css';

const InputFiled = ({ setRefresh, refresh }) => {
    const [disable, setDisable] = useState(false);
    const handleSubmit = async (todo) => {
        setDisable(true);
        const response = await fetch('/api/create_todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ todo })
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setRefresh(refresh + 1);
        setDisable(false);
    };

    return (
        <>
            <input disabled={disable} type="text" placeholder='your todo...' className={styles.yourTodo}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit(e.target.value);
                        e.target.value = "";
                    }
                }}
            />
        </>
    );
};

export default InputFiled;