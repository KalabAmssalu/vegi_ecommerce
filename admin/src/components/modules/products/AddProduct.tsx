"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect } from "react";
import {
  useFetchCategories,
  useFetchProductById,
  useSetProduct,
  useUpdateProduct,
} from "@/action/Query/product-Query/product";

// Define the form schema using zod
const formSchema = z.object({
  name: z.string().min(1, "Product Name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  price: z.union([z.string(), z.number().min(1, "Price is required")]),
  quantity: z.union([z.string(), z.number().min(1, "Quantity is required")]),
  imageUrl: z.instanceof(File).nullable(),
});

type FormDataType = z.infer<typeof formSchema>;

const AddProduct = ({ isEdit, id }: { isEdit: boolean; id?: string }) => {
  const {
    data: product,
    isLoading,
    isError,
  } = useFetchProductById(id ? id : "", isEdit);
  const { data: category } = useFetchCategories();
  const { mutate: addProduct } = useSetProduct();
  const { mutate: updateProduct } = useUpdateProduct();

  const form = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      quantity: "",
      imageUrl: null,
    },
  });

  // Update form values when product data is fetched
  useEffect(() => {
    if (product) {
      form.reset({
        name: product?.name || "",
        description: product?.description || "",
        category: product?.category || "",
        price: product?.price || "",
        quantity: product?.quantity || "",
        imageUrl: null,
      });
    }
  }, [product, form]);

  const onSubmit = (data: FormDataType) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", data.name);
    formDataToSend.append("description", data.description);
    formDataToSend.append("category", data.category.toString());
    formDataToSend.append("price", data.price.toString());
    formDataToSend.append("quantity", data.quantity.toString());
    if (data.imageUrl) {
      formDataToSend.append("imageUrl", data.imageUrl);
    }

    if (isEdit && id) {
      updateProduct({ id, data: formDataToSend }); // Update existing product
    } else {
      addProduct(formDataToSend); // Add new product
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen mx-10">
      <Card className="w-full max-h-full space-y-4 rounded-lg shadow-lg">
        <CardHeader>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-center">
              {isEdit ? "Edit" : "Add"} Product
            </h2>
            {isEdit && (
              <Button size={"sm"} variant={"destructive"}>
                Delete
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Product Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Category</FormLabel>
                      <Select
                        value={field.value} // Set value dynamically from form
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {category?.map((category: any) => (
                              <SelectItem
                                key={category._id}
                                value={category._id}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Product Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files) {
                            field.onChange(e.target.files[0]);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between gap-12">
                <Button
                  type="submit"
                  className="w-full py-2 hover:bg-yellow-400"
                >
                  {isEdit ? "Update Product" : "Add Product"}
                </Button>
                <Button
                  type="reset"
                  className="w-full py-2 hover:bg-yellow-400"
                  onClick={() => form.reset()}
                >
                  Clear
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
