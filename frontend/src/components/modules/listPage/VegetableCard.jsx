import { Card, CardContent } from "@/components/ui/card";

export function VegetableCard({ name, price, image }) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          width={200}
          height={200}
          className="w-full h-40 object-cover mb-4 rounded-md"
        />
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <p className="text-green-600 font-bold">${price.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
}
