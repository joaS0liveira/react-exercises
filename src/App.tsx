import { useState } from "react";
import tripsJson from "../trips.json";
import Card from "./components/card";
import PageTitle from "./components/PageTitle";
import Tabs from "./components/Tabs";
import TripFilter from "./components/TripFilter";
import TripList from "./components/TripList";
import { formatEstimatedTime, formatDate, formatHour, getEstimatedMinutes } from "./utils/time";

//LOGICA: o JSON vem com status: string, então digo ao TS que as linhas batem com o nosso tipo Trip
const allTrips = tripsJson as Trip[]

//LOGICA: os três estados do painel vivem juntos num state só
interface PanelState {
  activeTab: "partidas" | "chegadas",
  selectedTripId: string | null,
  filterValue: string
}

export default function App() {

  const [panel, setPanel] = useState<PanelState>({
    activeTab: "partidas",
    selectedTripId: null,
    filterValue: ""
  })

  // Passo 1: separo as viagens nos dois grupos, sempre a partir do Porto
  const partidas = allTrips.filter((trip) => trip.origin === "Porto")
  const chegadas = allTrips.filter((trip) => trip.destination === "Porto")

  // Passo 2: dentro do grupo, filtro ainda pela cidade escrita no input
  function matchesCity(trip: Trip) {
    if (panel.filterValue === "") {
      return true
    }

    const city = panel.filterValue.toLowerCase()

    return trip.destination.toLowerCase().includes(city) || trip.origin.toLowerCase().includes(city)
  }

  const partidasFiltered = partidas.filter(matchesCity)
  const chegadasFiltered = chegadas.filter(matchesCity)

  //LOGICA: clicar na viagem selecionada outra vez retira a seleção
  function handleSelect(id: string) {
    setPanel(function (prev) {
      const nextTripId = prev.selectedTripId === id ? null : id
      return { ...prev, selectedTripId: nextTripId }
    })
  }

  function handleChangeTab(tab: string) {
    setPanel(function (prev) {
      return { ...prev, activeTab: tab as PanelState["activeTab"] }
    })
  }

  function handleChangeFilter(value: string) {
    setPanel(function (prev) {
      return { ...prev, filterValue: value }
    })
  }

  //LOGICA: cada tab é um item desta lista; para acrescentar uma tab nova é só pôr mais um aqui
  const tabs = [
    {
      key: "partidas",
      label: "Partidas",
      content: <TripList trips={partidasFiltered} selectedTripId={panel.selectedTripId} onSelect={handleSelect} />
    },
    {
      key: "chegadas",
      label: "Chegadas",
      content: <TripList trips={chegadasFiltered} selectedTripId={panel.selectedTripId} onSelect={handleSelect} />
    }
  ]

  //LOGICA: o resumo só mostra dados quando a viagem selecionada está na lista da tab atual
  function renderSummary() {
    // Passo 1: escolho a lista da tab atual
    const currentList = panel.activeTab === "partidas" ? partidasFiltered : chegadasFiltered

    // Passo 2: procuro a viagem pelo id
    const selectedTrip = currentList.find((trip) => trip.id === panel.selectedTripId)

    // Passo 3: se não há seleção, ou o filtro tirou a viagem da lista, não há resumo para mostrar
    return selectedTrip === undefined ? (
      <p className="text-sm text-stone-500">Nenhuma viagem selecionada.</p>
    ) : (
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-stone-800">
          {selectedTrip.origin} → {selectedTrip.destination}
        </span>
        <span className="text-xs text-stone-600">
          Partida {formatDate(selectedTrip.departureDate)} às {formatHour(selectedTrip.departureDate)} · Chegada {formatDate(selectedTrip.arrivalDate)} às {formatHour(selectedTrip.arrivalDate)}
        </span>
        <span className="text-xs text-stone-600">
          Tempo estimado: {formatEstimatedTime(getEstimatedMinutes(selectedTrip.departureDate, selectedTrip.arrivalDate))}
        </span>
        <span className="text-sm font-semibold text-stone-800">{selectedTrip.price.toFixed(2)} €</span>
      </div>
    )
  }

  return (
    <main className="flex flex-col gap-4 p-4">
      <PageTitle title="Painel de Partidas" />

      <TripFilter value={panel.filterValue} onChange={handleChangeFilter} />

      <Card>
        <Tabs tabs={tabs} activeTab={panel.activeTab} onChangeTab={handleChangeTab} />
      </Card>

      <Card>
        <h2 className="text-sm font-semibold text-stone-800">Resumo da seleção</h2>
        {renderSummary()}
      </Card>
    </main>
  )
}
