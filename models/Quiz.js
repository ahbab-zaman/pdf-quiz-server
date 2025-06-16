import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  diagram: String,
});

const quizSchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
