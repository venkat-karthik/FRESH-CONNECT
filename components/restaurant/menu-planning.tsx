"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Plus, Edit, Trash2, ChevronRight, Utensils, Clock, DollarSign } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample menu categories
const categories = ["Appetizers", "Main Courses", "Sides", "Desserts", "Beverages"]

// Sample menu items
const menuItemsData = [
  {
    id: 1,
    name: "Garden Fresh Salad",
    category: "Appetizers",
    price: "$8.99",
    ingredients: ["Lettuce", "Tomatoes", "Cucumbers", "Carrots", "Vinaigrette"],
    prepTime: "10 min",
    calories: 120,
    tags: ["vegetarian", "healthy"],
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Grilled Chicken Sandwich",
    category: "Main Courses",
    price: "$12.99",
    ingredients: ["Chicken Breast", "Brioche Bun", "Lettuce", "Tomato", "Mayo"],
    prepTime: "15 min",
    calories: 450,
    tags: ["protein", "popular"],
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Chocolate Brownie",
    category: "Desserts",
    price: "$6.99",
    ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Butter"],
    prepTime: "5 min",
    calories: 380,
    tags: ["sweet", "popular"],
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Fresh Fruit Smoothie",
    category: "Beverages",
    price: "$5.99",
    ingredients: ["Banana", "Strawberries", "Yogurt", "Honey", "Ice"],
    prepTime: "5 min",
    calories: 220,
    tags: ["healthy", "refreshing"],
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Crispy French Fries",
    category: "Sides",
    price: "$4.99",
    ingredients: ["Potatoes", "Salt", "Vegetable Oil"],
    prepTime: "8 min",
    calories: 320,
    tags: ["crispy", "popular"],
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Vegetable Stir Fry",
    category: "Main Courses",
    price: "$11.99",
    ingredients: ["Mixed Vegetables", "Tofu", "Soy Sauce", "Ginger", "Rice"],
    prepTime: "12 min",
    calories: 380,
    tags: ["vegetarian", "healthy"],
    image: "/placeholder.svg",
  },
]

export function MenuPlanning() {
  const [activeTab, setActiveTab] = useState("menu")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [menuItems, setMenuItems] = useState(menuItemsData)

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || item.category === selectedCategory),
  )

  return (
    <Tabs defaultValue="menu" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="menu">Menu Items</TabsTrigger>
        <TabsTrigger value="planner">Menu Planner</TabsTrigger>
        <TabsTrigger value="seasonal">Seasonal Specials</TabsTrigger>
      </TabsList>

      <TabsContent value="menu" className="pt-4">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Menu Items</CardTitle>
                <CardDescription>Manage your menu items and categories.</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search menu items..."
                    className="pl-8 w-full md:w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="w-full sm:w-auto px-3 py-2 rounded-md border border-input bg-background text-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add Menu Item</DialogTitle>
                      <DialogDescription>Create a new item for your menu.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Item Name</Label>
                          <Input id="name" placeholder="Garden Fresh Salad" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <select
                            id="category"
                            className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                          >
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price</Label>
                          <Input id="price" placeholder="$8.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="prepTime">Prep Time</Label>
                          <Input id="prepTime" placeholder="10 min" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="calories">Calories</Label>
                          <Input id="calories" placeholder="120" type="number" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ingredients">Ingredients</Label>
                        <Textarea
                          id="ingredients"
                          placeholder="Enter ingredients, separated by commas"
                          className="min-h-[100px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tags</Label>
                        <div className="flex flex-wrap gap-2">
                          {["vegetarian", "vegan", "gluten-free", "healthy", "spicy", "popular"].map((tag) => (
                            <div key={tag} className="flex items-center space-x-2">
                              <Checkbox id={`tag-${tag}`} />
                              <label
                                htmlFor={`tag-${tag}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {tag}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add to Menu</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
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
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Item
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Item
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center text-sm">
                        <DollarSign className="mr-1 h-3 w-3" />
                        {item.price}
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-1 h-3 w-3" />
                        {item.prepTime}
                      </div>
                      <div className="flex items-center text-sm">
                        <Utensils className="mr-1 h-3 w-3" />
                        {item.calories} cal
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-2">Ingredients:</p>
                      <p className="text-xs">{item.ingredients.join(", ")}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredMenuItems.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground">No menu items found.</p>
                  <Button variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Item
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="planner" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Menu Planner</CardTitle>
            <CardDescription>Plan your weekly menu based on available ingredients.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">Menu planner coming soon.</p>
              <p className="text-sm text-muted-foreground mt-1">
                This feature will allow you to plan your menu based on available ingredients and seasonal items.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="seasonal" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Seasonal Specials</CardTitle>
            <CardDescription>Create and manage seasonal menu items.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">Seasonal specials coming soon.</p>
              <p className="text-sm text-muted-foreground mt-1">
                This feature will allow you to create special menu items based on seasonal ingredients.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
