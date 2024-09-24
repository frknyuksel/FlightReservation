import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlightDetails from './CardDetail.jsx';
import { getAirlineNameFromIATA, getCityNameFromIATA } from '../../utils/GetFlightName';
import formatTime from '../../utils/formatTime';
import calculateFlightDuration from '../../utils/calculateFlightDuration';
import { Card, CircularProgress, Button, Typography, Snackbar } from '@mui/material';
import { FlightTakeoff, FlightLand, AirplaneTicket } from '@mui/icons-material';

const FlightsCard = ({ onAirlinesUpdate, selectedAirline }) => {
    const [flightData, setFlightData] = useState([]);
    const [loggedIds, setLoggedIds] = useState(new Set());
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const fetchFlightData = useCallback(() => {
        const storedData = sessionStorage.getItem('filteredFlights');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const filteredData = selectedAirline
                ? parsedData.filter(flight => flight.prefixIATA === selectedAirline)
                : parsedData;

            setFlightData(filteredData);

            if (filteredData.length > 0) {
                const airlines = filteredData
                    .map(flight => flight.prefixIATA)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .map(code => ({ iataCode: code, name: getAirlineNameFromIATA(code) }));

                if (onAirlinesUpdate) {
                    onAirlinesUpdate(airlines);
                }
            }
        } else {
            setFlightData([]);
        }
    }, [selectedAirline, onAirlinesUpdate]);

    useEffect(() => {
        fetchFlightData();
        const intervalId = setInterval(fetchFlightData, 5000);
        return () => clearInterval(intervalId);
    }, [fetchFlightData]);

    useEffect(() => {
        flightData.forEach((flight) => {
            if (!loggedIds.has(flight.id)) {
                console.log(`Flight ID: ${flight.id}`);
                setLoggedIds((prev) => new Set(prev).add(flight.id));
            }
        });
    }, [flightData, loggedIds]);

    const bookFlight = async (flight) => {
        try {
            const formattedFlight = {
                ...flight,
                codeshares: Array.isArray(flight.codeshares)
                    ? flight.codeshares.map(String)
                    : [],
            };

            const response = await axios.post('http://localhost:5000/api/flights/add-flight', formattedFlight);
            console.log(response.data);
            setSnackbarMessage('Flight booked successfully!');
            setOpenSnackbar(true);
            sessionStorage.removeItem('filteredFlights');
            navigate('/user-flights');
        } catch (error) {
            console.error('Error booking flight:', error.response ? error.response.data : error.message);
            setSnackbarMessage('Error booking flight. Please try again.');
            setOpenSnackbar(true);
        }
    };

    const handleToggleDetails = (flight) => {
        setSelectedFlight(selectedFlight && selectedFlight.id === flight.id ? null : flight);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (flightData.length === 0) {
        return <div className="flex justify-center items-center h-full"><CircularProgress /></div>;
    }

    return (
        <div className="mt-5 px-4 sm:px-6 lg:px-8">
            {flightData.map((flight) => {
                const {
                    id,
                    flightDirection,
                    route,
                    scheduleDateTime,
                    estimatedLandingTime,
                    prefixIATA,
                } = flight;
                const destinations = route?.destinations || [];
                const departureAirport = flightDirection === 'D' ? 'AMS' : destinations[0];
                const arrivalAirport = flightDirection === 'A' ? 'AMS' : destinations[destinations.length - 1];
                const flightDuration = calculateFlightDuration(scheduleDateTime, estimatedLandingTime);
                const airlineName = getAirlineNameFromIATA(prefixIATA);

                return (
                    <div key={id} className="relative mb-5">
                        <Card variant="outlined" style={{ padding: '16px', borderRadius: '12px', position: 'relative', marginBottom: "20px" }}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                                <div className="flex flex-col">
                                    <h2 className="text-md mb-5 font-bold">
                                        {getCityNameFromIATA(departureAirport)} - {' '}
                                        {getCityNameFromIATA(arrivalAirport)}
                                    </h2>
                                    <div className="flex flex-col items-start space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <FlightTakeoff fontSize="small" />
                                            <Typography variant="body1">Departure</Typography>
                                        </div>
                                        <Typography variant="h5">{formatTime(scheduleDateTime)}</Typography>
                                        <Typography variant="body2">Airport: {departureAirport}</Typography>
                                        <div className="pt-5">
                                            <Typography variant="h6" style={{ color: '#640D5F' }}>Price: $300</Typography>
                                            <Typography variant="body2" color="textSecondary">Round Trip</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center justify-center">
                                    <div className="border-t-4 border-gray-300 w-24"></div>
                                </div>
                                <div className="flex flex-row items-start">
                                    <div className="flex items-start space-x-2">
                                        <div className="flex flex-col items-start">
                                            <Typography variant="body1" fontWeight="bold" color="textPrimary">{airlineName}</Typography>
                                            <AirplaneTicket fontSize="large" style={{ color: '#640D5F' }} />
                                            <Typography variant="body1" color="textPrimary">{flightDuration} (nonstop)</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center justify-center">
                                    <div className="border-t-4 border-gray-300 w-24"></div>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="flex space-x-2">
                                        <FlightLand fontSize="small" />
                                        <Typography variant="body1">Arrival</Typography>
                                    </div>
                                    <div className="flex flex-col mt-2">
                                        <Typography variant="h5">{formatTime(estimatedLandingTime)}</Typography>
                                        <Typography variant="body2" color="textPrimary">Airport: {arrivalAirport}</Typography>
                                    </div>
                                </div>
                            </div>
                            <Button
                                onClick={() => bookFlight(flight)}
                                variant="contained"
                                style={{
                                    position: 'absolute',
                                    bottom: '16px',
                                    right: '16px',
                                    borderRadius: '20px',
                                    padding: '8px 16px',
                                    fontSize: '16px',
                                    backgroundColor: '#640D5F',
                                    color: '#ffffff',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Book Flight
                            </Button>
                        </Card>
                        <div className="flex justify-start mt-2">
                            <Button
                                onClick={() => handleToggleDetails(flight)}
                                variant="text"
                                style={{
                                    textDecoration: 'underline',
                                    color: '#640D5F',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Arka plan rengi
                                    borderRadius: '15px',
                                    padding: '5px 10px',
                                }}
                            >
                                Check the details
                            </Button>
                        </div>
                        {selectedFlight && selectedFlight.id === flight.id && (
                            <FlightDetails flight={selectedFlight} onClose={() => setSelectedFlight(null)} />
                        )}
                    </div>
                );
            })}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </div>
    );
};

export default FlightsCard;
