"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, ShoppingCart, Clock, Star, Info } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample menu categories
const categories = ["All", "Main Courses", "Sides", "Desserts", "Beverages", "Specials"]

// Sample menu items
const menuItemsData = [
  {
    id: 1,
    name: "Garden Fresh Salad",
    category: "Main Courses",
    price: "$8.99",
    description: "Fresh mixed greens with seasonal vegetables and house dressing",
    prepTime: "10 min",
    calories: 120,
    rating: 4.5,
    tags: ["vegetarian", "healthy", "gluten-free"],
    image: "/placeholder.svg?height=200&width=300",
    allergens: ["nuts"],
    popular: true,
  },
  {
    id: 2,
    name: "Grilled Chicken Sandwich",
    category: "Main Courses",
    price: "$12.99",
    description: "Grilled chicken breast with lettuce, tomato, and mayo on a brioche bun",
    prepTime: "15 min",
    calories: 450,
    rating: 4.2,
    tags: ["protein", "popular"],
    image: "/placeholder.svg?height=200&width=300",
    allergens: ["gluten", "eggs"],
    popular: true,
  },
  {
    id: 3,
    name: "Chocolate Brownie",
    category: "Desserts",
    price: "$6.99",
    description: "Rich chocolate brownie with a scoop of vanilla ice cream",
    prepTime: "5 min",
    calories: 380,
    rating: 4.8,
    tags: ["sweet", "popular"],
    image: "/placeholder.svg?height=200&width=300",
    allergens: ["gluten", "dairy", "eggs"],
    popular: true,
  },
  {
    id: 4,
    name: "Fresh Fruit Smoothie",
    category: "Beverages",
    price: "$5.99",
    description: "Blend of seasonal fruits with yogurt and honey",
    prepTime: "5 min",
    calories: 220,
    rating: 4.3,
    tags: ["healthy", "refreshing"],
    image: "/placeholder.svg?height=200&width=300",
    allergens: ["dairy"],
    popular: false,
  },
  {
    id: 5,
    name: "Crispy French Fries",
    category: "Sides",
    price: "$4.99",
    description: "Golden crispy fries seasoned with sea salt",
    prepTime: "8 min",
    calories: 320,
    rating: 4.0,
    tags: ["crispy", "popular"],
    image: "/placeholder.svg?height=200&width=300",
    allergens: [],
    popular: true,
  },
  {
    id: 6,
    name: "Vegetable Stir Fry",
    category: "Main Courses",
    price: "$11.99",
    description: "Mixed vegetables and tofu stir-fried with soy sauce and ginger",
    prepTime: "12 min",
    calories: 380,
    rating: 4.1,
    tags: ["vegetarian", "healthy"],
    image: "/placeholder.svg?height=200&width=300",
    allergens: ["soy"],
    popular: false,
  },
  {
    id: 7,
    name: "Seasonal Fruit Tart",
    category: "Desserts",
    price: "$7.99",
    description: "Buttery pastry filled with seasonal fruits and custard",
    prepTime: "5 min",
    calories: 290,
    rating: 4.6,
    tags: ["sweet", "seasonal"],
    image: "/placeholder.svg?height=200&width=300",
    allergens: ["gluten", "dairy", "eggs"],
    popular: false,
  },
  {
    id: 8,
    name: "Iced Coffee",
    category: "Beverages",
    price: "$3.99",
    description: "Cold brewed coffee served over ice with optional cream and sugar",
    prepTime: "3 min",
    calories: 120,
    rating: 4.4,
    tags: ["refreshing", "caffeinated"],
    image: "/placeholder.svg?height=200&width=300",
    allergens: ["dairy"],
    popular: true,
  },
  {
    id: 9,
    name: "Chef's Special Pasta",
    category: "Specials",
    price: "$14.99",
    description: "Today's special pasta with seasonal ingredients",
    prepTime: "18 min",
    calories: 520,
    rating: 4.7,
    tags: ["chef's choice", "limited"],
    image: "/placeholder.svg?height=200&width=300",
    allergens: ["gluten", "dairy"],
    popular: false,
  },
]

export function MenuBrowsing() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [cart, setCart] = useState<{ id: number; name: string; quantity: number; price: string }[]>([])

  // Extract unique tags
  const allTags = Array.from(new Set(menuItemsData.flatMap((item) => item.tags)))

  // Filter menu items based on search, category, and tags
  const filteredMenuItems = menuItemsData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || item.category === selectedCategory) &&
      (selectedTags.length === 0 || selectedTags.some((tag) => item.tags.includes(tag))),
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Campus Cafeteria Menu</CardTitle>
              <CardDescription>Browse our selection of fresh and delicious food items.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search menu..."
                  className="pl-8"
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
                  {allTags.map((tag) => (
                    <DropdownMenuCheckboxItem
                      key={tag}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTags([...selectedTags, tag])
                        } else {
                          setSelectedTags(selectedTags.filter((t) => t !== tag))
                        }
                      }}
                    >
                      {tag}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="All" onValueChange={setSelectedCategory}>
            <TabsList className="mb-6">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredMenuItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      width={300}
                      height={200}
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                      </div>
                      {item.popular && <Badge variant="default">Popular</Badge>}
                    </div>

                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{item.prepTime}</span>
                      </div>
                      <div className="text-sm">{item.calories} cal</div>
                      {item.allergens.length > 0 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Contains: {item.allergens.join(", ")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="font-bold">{item.price}</span>
                      <Button variant="default" size="sm" onClick={() => addToCart(item.id, item.name, item.price)}>
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredMenuItems.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground">No menu items found matching your criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("All")
                      setSelectedTags([])
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {cart.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Cart</CardTitle>
            <CardDescription>Items you've selected for ordering.</CardDescription>
          </CardHeader>
          <CardContent>
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
                  <span>$32.96</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Tax</span>
                  <span>$2.64</span>
                </div>
                <div className="flex justify-between font-medium mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>$35.60</span>
                </div>
              </div>

              <Button className="w-full mt-4">Proceed to Checkout</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
