//LOGICA: contas de tempo separadas, porque a TripRow e o resumo da App precisam das mesmas

// O tempo estimado não está no JSON, então calculo a partir das duas datas
export function getEstimatedMinutes(departureDate: string, arrivalDate: string) {
    const departure = new Date(departureDate)
    const arrival = new Date(arrivalDate)

    const departureMs = departure.getTime()
    const arrivalMs = arrival.getTime()

    const diffMs = arrivalMs - departureMs
    const diffMinutes = diffMs / 60000

    return Math.round(diffMinutes)
}

// Pego nos minutos inteiros e separo em horas + minutos
export function formatEstimatedTime(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    //LOGICA: são três formatos possíveis, então desço pelos ternários
    return hours === 0 ? minutes + " min"
        : minutes === 0 ? hours + " h"
        : hours + " h " + minutes + " min"
}

// Mostro só a hora, no formato "8:00"
export function formatHour(value: string) {
    const date = new Date(value)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    return minutes < 10 ? hours + ":0" + minutes : hours + ":" + minutes
}

// Mostro o dia e o mês, no formato "2/11"
export function formatDate(value: string) {
    const date = new Date(value)
    const day = date.getDate()
    const month = date.getMonth() + 1 // getMonth() conta a partir do 0

    return month < 10 ? day + "/0" + month : day + "/" + month
}
