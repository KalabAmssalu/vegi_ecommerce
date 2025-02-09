"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useDeleteFAQMutation, useGetFaqsQuery } from "@/action/Query/faq-Query";

interface FAQ {
  _id: string;
  keywords: string[];
  answer: string;
  priority: number;
}

const FAQTable = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { data: faqData, isLoading } = useGetFaqsQuery();
  const { mutate: deleteFAQ } = useDeleteFAQMutation();

  // Toggle selection
  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  // Delete selected FAQs
  const deleteSelected = () => {
    const selectedIds = Array.from(selected);
    deleteFAQ(selectedIds);
    setSelected(new Set()); // Clear selection
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <p>Loading FAQs...</p>
      ) : faqData?.length ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">Select</TableHead>
                <TableHead>Keywords</TableHead>
                <TableHead>Answer</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqData.map((faq: FAQ) => (
                <TableRow key={faq._id}>
                  <TableCell>
                    <Checkbox
                      checked={selected.has(faq._id)}
                      onCheckedChange={() => toggleSelect(faq._id)}
                    />
                  </TableCell>
                  <TableCell>{faq.keywords.join(", ")}</TableCell>
                  <TableCell>{faq.answer}</TableCell>
                  <TableCell>{faq.priority}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {selected.size > 0 && (
            <Button
              onClick={deleteSelected}
              className="mt-4 bg-red-500 hover:bg-red-600"
            >
              Delete Selected
            </Button>
          )}
        </>
      ) : (
        <p>No FAQs found.</p>
      )}
    </div>
  );
};

export default FAQTable;
