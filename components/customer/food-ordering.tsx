"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, CreditCard, Wallet, Clock, Check, Ticket } from "lucide-react"
import { TokenGeneratorDialog } from "@/components/queue/token-generator-dialog"

// Sample cart items
const cartItems = [
  {
    id: 1,
    name: "Garden Fresh Salad",
    price: "$8.99",
    quantity: 1,
  },
  {
    id: 2,
    name: "Grilled Chicken Sandwich",
    price: "$12.99",
    quantity: 1,
  },
  {
    id: 3,
    name: "Fresh Fruit Smoothie",
    price: "$5.99",
    quantity: 2,
  },
]

export function FoodOrdering() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showTokenDialog, setShowTokenDialog] = useState(false)
  const [token, setToken] = useState("")

  const subtotal = cartItems.reduce((total, item) => {
    const price = Number.parseFloat(item.price.replace("$", ""))
    return total + price * item.quantity
  }, 0)

  const tax = subtotal * 0.08
  const total = subtotal + tax

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      setToken(`TKN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`)
      setShowTokenDialog(true)
    }, 2000)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Your Order</CardTitle>
            <CardDescription>Review your items before checkout.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} × {item.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${(Number.parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <Label htmlFor="special-instructions" className="mb-2">
              Special Instructions
            </Label>
            <Textarea
              id="special-instructions"
              placeholder="Any special requests or dietary requirements?"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full"
            />
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Estimated Pickup Time</CardTitle>
            <CardDescription>When your order will be ready.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-lg font-medium">15-20 minutes</p>
                <p className="text-sm text-muted-foreground">Current wait time at Campus Cafeteria</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>Complete your order by providing payment information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-4 w-4" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                        <Wallet className="h-4 w-4" />
                        UPI Payment
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Label htmlFor="wallet" className="flex items-center gap-2 cursor-pointer">
                        <Ticket className="h-4 w-4" />
                        Meal Card
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name on Card</Label>
                      <Input id="name" placeholder="John Smith" />
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upi-id">UPI ID</Label>
                      <Input id="upi-id" placeholder="yourname@upi" />
                    </div>
                  </div>
                )}

                {paymentMethod === "wallet" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="meal-card">Meal Card Number</Label>
                      <Input id="meal-card" placeholder="MC12345678" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pin">PIN</Label>
                      <Input id="pin" type="password" placeholder="****" />
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isProcessing || isSuccess}>
                  {isProcessing ? (
                    <>Processing...</>
                  ) : isSuccess ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Order Placed
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" /> Place Order
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {showTokenDialog && (
        <TokenGeneratorDialog token={token} open={showTokenDialog} onClose={() => setShowTokenDialog(false)} />
      )}
    </div>
  )
}
