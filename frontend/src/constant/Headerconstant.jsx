import { elephant } from "../assets/images/Index";
import { House, Salad, UserPen, UserPlus, UsersRound } from "lucide-react";
const menu = [
  {
    id: 1,
    name: "Home",
    Link: "/",
    //Icon: <House />,
  },
  {
    id: 2,
    name: "Product",
    Link: "/product",
    // Icon: <Salad />,
  },

  {
    id: 3,
    name: "Account",
    Link: "/signUp",
    Icon: <UserPen />,
  },

  {
    id: 4,
    name: "Aboutus",
    Link: "/aboutus",
    //Icon: <UserPen />,
  },
];

export { menu };
