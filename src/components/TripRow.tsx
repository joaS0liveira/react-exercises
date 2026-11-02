import { WiFiIcon } from "@solar-icons/react/bold/wi-fi"
import { PlugCircleIcon } from '@solar-icons/react/bold-duotone/plug-circle'
import { UsersGroupRoundedIcon } from "@solar-icons/react/bold/users-group-rounded"

import Button from "./button"
import { formatEstimatedTime, formatDate, formatHour, getEstimatedMinutes } from "../utils/time"

interface TripRowProps {
    trip: Trip,
    selected: boolean,
    onSelect: (id: string) => void
}

export default function TripRow({ trip, selected, onSelect }: TripRowProps) {

    //LOGICA: o que é escolha resolvo com ternário, o que é conta faço numa linha só
    const buyable = trip.status !== "cancelled" && trip.almostFull === false
    const estimatedTimeLabel = formatEstimatedTime(getEstimatedMinutes(trip.departureDate, trip.arrivalDate))

    return (
        <div className={`flex items-center justify-between gap-3 rounded-lg border p-2 ${selected ? "border-blue-400 bg-blue-50" : "border-neutral-200 bg-white hover:border-neutral-300"}`}>
            <button
                type="button"
                onClick={() => onSelect(trip.id)}
                aria-pressed={selected}
                className="flex flex-1 flex-col items-start gap-1 text-left hover:cursor-pointer"
            >
                <span className="text-sm font-medium text-stone-800">
                    {trip.origin} → {trip.destination}
                    {selected ? <span className="ml-1 text-xs font-medium text-blue-700">(selecionada)</span> : null}
                </span>
                <span className="text-xs text-stone-500">
                    Partida {formatDate(trip.departureDate)} às {formatHour(trip.departureDate)} · Chegada {formatDate(trip.arrivalDate)} às {formatHour(trip.arrivalDate)}
                </span>
                <span className="text-xs text-stone-500">
                    Tempo estimado: {estimatedTimeLabel}
                </span>
                <span className="flex gap-3 text-xs text-stone-600">
                    {trip.hasWifi ? (
                        <span className="flex items-center gap-1">
                            <WiFiIcon size={16} />
                            Wifi
                        </span>
                    ) : null}
                    {trip.hasOutlets ? (
                        <span className="flex items-center gap-1">
                            <PlugCircleIcon size={16} />
                            Tomadas
                        </span>
                    ) : null}
                    {trip.almostFull ? (
                        <span className="flex items-center gap-1">
                            <UsersGroupRoundedIcon size={16} />
                            Quase cheio
                        </span>
                    ) : null}
                </span>
            </button>

            <span className="text-sm font-semibold text-stone-800">{trip.price.toFixed(2)} €</span>

            <Button variant={buyable ? "success" : "danger"}>
                {buyable ? "Comprar" : "Esgotado"}
            </Button>
        </div>
    )
}
