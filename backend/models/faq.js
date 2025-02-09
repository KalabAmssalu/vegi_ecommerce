import mongoose from "mongoose";
import natural from "natural";
const stemmer = natural.PorterStemmer;

const FAQSchema = new mongoose.Schema({
  keywords: [String],
  answer: String,
  priority: { type: Number, default: 0 },
});

// Pre-process keywords before saving
FAQSchema.pre("save", function (next) {
  const stemmedKeywords = this.keywords.map((k) =>
    stemmer.stem(k.toLowerCase().trim())
  );
  this.keywords = [...new Set(stemmedKeywords)]; // Remove duplicates
  next();
});

const FAQ = mongoose.model("FAQ", FAQSchema);

export default FAQ;
