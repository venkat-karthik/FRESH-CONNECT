"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Search, Edit, Trash2 } from "lucide-react"

const produceData = [
  {
    id: 1,
    name: "Organic Tomatoes",
    category: "Vegetables",
    quantity: "250 kg",
    price: "$3.50/kg",
    freshness: "Fresh",
    expiry: "7 days",
  },
  {
    id: 2,
    name: "Red Apples",
    category: "Fruits",
    quantity: "180 kg",
    price: "$2.75/kg",
    freshness: "Fresh",
    expiry: "14 days",
  },
  {
    id: 3,
    name: "Carrots",
    category: "Vegetables",
    quantity: "320 kg",
    price: "$1.80/kg",
    freshness: "Fresh",
    expiry: "10 days",
  },
  {
    id: 4,
    name: "Spinach",
    category: "Leafy Greens",
    quantity: "120 kg",
    price: "$4.20/kg",
    freshness: "Very Fresh",
    expiry: "5 days",
  },
  {
    id: 5,
    name: "Potatoes",
    category: "Root Vegetables",
    quantity: "500 kg",
    price: "$1.50/kg",
    freshness: "Fresh",
    expiry: "30 days",
  },
  {
    id: 6,
    name: "Strawberries",
    category: "Berries",
    quantity: "75 kg",
    price: "$6.00/kg",
    freshness: "Very Fresh",
    expiry: "4 days",
  },
]

export function ProduceList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProduce = produceData.filter(
    (produce) =>
      produce.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produce.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Produce Listings</CardTitle>
            <CardDescription>Manage your produce inventory, prices, and availability.</CardDescription>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Produce
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Produce</DialogTitle>
                  <DialogDescription>Enter the details of your new produce listing.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Input id="category" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                      Quantity
                    </Label>
                    <Input id="quantity" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input id="price" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="freshness" className="text-right">
                      Freshness
                    </Label>
                    <Input id="freshness" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="expiry" className="text-right">
                      Expiry
                    </Label>
                    <Input id="expiry" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Produce</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Freshness</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProduce.map((produce) => (
              <TableRow key={produce.id}>
                <TableCell className="font-medium">{produce.name}</TableCell>
                <TableCell>{produce.category}</TableCell>
                <TableCell>{produce.quantity}</TableCell>
                <TableCell>{produce.price}</TableCell>
                <TableCell>
                  <Badge variant={produce.freshness === "Very Fresh" ? "success" : "default"}>
                    {produce.freshness}
                  </Badge>
                </TableCell>
                <TableCell>{produce.expiry}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredProduce.length} of {produceData.length} produce items
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
