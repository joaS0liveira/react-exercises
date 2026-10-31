import Card from "./components/card"
import CustomButton from "./components/customButton"
import { WiFiRouterLinearIcon } from "@solar-icons/react"
import PageTitle from "./components/pageTitle"

export default function App() {
  const trip: Trip = {
    id: "1",
    origin: "Porto",
    destination: "Lisboa",
    departureDate: "2026-11-05T08:30:00",
    arrivalDate: "2026-11-05T11:15:00",
    price: 24.9,
    hasWifi: true,
    hasOutlets: true,
    almostFull: false,
    status: "on-time",
  }

  return (
   <PageTitle title="Painel de Partidas" />
    <div className="p-8 bg-neutral-100 min-h-screen">
      <Card>
        <h1 className="text-xl font-bold">{trip.origin} - {trip.destination}</h1>
        <p>Preço: {trip.price} €</p>
        <p>Estado: {trip.status}</p>
        <p>Wifi: {trip.hasWifi ? "Sim" : "Não"}</p>
      </Card>

      <div className="flex gap-4 mt-6">
        <CustomButton variant="warning">Warning</CustomButton>
        <CustomButton variant="danger">Danger</CustomButton>
        <CustomButton variant="info">Info</CustomButton>
        <CustomButton variant="success">Success</CustomButton>
      </div>

      <div className="flex gap-4 mt-6 items-center">
        
        <WiFiRouterLinearIcon size={32}  />
        <WiFiRouterLinearIcon size={32}  color="#1e3a8a" />
      </div>
    </div>
  )
}