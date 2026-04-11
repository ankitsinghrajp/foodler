"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import pizzaDiamondJson from "../data/pizzaDiamond.json";
import { toast } from "sonner";

const PizzaDiamond = () => {
  const [cartState, setCartState] = useState(
    pizzaDiamondJson.map((pizza) => ({
      name: pizza.name,
      selectedSize: "Personal",
      quantity: 1,
      unitPrice: pizza.personal,
    }))
  );

  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    location: "Indore",
  };

  const updateSize = (index, size, price) => {
    const updated = [...cartState];
    updated[index].selectedSize = size;
    updated[index].unitPrice = price;
    setCartState(updated);
  };

  const updateQuantity = (index, delta) => {
    const updated = [...cartState];
    const newQty = updated[index].quantity + delta;
    if (newQty >= 1) {
      updated[index].quantity = newQty;
      setCartState(updated);
    }
  };

  const handleAddToCart = (index) => {
    const item = cartState[index];
    const original = pizzaDiamondJson[index];
    const total = item.unitPrice * item.quantity;

    const cartItem = {
      name: item.name,
      size: item.selectedSize,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: total,
      ingredients: original.ingredients || [],
      time: new Date().toLocaleString(),
      userEmail: user.email,
      userName: user.name,
      userLocation: user.location,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || []; if (!Array.isArray(existingCart)) { throw new Error('Invalid cart data'); }
    existingCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    // 🔔 dispatch update event so Header reloads immediately
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success("The item successfully added to cart");
  };

  return (
    <div className="pt-20 pb-10">
      <div className="flex justify-center items-center border-b-2 pb-4 border-dotted">
        <div>
          <h3 className="font-bold text-center text-3xl text-orange-700">
            Pizza Diamond
          </h3>
          <h4 className="text-muted-foreground text-center font-medium">
            Perfect for beginners classic flavours to start your journey
          </h4>
        </div>
      </div>

      <div className="border-b-2 border-dotted">
        <div className="container mx-auto">
          <div className="grid gap-5 my-20 px-4 grid-cols-1 md:grid-cols-3">
            {pizzaDiamondJson.map((pizza, index) => {
              const state = cartState[index];
              const total = state.unitPrice * state.quantity;

              return (
                <Card key={pizza.name} className="bg-gray-950/80">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold mb-2">
                      {pizza.name}
                    </CardTitle>
                    <CardDescription>
                      <Badge
                        variant="outline"
                        className="bg-orange-500 text-white text-sm"
                      >
                        Pizza Diamond
                      </Badge>
                    </CardDescription>
                    <div className="flex items-center gap-2 flex-wrap mt-2">
                      {pizza.ingredients?.map((i) => (
                        <p
                          className="text-sm font-medium text-muted-foreground"
                          key={i}
                        >
                          {i}
                        </p>
                      ))}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-medium">Personal</h2>
                        <p className="text-xl text-orange-400">
                          ₹ {pizza.personal}
                        </p>
                      </div>
                      <div>
                        <h2 className="text-xl font-medium">Medium</h2>
                        <p className="text-xl text-orange-400">
                          ₹ {pizza.medium}
                        </p>
                      </div>
                    </div>

                    <div className="py-3">
                      <h2 className="text-md text-muted-foreground font-medium">
                        Size
                      </h2>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="border-2 rounded-md cursor-pointer flex items-center mt-2 justify-between px-4 w-full py-2 gap-2 border-gray-400">
                          {state.selectedSize} <ChevronDown />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-950">
                          <DropdownMenuItem
                            onClick={() =>
                              updateSize(index, "Personal", pizza.personal)
                            }
                          >
                            Personal - ₹ {pizza.personal}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateSize(index, "Medium", pizza.medium)
                            }
                          >
                            Medium - ₹ {pizza.medium}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex justify-between px-2 mt-2">
                      <h2>Quantity</h2>
                      <div className="flex gap-4 items-center justify-center">
                        <span
                          className="text-xl select-none hover:text-2xl cursor-pointer"
                          onClick={() => updateQuantity(index, -1)}
                        >
                          –
                        </span>
                        <span className="text-2xl select-none">
                          {state.quantity}
                        </span>
                        <span
                          className="text-xl select-none hover:text-2xl cursor-pointer"
                          onClick={() => updateQuantity(index, 1)}
                        >
                          +
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className="bg-green-600 w-full cursor-pointer hover:bg-green-700 text-white font-semibold"
                      onClick={() => handleAddToCart(index)}
                    >
                      Add to Cart — ₹ {total}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaDiamond;
