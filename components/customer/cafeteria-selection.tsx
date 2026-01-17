"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Clock, Star, ChevronRight } from "lucide-react"

// Sample cafeteria data
const cafeteriaData = [
  {
    id: 1,
    name: "Campus Cafeteria",
    location: "Main Campus, Building A",
    distance: "0.2 km",
    rating: 4.5,
    status: "open",
    waitTime: "8 min",
    cuisines: ["American", "Italian", "Salad Bar"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    name: "Tech Park Canteen",
    location: "Tech Park, Building C",
    distance: "1.5 km",
    rating: 4.2,
    status: "open",
    waitTime: "5 min",
    cuisines: ["Asian", "Mexican", "Sandwiches"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    name: "Hospital Cafeteria",
    location: "City Hospital, Ground Floor",
    distance: "3.2 km",
    rating: 3.8,
    status: "open",
    waitTime: "2 min",
    cuisines: ["Healthy", "Soups", "Sandwiches"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    name: "Corporate Office",
    location: "Business District, Tower 3",
    distance: "4.8 km",
    rating: 4.7,
    status: "closed",
    waitTime: "0 min",
    cuisines: ["International", "Buffet", "Coffee"],
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    name: "University Dining",
    location: "University Campus, North Wing",
    distance: "0.5 km",
    rating: 4.0,
    status: "open",
    waitTime: "12 min",
    cuisines: ["Pizza", "Burgers", "Vegetarian"],
    image: "/placeholder.svg?height=200&width=400",
  },
]

export function CafeteriaSelection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null)

  // Get unique cuisines
  const allCuisines = Array.from(new Set(cafeteriaData.flatMap((cafeteria) => cafeteria.cuisines)))

  // Filter cafeterias based on search and cuisine
  const filteredCafeterias = cafeteriaData.filter(
    (cafeteria) =>
      cafeteria.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCuisine || cafeteria.cuisines.includes(selectedCuisine)),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search cafeterias..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCuisine === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCuisine(null)}
          >
            All
          </Button>
          {allCuisines.map((cuisine) => (
            <Button
              key={cuisine}
              variant={selectedCuisine === cuisine ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCuisine(cuisine)}
            >
              {cuisine}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCafeterias.map((cafeteria) => (
          <Card key={cafeteria.id} className="overflow-hidden">
            <div className="aspect-video bg-muted">
              <img
                src={cafeteria.image || "/placeholder.svg"}
                alt={cafeteria.name}
                className="h-full w-full object-cover"
                width={400}
                height={200}
              />
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{cafeteria.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{cafeteria.location}</span>
                  </div>
                </div>
                <Badge variant={cafeteria.status === "open" ? "success" : "outline"}>
                  {cafeteria.status === "open" ? "Open" : "Closed"}
                </Badge>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{cafeteria.rating}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">Wait: {cafeteria.waitTime}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{cafeteria.distance}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-4">
                {cafeteria.cuisines.map((cuisine) => (
                  <Badge key={cuisine} variant="outline" className="text-xs">
                    {cuisine}
                  </Badge>
                ))}
              </div>

              <Button className="w-full mt-4" disabled={cafeteria.status !== "open"}>
                {cafeteria.status === "open" ? "Select Cafeteria" : "Currently Closed"}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}

        {filteredCafeterias.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No cafeterias found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setSelectedCuisine(null)
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
