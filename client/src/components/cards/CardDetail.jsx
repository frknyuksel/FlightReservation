import React from 'react';
import formatTime from '../../utils/formatTime';

const FlightDetails = ({ flight, onClose }) => (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-md">
        {/* Kapatma butonu */}
        <button
            className="text-red-500 font-semibold text-sm mb-4 hover:text-red-700"
            onClick={onClose} // Kapatma butonuna tıklandığında onClose fonksiyonu çağrılır
        >
            Close
        </button>

        {/* Uçuş detayları */}
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                {/* Planlama tarihi ve saati */}
                <div className="flex items-center">
                    <span className="font-medium text-gray-500 w-32">Schedule Date:</span>
                    <span className="text-gray-700">{formatTime(flight.scheduleDateTime)}</span>
                </div>
                {/* Uçuş numarası */}
                <div className="flex items-center">
                    <span className="font-medium text-gray-900 w-32">Flight Number:</span>
                    <span className="text-gray-700">{flight.flightNumber}</span>
                </div>
                {/* Havayolu kodu */}
                <div className="flex items-center">
                    <span className="font-medium text-gray-900 w-32">Airline Code:</span>
                    <span className="text-gray-700">{flight.airlineCode}</span>
                </div>
                {/* Hizmet türü */}
                <div className="flex items-center">
                    <span className="font-medium text-gray-900 w-32">Service Type:</span>
                    <span className="text-gray-700">{flight.serviceType}</span>
                </div>
                {/* Uçuş adı */}
                <div className="flex items-center">
                    <span className="font-medium text-gray-900 w-32">Flight Name:</span>
                    <span className="text-gray-700">{flight.flightName}</span>
                </div>
            </div>
        </div>
    </div>
);

export default FlightDetails;
