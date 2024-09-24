import React, { useState } from 'react';
import { Card, TextField, Button, Snackbar, IconButton, Box } from '@mui/material';
import { FlightTakeoff, FlightLand, CalendarToday } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';

const Search = ({ onSearchClick }) => {
    const [tripType, setTripType] = useState('round');
    const [direction, setDirection] = useState('');
    const [arrival, setArrival] = useState('');
    const [flightDate, setFlightDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const today = dayjs();

    const handleSearch = async () => {
        if (!direction || !arrival || !flightDate) {
            setSnackbarMessage('Please fill out all required fields.');
            setSnackbarOpen(true);
            return;
        }

        onSearchClick();

        const fromAirportCode = direction.toUpperCase();
        const toAirportCode = arrival.toUpperCase();

        try {
            let directionFilter;
            if (fromAirportCode !== 'AMS' && toAirportCode === 'AMS') {
                directionFilter = 'A';
            } else if (fromAirportCode === 'AMS' && toAirportCode !== 'AMS') {
                directionFilter = 'D';
            }

            if (directionFilter) {
                const response = await axios.get("http://localhost:5000/api/flights", {
                    params: {
                        flightdate: flightDate ? flightDate.format('YYYY-MM-DD') : null,
                        direction: directionFilter
                    },
                });

                const flights = response.data.flights;

                if (Array.isArray(flights)) {
                    const filteredFlights = flights.filter(flight => {
                        const fromForDestinations = flight.route.destinations || [];
                        const toForDestinations = flight.route.destinations || [];

                        if (directionFilter === 'A') {
                            return fromForDestinations.includes(fromAirportCode);
                        } else if (directionFilter === 'D') {
                            return toForDestinations.includes(toAirportCode);
                        }
                        return false;
                    });

                    if (filteredFlights.length === 0) {
                        setSnackbarMessage('No flights found for the given criteria.');
                        setSnackbarOpen(true);
                    } else {
                        sessionStorage.setItem('filteredFlights', JSON.stringify(filteredFlights));
                        setSnackbarMessage('Flight found successfully');
                        setSnackbarOpen(true);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching flight data:', error.message);
        }
    };

    return (
        <Card className="relative w-auto p-4" style={{ minHeight: '300px', backgroundColor: '#FFFFFF', borderRadius: '16px' }}>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <FlightTakeoff className="mr-2 text-gray-500 text-xl" />
                    <h2 className="text-[#640D5F] font-bold">BOOK YOUR FLIGHT</h2>
                </div>
                <div className="flex">
                    <Button
                        variant={tripType === 'round' ? 'contained' : 'outlined'}
                        onClick={() => setTripType('round')}
                        style={{
                            borderRadius: '20px 0 0 20px',
                            backgroundColor: tripType === 'round' ? '#640D5F' : 'transparent',
                            color: tripType === 'round' ? '#FFFFFF' : '#4B5563',
                        }}
                    >
                        Round trip
                    </Button>
                    <Button
                        variant={tripType === 'one' ? 'contained' : 'outlined'}
                        onClick={() => setTripType('one')}
                        style={{
                            borderRadius: '0 20px 20px 0',
                            backgroundColor: tripType === 'one' ? '#640D5F' : 'transparent',
                            color: tripType === 'one' ? '#FFFFFF' : '#4B5563',
                        }}
                    >
                        One way
                    </Button>
                </div>
            </div>

            <div className="pt-4">
                <div className="flex flex-col lg:flex-row lg:gap-4">
                    <div className="flex flex-col lg:flex-row lg:gap-4 mb-8">
                        <div className="relative flex-1 min-w-[250px] mb-4 lg:mb-0">
                            <FlightTakeoff className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <TextField
                                variant="outlined"
                                placeholder="Airport Code : BCN.."
                                value={direction}
                                onChange={(e) => setDirection(e.target.value)}
                                InputProps={{
                                    startAdornment: <IconButton><FlightTakeoff /></IconButton>,
                                }}
                                fullWidth
                                sx={{
                                    borderRadius: '20px',
                                    border: '1px solid #640D5F',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    }
                                }}
                            />
                        </div>

                        <div className="relative flex-1 min-w-[250px] mb-4 lg:mb-0">
                            <FlightLand className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <TextField
                                variant="outlined"
                                placeholder="Airport Code : AMS.."
                                value={arrival}
                                onChange={(e) => setArrival(e.target.value)}
                                InputProps={{
                                    startAdornment: <IconButton><FlightLand /></IconButton>,
                                }}
                                fullWidth
                                sx={{
                                    borderRadius: '20px',
                                    border: '1px solid #640D5F',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:gap-4">
                        <div className="flex-1 min-w-[250px] mb-4 lg:mb-0">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Box sx={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid #640D5F' }}>
                                    <DatePicker
                                        label="Flight Date"
                                        minDate={today}
                                        value={flightDate}
                                        onChange={(newValue) => setFlightDate(newValue)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                InputProps={{
                                                    startAdornment: <IconButton><CalendarToday /></IconButton>,
                                                }}
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                    borderRadius: '0', // Box'un köşe yuvarlamasını sağlamak için 0
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        border: 'none',
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                </Box>
                            </LocalizationProvider>
                        </div>

                        {tripType === 'round' && (
                            <div className="flex-1 min-w-[250px]">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Box sx={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid #640D5F' }}>
                                        <DatePicker
                                            label="Return Date"
                                            minDate={flightDate}
                                            value={returnDate}
                                            onChange={(newValue) => setReturnDate(newValue)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    InputProps={{
                                                        startAdornment: <IconButton><CalendarToday /></IconButton>,
                                                    }}
                                                    variant="outlined"
                                                    fullWidth
                                                    sx={{
                                                        borderRadius: '0', // Box'un köşe yuvarlamasını sağlamak için 0
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            border: 'none',
                                                        }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Box>
                                </LocalizationProvider>
                            </div>
                        )}
                    </div>
                </div>

                <div className="absolute bottom-4 right-10">
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#640D5F', color: '#FFFFFF', borderRadius: '20px' }}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </div>
            </div>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                action={
                    <IconButton size="small" aria-label="close" onClick={() => setSnackbarOpen(false)}>
                        <CalendarToday />
                    </IconButton>
                }
            />
        </Card>
    );
};

export default Search;
