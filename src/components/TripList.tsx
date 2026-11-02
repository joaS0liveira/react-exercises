import TripRow from "./TripRow"

interface TripListProps {
    trips: Trip[],
    selectedTripId: string | null,
    onSelect: (id: string) => void
}

export default function TripList({ trips, selectedTripId, onSelect }: TripListProps) {

    //LOGICA: é uma escolha entre dois JSX, então é um ternário: lista vazia ou lista de linhas
    return trips.length === 0 ? (
        <p className="text-sm text-stone-500">Nenhuma viagem encontrada.</p>
    ) : (
        <div className="flex max-h-96 flex-col gap-2 overflow-y-auto">
            {trips.map((trip) => (
                <TripRow
                    key={trip.id}
                    trip={trip}
                    selected={trip.id === selectedTripId}
                    onSelect={onSelect}
                />
            ))}
        </div>
    )
}
