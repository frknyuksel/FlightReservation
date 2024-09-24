import airlinesData from '../data/airlines.json';
import airports from 'airports';


export const getAirlineNameFromIATA = (iataCode) => {
    const airline = airlinesData.find(item => item.IATACode === iataCode);
    return airline ? airline.Airline : 'Unknown Airline';
};

export const getCityNameFromIATA = (iataCode) => {
    const airport = airports.find(a => a.iata === iataCode);
    return airport ? airport.name : 'Unknown';
};
