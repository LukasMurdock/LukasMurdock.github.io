export type AirportCoordinate = {
  Name: string
  Lat: number
  Lon: number
}

export const AIRPORT_COORDINATES: Record<string, AirportCoordinate> = {
  BWI: { Name: "Baltimore/Washington International Thurgood Marshall Airport", Lat: 39.1754, Lon: -76.6684 },
  CLE: { Name: "Cleveland Hopkins International Airport", Lat: 41.4117, Lon: -81.8498 },
  CMH: { Name: "John Glenn Columbus International Airport", Lat: 39.998, Lon: -82.8919 },
  DEN: { Name: "Denver International Airport", Lat: 39.8561, Lon: -104.6737 },
  FLL: { Name: "Fort Lauderdale-Hollywood International Airport", Lat: 26.0726, Lon: -80.1527 },
  HND: { Name: "Tokyo Haneda Airport", Lat: 35.5494, Lon: 139.7798 },
  HNL: { Name: "Daniel K. Inouye International Airport", Lat: 21.3187, Lon: -157.9225 },
  IAH: { Name: "George Bush Intercontinental Airport", Lat: 29.9902, Lon: -95.3368 },
  LAX: { Name: "Los Angeles International Airport", Lat: 33.9416, Lon: -118.4085 },
  LEX: { Name: "Blue Grass Airport", Lat: 38.0365, Lon: -84.6059 },
  MDW: { Name: "Chicago Midway International Airport", Lat: 41.7868, Lon: -87.7522 },
  MIA: { Name: "Miami International Airport", Lat: 25.7959, Lon: -80.287 },
  OAK: { Name: "Oakland International Airport", Lat: 37.7213, Lon: -122.2207 },
  OGG: { Name: "Kahului Airport", Lat: 20.8986, Lon: -156.4305 },
  ORD: { Name: "O'Hare International Airport", Lat: 41.9742, Lon: -87.9073 },
  PGD: { Name: "Punta Gorda Airport", Lat: 26.9189, Lon: -81.9905 },
  PHX: { Name: "Phoenix Sky Harbor International Airport", Lat: 33.4342, Lon: -112.0116 },
  PSP: { Name: "Palm Springs International Airport", Lat: 33.8297, Lon: -116.507 },
  RSW: { Name: "Southwest Florida International Airport", Lat: 26.5362, Lon: -81.7552 },
  SAN: { Name: "San Diego International Airport", Lat: 32.7338, Lon: -117.1933 },
  SEA: { Name: "Seattle-Tacoma International Airport", Lat: 47.4502, Lon: -122.3088 },
  SFO: { Name: "San Francisco International Airport", Lat: 37.6213, Lon: -122.379 },
  SLC: { Name: "Salt Lake City International Airport", Lat: 40.7899, Lon: -111.9791 },
  STL: { Name: "St. Louis Lambert International Airport", Lat: 38.7487, Lon: -90.37 },
}

export type AirportCode = keyof typeof AIRPORT_COORDINATES

export type Trip = {
  Date: string
  From: AirportCode
  To: AirportCode
}

