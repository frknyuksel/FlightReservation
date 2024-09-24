import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { getAirlineNameFromIATA } from "../../../utils/GetFlightName";
import calculateFlightDuration from "../../../utils/calculateFlightDuration";
import formatTime from "../../../utils/formatTime";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'; // MUI Close Icon
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // MUI Expand More Icon
import ThyLogo from '../../../assets/Thy.png';
import { Spin } from "antd";
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

// ClassOptions component
const ClassOptions = ({ title, value, onClick }) => (
  <div
    className="bg-gray-100 border border-gray-200 rounded-lg p-2 text-center shadow-sm max-w-[100px] sm:max-w-[120px] flex-1 cursor-pointer hover:bg-gray-200 transition duration-200"
    onClick={onClick}
  >
    <span className="block text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">{value}</span>
    <span className="block text-xs sm:text-sm font-medium text-gray-700">{title}</span>
  </div>
);

// FlightDetailsCard component
const FlightDetailsCard = ({ flight, onClose }) => (
  <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-md">
    <button
      className="text-red-500 font-semibold text-sm mb-2 hover:text-red-700"
      onClick={onClose}
    >
      Close
    </button>
    <div className="space-y-2">
      <div className="flex flex-col space-y-1">
        {[
          { label: "Schedule Date:", value: flight.scheduleDate },
          { label: "Flight Number:", value: flight.flightNumber },
          { label: "Airline Code:", value: flight.prefixIATA },
          { label: "Service Type:", value: flight.serviceType },
          { label: "Flight ID:", value: flight.id },
          { label: "Average Fare:", value: flight.avgFare }
        ].map((item, index) => (
          <div className="flex items-center" key={index}>
            <span className="font-medium text-gray-900 w-32">{item.label}</span>
            <span className="text-gray-700">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// FlightCard component
const FlightCard = ({ flight, toggleDetails, isDetailsVisible, onDelete }) => {
  const {
    flightDirection,
    route,
    scheduleDateTime,
    estimatedLandingTime,
    airline,
    flightDuration,
    flightName,
    id,
    avgFare
  } = flight;

  const destinations = route?.destinations || [];
  const departureAirport = flightDirection === "D" ? "AMS" : destinations[0];
  const arrivalAirport = flightDirection === "A" ? "AMS" : destinations[destinations.length - 1];

  // Delete operation
  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        const response = await axios.delete('http://localhost:5000/api/flights/delete-flight', {
          data: { id }
        });

        if (response.data.message === 'Flight deleted successfully.') {
          Swal.fire("Deleted!", "Your flight has been deleted.", "success");
          onDelete(id);
        } else {
          Swal.fire("Error!", "There was a problem deleting your flight.", "error");
        }
      }
    } catch (error) {
      Swal.fire("Error!", "There was a problem deleting your flight.", "error");
    }
  };

  // Class selection
  const handleClassSelect = (className) => {
    Swal.fire({
      title: "Ticket Purchased!",
      text: `Your selected class: ${className}`,
      icon: "success",
      confirmButtonText: "OK"
    });
  };

  return (
    <div className="relative">
      <div className="bg-white border border-gray-300 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 shadow-md transition-transform duration-500 ease-in-out">
        <IconButton className="absolute top-1 right-2 text-red-600 hover:text-red-700" onClick={handleDelete}>
          <CloseIcon />
        </IconButton>
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-none">
              <img src={ThyLogo} alt="Thy Logo" className="w-20 h-auto mb-2" />
            </div>
            <div className="flex-1 ml-2 sm:ml-4 mt-1">
              <div className="flex items-center justify-between text-gray-900 font-medium text-lg sm:text-xl">
                <span>{estimatedLandingTime} - {scheduleDateTime}</span>
              </div>
              <div className="flex flex-col sm:flex-row text-gray-900 text-xs sm:text-sm mt-1 sm:mt-2 space-y-1 sm:space-y-0 sm:space-x-4">
                <div className="flex flex-col flex-1">
                  <span className="font-sans font-semibold">{airline}</span>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-sans">Nonstop</span>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-sans">{departureAirport} to {arrivalAirport}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row text-gray-900 text-xs sm:text-sm mt-1 sm:mt-2 space-y-1 sm:space-y-0 sm:space-x-4">
                <button className="flex items-center text-blue-500" onClick={toggleDetails}>
                  Flight Details <ExpandMoreIcon className="ml-1" />
                </button>
                <span className="font-sans">{flightDuration}</span>
                <span className="font-sans">{flightName}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4 mt-2">
          <ClassOptions title="Economy" value="$156" onClick={() => handleClassSelect("Economy")} />
          <ClassOptions title="Economy Flexible" value="$256" onClick={() => handleClassSelect("Economy Flexible")} />
          <ClassOptions title="First" value="$356" onClick={() => handleClassSelect("First")} />
        </div>
      </div>
      {isDetailsVisible && <FlightDetailsCard flight={flight} onClose={toggleDetails} />}
    </div>
  );
};

FlightCard.propTypes = {
  flight: PropTypes.object.isRequired,
  toggleDetails: PropTypes.func.isRequired,
  isDetailsVisible: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired
};

// MyFlightsCard component
const MyFlightsCard = () => {
  const [flightData, setFlightData] = useState([]);
  const [selectedFlightId, setSelectedFlightId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch flight data from API
  const fetchFlightData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/flights/get-flight/");
      const flights = response.data;

      // Check for duplicate IDs
      const uniqueFlights = flights.filter((flight, index, self) =>
        index === self.findIndex((f) => f.id === flight.id)
      );

      const updatedFlights = uniqueFlights.map(flight => ({
        ...flight,
        airline: getAirlineNameFromIATA(flight.prefixIATA),
        scheduleDateTime: formatTime(flight.scheduleDateTime),
        estimatedLandingTime: formatTime(flight.estimatedLandingTime),
        flightDuration: calculateFlightDuration(flight.scheduleDateTime, flight.estimatedLandingTime),
        avgFare: flight.avgFare
      }));

      setFlightData(updatedFlights);
    } catch (error) {
      console.error("Error fetching flight data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlightData();
  }, [fetchFlightData]);

  return (
    <div className="flex flex-col space-y-4">
      {loading ? (
        <Spin />
      ) : (
        flightData.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            toggleDetails={() => setSelectedFlightId(flight.id === selectedFlightId ? null : flight.id)}
            isDetailsVisible={flight.id === selectedFlightId}
            onDelete={(id) => setFlightData((prev) => prev.filter(flight => flight.id !== id))}
          />
        ))
      )}
    </div>
  );
};

export default MyFlightsCard;
