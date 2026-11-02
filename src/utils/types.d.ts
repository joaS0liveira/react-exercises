// Tipos globais do projeto (declarados aqui: ficam disponíveis em todo o src sem import)

// Os status possíveis de uma viagem
type TripStatus = "on-time" | "delayed" | "cancelled"

interface Trip {
    id: string,
    origin: string,
    destination: string,
    departureDate: string, // ISO: "2026-11-02T08:00:00"
    arrivalDate: string, // ISO
    price: number,
    hasWifi: boolean,
    hasOutlets: boolean,
    almostFull: boolean,
    status: TripStatus
}

// estimatedTime NÃO entra aqui: é calculado a partir das datas (exercício 09)
