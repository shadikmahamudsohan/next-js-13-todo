'use client';
import styles from '../page.module.css';
import { useEffect, useState } from "react";
import Link from "next/link";
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const About = ({ params }) => {
    const { id } = params;
    const [data, setData] = useState({});
    const [todo, setTodo] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getDetails = async () => {
            const data = await fetch(`/api/get_single_todo/${id}`);
            const response = await data.json();
            setData(response.result);
            setLoading(false);
        };
        getDetails();
    }, [id]);
    const handleUpdate = async () => {
        if (todo === "") {
            return;
        }
        const data = await fetch(`/api/update_todo/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: todo })
        });
        const response = await data.json();
    };
    const handleDelete = async () => {
        const data = await fetch(`/api/delete_todo/${id}`, {
            method: "DELETE"
        });
        const response = await data.json();
        console.log(response);
    };
    return (
        <div>

            <main className={`${styles.container} ${inter.className}`}>
                <div className={styles.card}>
                    <h1 className={`${styles.title} ${inter.className}`}>Todo detail</h1>
                    {!loading ?
                        <>
                            <input onChange={(e) => {
                                setTodo(e.target.value);
                            }} type="text" defaultValue={data.todo} className={styles.yourTodo} />
                            <div className={styles.actionButton}>
                                <Link href={`/`}>
                                    <button
                                        style={{ marginRight: "10px", background: "green", color: "white" }}
                                        onClick={handleUpdate}
                                    >Update</button>
                                </Link>
                                <Link href={`/`}>
                                    <button
                                        style={{ marginRight: "10px", background: "red", color: "white" }}
                                        onClick={() => handleDelete()}
                                    >Delete</button>
                                </Link>

                            </div>
                        </>
                        : "Loading.."}
                </div>
            </main>

        </div>
    );
};

export default About;