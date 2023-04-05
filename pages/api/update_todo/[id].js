import { connectMongoDB } from "@/src/libs/mongoConnect";
import Todo from "@/src/models/todoModel";

export default async function handler(req, res) {

    if (req.method !== "PATCH") {
        res.status(405).send({ msg: "Only patch request are allowed" });
        return;
    }
    const { id } = req.query;
    const { data } = req.body;
    console.log(req.body);
    try {
        await connectMongoDB();
        const result = await Todo.findOneAndUpdate(
            { _id: id }, // Find the document with this _id field
            { todo: data }, // Update the document with this data
            { new: true } // Return the updated document instead of the original document
        );
        res.status(200).json({
            success: true,
            result: result
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error, msg: "Something went wrong" });
    }
}