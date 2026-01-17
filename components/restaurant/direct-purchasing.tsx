"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, Filter } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample produce data
const produceData = [
  {
    id: 1,
    name: "Organic Tomatoes",
    farmer: "Green Valley Farms",
    farmerAvatar: "GV",
    category: "Vegetables",
    quantity: "250 kg",
    price: "$3.50/kg",
    freshness: "Fresh",
    expiry: "7 days",
    distance: "15 km",
  },
  {
    id: 2,
    name: "Red Apples",
    farmer: "Sunshine Organics",
    farmerAvatar: "SO",
    category: "Fruits",
    quantity: "180 kg",
    price: "$2.75/kg",
    freshness: "Fresh",
    expiry: "14 days",
    distance: "22 km",
  },
  {
    id: 3,
    name: "Carrots",
    farmer: "Fresh Fields",
    farmerAvatar: "FF",
    category: "Vegetables",
    quantity: "320 kg",
    price: "$1.80/kg",
    freshness: "Fresh",
    expiry: "10 days",
    distance: "8 km",
  },
  {
    id: 4,
    name: "Spinach",
    farmer: "Nature's Bounty",
    farmerAvatar: "NB",
    category: "Leafy Greens",
    quantity: "120 kg",
    price: "$4.20/kg",
    freshness: "Very Fresh",
    expiry: "5 days",
    distance: "12 km",
  },
  {
    id: 5,
    name: "Potatoes",
    farmer: "Harvest Moon",
    farmerAvatar: "HM",
    category: "Root Vegetables",
    quantity: "500 kg",
    price: "$1.50/kg",
    freshness: "Fresh",
    expiry: "30 days",
    distance: "18 km",
  },
  {
    id: 6,
    name: "Strawberries",
    farmer: "Green Valley Farms",
    farmerAvatar: "GV",
    category: "Berries",
    quantity: "75 kg",
    price: "$6.00/kg",
    freshness: "Very Fresh",
    expiry: "4 days",
    distance: "15 km",
  },
]

export function DirectPurchasing() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [cart, setCart] = useState<{ id: number; name: string; quantity: number; price: string }[]>([])

  // Extract unique categories
  const categories = Array.from(new Set(produceData.map((item) => item.category)))

  const filteredProduce = produceData.filter(
    (produce) =>
      produce.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.length === 0 || selectedCategories.includes(produce.category)),
  )

  const addToCart = (id: number, name: string, price: string) => {
    const existingItem = cart.find((item) => item.id === id)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { id, name, quantity: 1, price }])
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Direct Purchasing</CardTitle>
              <CardDescription>Purchase fresh produce directly from local farmers.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search produce..."
                  className="pl-8 w-full md:w-[200px] lg:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  {categories.map((category) => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategories([...selectedCategories, category])
                        } else {
                          setSelectedCategories(selectedCategories.filter((c) => c !== category))
                        }
                      }}
                    >
                      {category}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Freshness</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProduce.map((produce) => (
                <TableRow key={produce.id}>
                  <TableCell className="font-medium">{produce.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg" alt={produce.farmer} />
                        <AvatarFallback className="text-xs">{produce.farmerAvatar}</AvatarFallback>
                      </Avatar>
                      <span>{produce.farmer}</span>
                    </div>
                  </TableCell>
                  <TableCell>{produce.price}</TableCell>
                  <TableCell>
                    <Badge variant={produce.freshness === "Very Fresh" ? "success" : "default"}>
                      {produce.freshness}
                    </Badge>
                  </TableCell>
                  <TableCell>{produce.distance}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToCart(produce.id, produce.name, produce.price)}
                    >
                      <ShoppingCart className="mr-1 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shopping Cart</CardTitle>
          <CardDescription>Your selected items for bulk purchase.</CardDescription>
        </CardHeader>
        <CardContent>
          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} × {item.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => {
                        if (item.quantity > 1) {
                          setCart(
                            cart.map((cartItem) =>
                              cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
                            ),
                          )
                        } else {
                          setCart(cart.filter((cartItem) => cartItem.id !== item.id))
                        }
                      }}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        setCart(
                          cart.map((cartItem) =>
                            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
                          ),
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>$1,234.56</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Delivery Fee</span>
                  <span>$45.00</span>
                </div>
                <div className="flex justify-between font-medium mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>$1,279.56</span>
                </div>
              </div>

              <Button className="w-full mt-4">Proceed to Checkout</Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Add items from the produce list to start your bulk order.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
