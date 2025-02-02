import { LeafyGreen, Vegan, Citrus } from "lucide-react";
import { Vegetables, Fruits, Spices } from "../assets/images/Index";

const Catagory = [
  {
    id: 1,
    name: "Vegetables",
    Link: "/Vegitables",
    Icon: <LeafyGreen />,
    Image: Vegetables,
  },
  {
    id: 2,
    name: "Fruits",
    Link: "/Fruits",
    Icon: <Citrus />,
    Image: Fruits,
  },
  {
    id: 3,
    name: "Spices",
    Link: "/Spices",
    Icon: <Vegan />,
    Image: Spices,
  },
];
export { Catagory };
