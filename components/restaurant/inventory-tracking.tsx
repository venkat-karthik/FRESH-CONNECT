"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, AlertTriangle, BarChart3 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
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

// Sample inventory data
const inventoryData = [
  {
    id: 1,
    name: "Tomatoes",
    category: "Vegetables",
    quantity: "45 kg",
    stockLevel: 75,
    expiryDate: "2023-05-27",
    status: "good",
  },
  {
    id: 2,
    name: "Chicken Breast",
    category: "Meat",
    quantity: "30 kg",
    stockLevel: 60,
    expiryDate: "2023-05-25",
    status: "good",
  },
  {
    id: 3,
    name: "Rice",
    category: "Grains",
    quantity: "15 kg",
    stockLevel: 25,
    expiryDate: "2023-08-15",
    status: "low",
  },
  {
    id: 4,
    name: "Milk",
    category: "Dairy",
    quantity: "20 L",
    stockLevel: 40,
    expiryDate: "2023-05-24",
    status: "expiring",
  },
  {
    id: 5,
    name: "Potatoes",
    category: "Vegetables",
    quantity: "50 kg",
    stockLevel: 80,
    expiryDate: "2023-06-10",
    status: "good",
  },
  {
    id: 6,
    name: "Flour",
    category: "Baking",
    quantity: "8 kg",
    stockLevel: 20,
    expiryDate: "2023-07-20",
    status: "low",
  },
  {
    id: 7,
    name: "Eggs",
    category: "Dairy",
    quantity: "120 units",
    stockLevel: 60,
    expiryDate: "2023-05-30",
    status: "good",
  },
  {
    id: 8,
    name: "Onions",
    category: "Vegetables",
    quantity: "25 kg",
    stockLevel: 50,
    expiryDate: "2023-06-15",
    status: "good",
  },
]

export function InventoryTracking() {
  const [searchTerm, setSearchTerm] = useState("")
  const [inventory, setInventory] = useState(inventoryData)

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
        return <Badge variant="success">Good</Badge>
      case "low":
        return <Badge variant="outline">Low Stock</Badge>
      case "expiring":
        return <Badge variant="destructive">Expiring Soon</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Inventory Tracking</CardTitle>
              <CardDescription>Monitor stock levels and expiry dates of all ingredients.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search inventory..."
                  className="pl-8 w-full md:w-[200px] lg:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Inventory Item</DialogTitle>
                    <DialogDescription>Enter the details of the new inventory item.</DialogDescription>
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
                      <Label htmlFor="expiry" className="text-right">
                        Expiry Date
                      </Label>
                      <Input id="expiry" type="date" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add to Inventory</Button>
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
                <TableHead>Stock Level</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={item.stockLevel} className="h-2 w-[60px]" />
                      <span className="text-xs text-muted-foreground">{item.stockLevel}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{new Date(item.expiryDate).toLocaleDateString()}</span>
                      <span className="text-xs text-muted-foreground">
                        {getDaysUntilExpiry(item.expiryDate)} days left
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Alerts</CardTitle>
            <CardDescription>Items requiring attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventory
                .filter((item) => item.status === "low" || item.status === "expiring")
                .map((item) => (
                  <div key={item.id} className="flex items-start gap-3 border-b pb-3">
                    <div
                      className={`rounded-full p-2 ${
                        item.status === "low"
                          ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.status === "low"
                          ? `Low stock: ${item.quantity} (${item.stockLevel}%)`
                          : `Expires in ${getDaysUntilExpiry(item.expiryDate)} days`}
                      </p>
                    </div>
                  </div>
                ))}

              {inventory.filter((item) => item.status === "low" || item.status === "expiring").length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-sm text-muted-foreground">No alerts at this time.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Summary</CardTitle>
            <CardDescription>Current inventory status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Items</span>
                <span className="font-medium">{inventory.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Low Stock Items</span>
                <span className="font-medium">{inventory.filter((item) => item.status === "low").length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Expiring Soon</span>
                <span className="font-medium">{inventory.filter((item) => item.status === "expiring").length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Stock Level</span>
                <span className="font-medium">
                  {Math.round(inventory.reduce((acc, item) => acc + item.stockLevel, 0) / inventory.length)}%
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-6">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Detailed Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
