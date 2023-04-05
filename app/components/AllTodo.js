'use client';

import { useEffect, useState } from 'react';
import styles from '../page.module.css';
import Link from "next/link";

const AllTodo = ({ refresh }) => {
    const [todoData, setTodoData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            const response = await fetch('/api/get_todo');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const todoData = await response.json();
            setTodoData(todoData);
            setLoading(false);
        };
        getData();
    }, [refresh]);
    return (
        <div>
            {!loading ? <>
                {todoData?.result?.map(({ _id, todo }) => (
                    <div key={_id} className={styles.todo}>
                        <p>{todo}</p>
                        <div>
                            <Link href={`/${_id}`}>
                                <button>Open</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </> : "loading..."}
        </div>
    );
};

export default AllTodo;