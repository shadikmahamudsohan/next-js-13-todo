import { connectMongoDB } from "@/src/libs/mongoConnect";
import Todo from "@/src/models/todoModel";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({ msg: "Only post request are allowed" });
        return;
    }
    const { todo } = req.body;

    try {
        await connectMongoDB();
        Todo.create({ todo }).then((data) => {
            console.log(data);
            res.status(201).send(data);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error, msg: "Something went wrong" });
    }
}