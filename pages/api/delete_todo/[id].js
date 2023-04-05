import { connectMongoDB } from "@/src/libs/mongoConnect";
import Todo from "@/src/models/todoModel";

export default async function handler(req, res) {

    if (req.method !== "DELETE") {
        res.status(405).send({ msg: "Only delete request are allowed" });
        return;
    }
    const { id } = req.query;
    try {
        await connectMongoDB();
        const result = await Todo.deleteOne({ _id: id });
        res.status(200).json({
            success: true,
            result: result
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error, msg: "Something went wrong" });
    }
}