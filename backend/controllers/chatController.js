import natural from "natural";
import FAQ from "../models/faq.js";

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// Helper function to extract keywords
const extractKeywords = (message) => {
  const tokens = tokenizer.tokenize(message.toLowerCase());
  const stopWords = new Set(["how", "to", "a", "the", "is", "in", "on", "for"]);

  return tokens
    .filter((token) => !stopWords.has(token))
    .map((token) => stemmer.stem(token));
};

export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    const userKeywords = extractKeywords(message);
    const faqs = await FAQ.find({});

    let bestMatch = null;
    let maxMatches = 0;

    faqs.forEach((faq) => {
      const matches = faq.keywords.filter((k) =>
        userKeywords.includes(k)
      ).length;

      if (
        matches > maxMatches ||
        (matches === maxMatches && faq.priority > (bestMatch?.priority || 0))
      ) {
        maxMatches = matches;
        bestMatch = faq;
      }
    });

    res.json({
      answer:
        bestMatch?.answer ||
        "Sorry, I don't understand. Please contact support.",
      keywords: userKeywords,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const addFAQ = async (req, res) => {
  try {
    const { keywords, answer, priority } = req.body;
    const newFAQ = new FAQ({ keywords, answer, priority });
    await newFAQ.save();
    res.json(newFAQ);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const bulkUploadFAQs = async (req, res) => {
  try {
    const faqs = req.body; // Expecting an array of FAQ objects

    if (!Array.isArray(faqs) || faqs.length === 0) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const newFAQs = await FAQ.insertMany(faqs);

    res.status(201).json({ message: "FAQs added successfully", data: newFAQs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


export const bulkDeleteFAQs = async (req, res) => {
  try {
    const { ids } = req.body;
    const faqs = await FAQ.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "FAQs deleted successfully", data: faqs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


export const getFAQ = async (req, res) => {
  try {
    const faqs = await FAQ.find({});
    res.json(faqs);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
