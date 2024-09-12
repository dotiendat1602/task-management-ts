import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    status: String,
    content: String,
    timeStart: Date,
    timeFinish: Date,
    createdBy: String,
    listUser: Array,
    parentId: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, {
    timestamps: true 
    // Tự động thêm trường createdAt và updatedAt (https://mongoosejs.com/docs/timestamps.html)
});

const Task = mongoose.model('Task', taskSchema, "tasks");

export default Task;