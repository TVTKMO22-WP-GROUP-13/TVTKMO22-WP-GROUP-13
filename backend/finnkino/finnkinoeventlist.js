const axios = require('axios')

const fetchFinnkinoData = async () => {
    try {
        const response = await axios.get('https://www.finnkino.fi/xml/Events/')
        return response.data
        } catch (error) {
            console.error("Error fetching event data:", error)
            throw error;
        }
    }

const extractData = (events) => {
    return events.map(event => {
        const title = event.Title?.[0] || 'N/A'
        const productionYear = event.ProductionYear?.[0] || 'N/A'
        const lenghtInMinutes = event.LenghtInMinutes?.[0] || 'N/A'
        const synopsis = event.Synopsis?.[0] || 'N/A'
        const largeImagePotrait = event.Images?.[0]?.EventLargeImagePortrait?.[0] || 'N/A'
        const URL = event.EventURL?.[0] || 'N/A'

        return {
            Title: title,
            ProductionYear: productionYear,
            LenghtInMinutes: lenghtInMinutes,
            Synopsis: synopsis,
            EventLargeImagePortrait: largeImagePotrait,
            EventURL: URL
        }
    })
}

const getFinnkinoEvents = async () => {
    try {
        const xmlData = await fetchFinnkinoData()
        const events = xmlData?.Events?.Event || []
        console.log('Events: ', events)

        const extractedData = extractData(events)
        console.log('Extracted data;', extractedData)

        return extractedData

    } catch (error) {
        console.error("Error getting events 2:", error)
        throw error
    }
}

module.exports = getFinnkinoEvents;