export const TRIPS: Trip[] = [
  { Date: "2021-02-14", From: "LEX", To: "PGD" },
  { Date: "2024-12-05", From: "RSW", To: "STL" },
  { Date: "2024-12-05", From: "STL", To: "SAN" },
  { Date: "2024-12-10", From: "SAN", To: "DEN" },
  { Date: "2024-12-10", From: "DEN", To: "RSW" },
  { Date: "2024-12-15", From: "RSW", To: "CLE" },
  { Date: "2024-12-22", From: "CLE", To: "RSW" },
  { Date: "2024-12-29", From: "RSW", To: "ORD" },
  { Date: "2024-12-29", From: "ORD", To: "DEN" },
  { Date: "2025-01-01", From: "DEN", To: "LAX" },
  { Date: "2025-01-01", From: "LAX", To: "HNL" },
  { Date: "2025-03-01", From: "HNL", To: "SFO" },
  { Date: "2025-03-01", From: "SFO", To: "ORD" },
  { Date: "2025-03-02", From: "ORD", To: "BWI" },
  { Date: "2025-03-05", From: "BWI", To: "IAH" },
  { Date: "2025-03-05", From: "IAH", To: "HNL" },
  { Date: "2025-03-25", From: "HNL", To: "SLC" },
  { Date: "2025-03-27", From: "SLC", To: "HNL" },
  { Date: "2025-04-15", From: "HNL", To: "SFO" },
  { Date: "2025-04-15", From: "HNL", To: "SFO" },
  { Date: "2025-04-16", From: "SFO", To: "MIA" },
  { Date: "2025-04-19", From: "FLL", To: "CMH" },
  { Date: "2025-04-22", From: "CMH", To: "DEN" },
  { Date: "2025-04-22", From: "DEN", To: "HNL" },
  { Date: "2025-05-07", From: "HNL", To: "OGG" },
  { Date: "2025-05-08", From: "OGG", To: "HNL" },
  { Date: "2025-05-24", From: "HNL", To: "SFO" },
  { Date: "2025-05-24", From: "SFO", To: "CMH" },
  { Date: "2025-05-29", From: "CMH", To: "ORD" },
  { Date: "2025-06-01", From: "ORD", To: "HNL" },
  { Date: "2025-07-08", From: "HNL", To: "DEN" },
  { Date: "2025-07-09", From: "DEN", To: "STL" },
  { Date: "2025-07-14", From: "STL", To: "DEN" },
  { Date: "2025-07-14", From: "DEN", To: "HNL" },
  { Date: "2025-10-09", From: "HNL", To: "SAN" },
  { Date: "2025-10-14", From: "SAN", To: "HNL" },
  { Date: "2025-10-20", From: "HNL", To: "HND" },
  { Date: "2025-10-27", From: "HND", To: "HNL" },
  { Date: "2025-10-27", From: "HNL", To: "SEA" },
  { Date: "2025-10-29", From: "SEA", To: "HNL" },
  { Date: "2025-11-10", From: "HNL", To: "SFO" },
  { Date: "2025-11-19", From: "SFO", To: "HNL" },
  { Date: "2025-11-24", From: "HNL", To: "ORD" },
  { Date: "2025-11-25", From: "ORD", To: "RSW" },
  { Date: "2025-12-09", From: "RSW", To: "IAH" },
  { Date: "2025-12-09", From: "IAH", To: "SFO" },
  { Date: "2025-12-20", From: "SFO", To: "MDW" },
  { Date: "2025-12-20", From: "MDW", To: "RSW" },
  { Date: "2026-01-05", From: "RSW", To: "DEN" },
  { Date: "2026-01-05", From: "DEN", To: "HNL" },
  { Date: "2026-02-22", From: "HNL", To: "OGG" },
  { Date: "2026-02-23", From: "OGG", To: "HNL" },
  { Date: "2026-03-03", From: "HNL", To: "PHX" },
  { Date: "2026-03-07", From: "HNL", To: "OGG" },
  { Date: "2026-03-10", From: "OGG", To: "HNL" },
  { Date: "2026-03-16", From: "HNL", To: "OGG" },
  { Date: "2026-03-23", From: "OGG", To: "HNL" },
  { Date: "2026-03-25", From: "HNL", To: "SAN" },
  { Date: "2026-03-26", From: "SAN", To: "OAK" },
  { Date: "2026-03-26", From: "OAK", To: "PSP" },
  { Date: "2026-04-06", From: "SAN", To: "HNL" },
]

export type TripRoute = {
  From: AirportCode
  To: AirportCode
  Count: number
}

export const TRIP_ROUTES: TripRoute[] = Object.values(
  TRIPS.reduce<Record<string, TripRoute>>((acc, trip) => {
    const key = `${trip.From}-${trip.To}`
    const existing = acc[key]
    if (existing) {
      existing.Count += 1
    } else {
      acc[key] = { From: trip.From, To: trip.To, Count: 1 }
    }
    return acc
  }, {})
)

export type CobeArc = {
  id: string
  from: [number, number]
  to: [number, number]
  date?: string
  count: number
}

export const COBE_ARCS_FROM_TRIPS: CobeArc[] = TRIPS.map((trip, index) => ({
  id: `${trip.From}-${trip.To}-${trip.Date}-${index}`,
  from: [AIRPORT_COORDINATES[trip.From].Lat, AIRPORT_COORDINATES[trip.From].Lon],
  to: [AIRPORT_COORDINATES[trip.To].Lat, AIRPORT_COORDINATES[trip.To].Lon],
  date: trip.Date,
  count: 1,
}))

export const COBE_ARCS: CobeArc[] = TRIP_ROUTES.map((route) => ({
  id: `${route.From}-${route.To}`,
  from: [AIRPORT_COORDINATES[route.From].Lat, AIRPORT_COORDINATES[route.From].Lon],
  to: [AIRPORT_COORDINATES[route.To].Lat, AIRPORT_COORDINATES[route.To].Lon],
  count: route.Count,
}))

export const HNL = AIRPORT_COORDINATES.HNL
