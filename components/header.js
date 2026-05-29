"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function Header() {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Initial load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);



  // Listen for cart updates
  useEffect(() => {
    const loadCart = () => {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(stored);
    };
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const handleDelete = (indexToDelete) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToDelete);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("The item deleted successfully!");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

  const handleOrderSubmit = ()=>{
       toast.success("Order Placed Successfully!")
  }
  return (
    <div className="text-white flex justify-between items-center px-4 py-3">
      <Link href="/" className="text-2xl font-bold">
        🍔 PizzaHub
      </Link>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Cart 🛒 ({cartItems.length})</Button>
        </DialogTrigger>

        <DialogContent className="bg-black text-white border border-white">
          <DialogHeader>
            <DialogTitle>Your Cart</DialogTitle>
            <DialogDescription>
              A summary of what you’ve added so far.
            </DialogDescription>

            <div className="max-h-96 overflow-y-auto mt-4 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500">Your cart is empty.</div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} className="bg-gray-900 my-3 py-4 px-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-white">Pizza: {item.name}</span>
                        <div className="text-sm text-muted-foreground">
                          Size: {item.size} - ₹{item.unitPrice}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(index)}
                      >
                        <Trash2 className="text-red-500 h-6 w-6" />
                      </Button>
                    </div>
                    <div className="mt-2">
                      <div className="text-sm text-blue-400">Quantity: {item.quantity}</div>
                      <div className="text-sm text-red-400">Total: ₹{item.totalPrice}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 text-lg font-bold text-right">
              Total: ₹{totalAmount}
            </div>

            <Button
              className="text-white font-medium text-sm bg-blue-600 hover:bg-blue-700 mt-4 w-full"
              onClick={() => setCheckoutOpen(true)}
            >
              Proceed to Checkout
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="bg-gray-900 text-white w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Complete Your Order</DialogTitle>
            <DialogDescription>
              Please fill in your details to place the order.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4 mt-4">
            <div className="flex flex-col">
              <label htmlFor="fullName" className="font-medium">
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="border rounded px-3 py-2"
                placeholder="Enter your full name"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="border rounded px-3 py-2"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="address" className="font-medium">
                Delivery Address *
              </label>
              <textarea
                id="address"
                name="address"
                required
                className="border rounded px-3 py-2 h-24"
                placeholder="Enter your complete delivery address"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setCheckoutOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleOrderSubmit} type="submit" className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white">
                Place Order
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

