"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "@/action/axiosInstance";
import { useBulkUploadFaqsMutation } from "@/action/Query/faq-Query";

interface FAQ {
  id: string;
  keywords: string[];
  answer: string;
  priority: number;
}

const FAQForm: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: uuidv4(),
      keywords: ["order", "status"],
      answer: "You can track your order here.",
      priority: 1,
    },
    {
      id: uuidv4(),
      keywords: ["refund", "policy"],
      answer: "Refunds take 5-7 business days.",
      priority: 2,
    },
  ]);

  const handleChange = (
    id: string,
    field: keyof FAQ,
    value: string | number
  ) => {
    setFaqs((prev) =>
      prev.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq))
    );
  };

  const handleKeywordChange = (id: string, value: string) => {
    setFaqs((prev) =>
      prev.map((faq) =>
        faq.id === id
          ? { ...faq, keywords: value.split(",").map((k) => k.trim()) }
          : faq
      )
    );
  };

  const handleAddFAQ = () => {
    setFaqs([
      ...faqs,
      { id: uuidv4(), keywords: [""], answer: "", priority: 1 },
    ]);
  };

  const handleDeleteFAQ = (id: string) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  const { mutate: bulkUploadFAQs } = useBulkUploadFaqsMutation();
  const handleSubmit = async () => {
    await bulkUploadFAQs(faqs.map(({ id, ...faq }) => faq));
  };

  return (
    <div className="p-6 mx-auto bg-muted shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">FAQ Form</h2>

      {faqs.map((faq, index) => (
        <Card key={faq.id} className="p-4 mb-4 shadow-md border">
          <label className="block text-sm font-medium">
            Keywords (comma-separated)
          </label>
          <Input
            type="text"
            value={faq.keywords.join(", ")}
            onChange={(e) => handleKeywordChange(faq.id, e.target.value)}
            className="mt-1"
          />

          <label className="block mt-3 text-sm font-medium">Answer</label>
          <Input
            type="text"
            value={faq.answer}
            onChange={(e) => handleChange(faq.id, "answer", e.target.value)}
            className="mt-1"
          />

          <label className="block mt-3 text-sm font-medium">Priority</label>
          <Input
            type="number"
            value={faq.priority}
            onChange={(e) =>
              handleChange(faq.id, "priority", Number(e.target.value))
            }
            className="mt-1"
          />

          <Button
            variant="destructive"
            className="mt-3"
            onClick={() => handleDeleteFAQ(faq.id)}
          >
            Delete
          </Button>
        </Card>
      ))}

      <div className="flex gap-3 mt-4">
        <Button onClick={handleAddFAQ}>Add More</Button>
        <Button onClick={handleSubmit} variant="default">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FAQForm;
