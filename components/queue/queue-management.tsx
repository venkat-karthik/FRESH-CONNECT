"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Bell, CheckCircle, Clock, Users } from "lucide-react"
import { TokenGeneratorDialog } from "./token-generator-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"

// Sample queue data
const queueData = [
  {
    id: "TKN-JOHN3748",
    name: "John Smith",
    items: "Burger Combo, Fries",
    status: "serving",
    waitTime: "0 min",
    cafeteria: "Campus Cafeteria",
    orderTime: "10:30 AM",
    avatar: "JS",
  },
  {
    id: "TKN-SARA5692",
    name: "Sara Johnson",
    items: "Salad Bowl, Juice",
    status: "waiting",
    waitTime: "5 min",
    cafeteria: "Campus Cafeteria",
    orderTime: "10:35 AM",
    avatar: "SJ",
  },
  {
    id: "TKN-MIKE9012",
    name: "Mike Brown",
    items: "Pizza Slice, Soda",
    status: "waiting",
    waitTime: "8 min",
    cafeteria: "Campus Cafeteria",
    orderTime: "10:38 AM",
    avatar: "MB",
  },
  {
    id: "TKN-LISA4567",
    name: "Lisa Garcia",
    items: "Pasta, Garlic Bread",
    status: "waiting",
    waitTime: "12 min",
    cafeteria: "Campus Cafeteria",
    orderTime: "10:42 AM",
    avatar: "LG",
  },
  {
    id: "TKN-DAVE7890",
    name: "Dave Wilson",
    items: "Sandwich, Chips",
    status: "waiting",
    waitTime: "15 min",
    cafeteria: "Campus Cafeteria",
    orderTime: "10:45 AM",
    avatar: "DW",
  },
  {
    id: "TKN-EMMA2345",
    name: "Emma Taylor",
    items: "Noodle Bowl, Spring Rolls",
    status: "completed",
    waitTime: "0 min",
    cafeteria: "Tech Park Canteen",
    orderTime: "10:20 AM",
    avatar: "ET",
  },
  {
    id: "TKN-ALEX6789",
    name: "Alex Johnson",
    items: "Burrito Bowl, Chips & Salsa",
    status: "completed",
    waitTime: "0 min",
    cafeteria: "Tech Park Canteen",
    orderTime: "10:15 AM",
    avatar: "AJ",
  },
]

export function QueueManagement() {
  const [queue, setQueue] = useState(queueData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCafeteria, setSelectedCafeteria] = useState("all")
  const [showTokenDialog, setShowTokenDialog] = useState(false)
  const [selectedToken, setSelectedToken] = useState("")
  const [showQueueDialog, setShowQueueDialog] = useState(false)
  const [selectedCafeteriaQueue, setSelectedCafeteriaQueue] = useState<string | null>(null)

  const handleStatusChange = (id: string, newStatus: string) => {
    setQueue(
      queue.map((item) =>
        item.id === id
          ? { ...item, status: newStatus, waitTime: newStatus === "completed" ? "0 min" : item.waitTime }
          : item,
      ),
    )
  }

  const handleViewToken = (token: string) => {
    setSelectedToken(token)
    setShowTokenDialog(true)
  }

  const handleViewQueue = (cafeteria: string) => {
    setSelectedCafeteriaQueue(cafeteria)
    setShowQueueDialog(true)
  }

  const filteredQueue = queue.filter(
    (item) =>
      (item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCafeteria === "all" || item.cafeteria === selectedCafeteria),
  )

  const cafeteriaQueue = selectedCafeteriaQueue
    ? queue
        .filter((item) => item.cafeteria === selectedCafeteriaQueue && item.status !== "completed")
        .sort((a, b) => {
          if (a.status === "serving") return -1
          if (b.status === "serving") return 1
          return 0
        })
    : []

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Queue Management</CardTitle>
            <CardDescription>Manage customer orders in the virtual queue system.</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by token or name..."
                className="pl-8 w-full md:w-[200px] lg:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCafeteria} onValueChange={setSelectedCafeteria}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select Cafeteria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cafeterias</SelectItem>
                <SelectItem value="Campus Cafeteria">Campus Cafeteria</SelectItem>
                <SelectItem value="Tech Park Canteen">Tech Park Canteen</SelectItem>
                <SelectItem value="Hospital Cafeteria">Hospital Cafeteria</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            onClick={() => handleViewQueue(selectedCafeteria === "all" ? "Campus Cafeteria" : selectedCafeteria)}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            View Queue
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Wait Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQueue.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <Button variant="link" className="p-0 h-auto font-medium" onClick={() => handleViewToken(item.id)}>
                      {item.id}
                    </Button>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{item.items}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "serving" ? "default" : item.status === "waiting" ? "outline" : "success"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.waitTime}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {item.status === "waiting" && (
                        <Button variant="outline" size="sm" onClick={() => handleStatusChange(item.id, "serving")}>
                          <Bell className="mr-1 h-4 w-4" />
                          Call
                        </Button>
                      )}
                      {item.status === "serving" && (
                        <Button variant="outline" size="sm" onClick={() => handleStatusChange(item.id, "completed")}>
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Complete
                        </Button>
                      )}
                      {item.status === "completed" && (
                        <Button variant="ghost" size="sm" onClick={() => handleStatusChange(item.id, "waiting")}>
                          <Clock className="mr-1 h-4 w-4" />
                          Requeue
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {showTokenDialog && (
        <TokenGeneratorDialog token={selectedToken} open={showTokenDialog} onClose={() => setShowTokenDialog(false)} />
      )}

      <Dialog open={showQueueDialog} onOpenChange={setShowQueueDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Current Queue - {selectedCafeteriaQueue}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <AnimatePresence>
                {cafeteriaQueue.map((person, index) => (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-lg border ${
                      person.status === "serving" ? "bg-primary/5 border-primary" : ""
                    }`}
                  >
                    <Avatar className="h-10 w-10 border-2 border-primary">
                      <AvatarFallback>{person.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{person.name}</h3>
                        <Badge variant={person.status === "serving" ? "default" : "outline"} className="ml-2">
                          {person.status === "serving" ? "Now Serving" : `Waiting (${person.waitTime})`}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{person.id}</p>
                      <p className="text-xs text-muted-foreground mt-1">{person.items}</p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">{person.orderTime}</div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {cafeteriaQueue.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground">No customers in queue.</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
