"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Ticket, QrCode } from "lucide-react"
import { TokenGeneratorDialog } from "./token-generator-dialog"

export function TokenGenerator() {
  const [customerName, setCustomerName] = useState("")
  const [cafeteria, setCafeteria] = useState("Campus Cafeteria")
  const [items, setItems] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showTokenDialog, setShowTokenDialog] = useState(false)
  const [generatedToken, setGeneratedToken] = useState("")

  const handleGenerateToken = () => {
    if (!customerName || !cafeteria || !items) {
      return
    }

    setIsGenerating(true)

    // Simulate token generation
    setTimeout(() => {
      // Generate a random token
      const randomToken = `TKN-${customerName.substring(0, 4).toUpperCase()}${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`

      setGeneratedToken(randomToken)
      setIsGenerating(false)
      setShowTokenDialog(true)
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Token</CardTitle>
        <CardDescription>Create a new token for customer orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customer-name">Customer Name</Label>
            <Input
              id="customer-name"
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cafeteria">Cafeteria</Label>
            <Select value={cafeteria} onValueChange={setCafeteria}>
              <SelectTrigger id="cafeteria">
                <SelectValue placeholder="Select cafeteria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Campus Cafeteria">Campus Cafeteria</SelectItem>
                <SelectItem value="Tech Park Canteen">Tech Park Canteen</SelectItem>
                <SelectItem value="Hospital Cafeteria">Hospital Cafeteria</SelectItem>
                <SelectItem value="Corporate Office">Corporate Office</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="items">Order Items</Label>
            <Textarea
              id="items"
              placeholder="Enter order items (e.g., Burger Combo, Fries, Soda)"
              value={items}
              onChange={(e) => setItems(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <QrCode className="mr-2 h-4 w-4" />
          <span>Token will include a QR code</span>
        </div>
        <Button onClick={handleGenerateToken} disabled={isGenerating || !customerName || !cafeteria || !items}>
          <Ticket className="mr-2 h-4 w-4" />
          {isGenerating ? "Generating..." : "Generate Token"}
        </Button>
      </CardFooter>

      {showTokenDialog && (
        <TokenGeneratorDialog token={generatedToken} open={showTokenDialog} onClose={() => setShowTokenDialog(false)} />
      )}
    </Card>
  )
}
