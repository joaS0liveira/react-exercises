export type ButtonVariant = "warning" | "danger" | "info" | "success";

type TripStatus = "on-time" | "delayed" | "cancelled"

interface Trip {
    id: string
    origin: string
    destination: string
    departureDate: string
    arrivalDate: string
    price: number
    hasWifi: boolean
    hasOutlets: boolean
    almostFull: boolean
    status: TripStatus
}