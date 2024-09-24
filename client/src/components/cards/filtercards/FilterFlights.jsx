import React, { useState } from "react";
import PropTypes from "prop-types";

const FilterFlights = ({ airlines, onAirlineSelect }) => {
    // Sorting options
    const selectOptions = [
        { value: "lowest-price", label: "Lowest Price" },
        { value: "highest-price", label: "Highest Price" },
        { value: "recommended", label: "Recommended" },
    ];

    // Default airline options
    const defaultAirlines = [
        { value: "turkish-airlines", label: "Turkish Airlines", price: "$230" },
        { value: "emirates", label: "Emirates", price: "$230" },
    ];

    // Create airline options
    const airlineOptions =
        airlines.length > 0
            ? airlines.map((airline) => ({
                value: airline.iataCode,
                label: `${airline.name} - $230`,
            }))
            : defaultAirlines;

    // Handle airline selection change
    const handleAirlineChange = (event) => {
        onAirlineSelect(event.target.value);
    };

    return (
        <div className="p-4 max-h-[500px] overflow-y-auto">
            {/* Filtering title */}
            <h2 className="text-lg font-bold mb-4">Filtering Options</h2>
            {/* Sorting option */}
            <FilterSelect options={selectOptions} />

            {/* Arrival time filter */}
            <div className="mb-4">
                <FilterRadioGroup
                    title="Arrival Time"
                    name="arrival-time"
                    options={[
                        { value: "5:00 AM - 11:59 AM", label: "5:00 AM - 11:59 AM" },
                        { value: "12:00 PM - 5:59 PM", label: "12:00 PM - 5:59 PM" },
                        { value: "6:00 PM - 11:59 PM", label: "6:00 PM - 11:59 PM" },
                    ]}
                />
            </div>

            {/* Stops filter */}
            <div className="mb-4">
                <FilterRadioGroup
                    title="Stops"
                    name="stops"
                    options={[
                        { value: "nonstop", label: "Nonstop", price: "$230" },
                        { value: "1-stop", label: "1 Stop", price: "$230" },
                        { value: "2+-stop", label: "2+ Stops", price: "$230" },
                    ]}
                />
            </div>

            {/* Airline filter */}
            <div className="mb-4">
                <FilterRadioGroup
                    title="Airlines Included"
                    name="airlines"
                    options={airlineOptions}
                    onChange={handleAirlineChange}
                />
            </div>

            <div className="mb-20">
                <FilterRange min={0} max={500} step={10} />
            </div>
        </div>
    );
};

const FilterSelect = ({ options = [] }) => (
    <div className="mb-4 relative">
        <label className="block text-sm font-bold text-gray-800">Sort by:</label>
        <div className="relative mt-1">
            <select className="block w-full p-2 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-purple-800 focus:border-purple-800 sm:text-sm appearance-none">
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                    className="w-5 h-5 text-purple-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
        </div>
    </div>
);

FilterSelect.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

const FilterRange = ({ min, max, step }) => {
    const [currentMin, setCurrentMin] = useState(min);

    const handleRangeChange = (event) => {
        const value = Number(event.target.value);
        setCurrentMin(value);
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-bold text-gray-800 mb-2">Price Range</label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={currentMin}
                onChange={handleRangeChange}
                className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-700 mt-1">
                <span>${currentMin}</span>
                <span>${max}</span>
            </div>
        </div>
    );
};

const FilterRadioGroup = ({ title, name, options, onChange }) => (
    <div className="mb-4">
        <h3 className="text-sm font-bold text-gray-800 mb-2">{title}</h3>
        <div className="flex flex-col space-y-2">
            {options.map((option) => (
                <label key={option.value} className="flex items-center">
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        className="mr-2 h-4 w-4 accent-purple-700 border border-purple-800 rounded-full appearance-none checked:bg-purple-700 checked:border-purple-700"
                        onChange={onChange}
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                    {option.price && (
                        <span className="ml-2 text-gray-500">{option.price}</span>
                    )}
                </label>
            ))}
        </div>
    </div>
);

export default FilterFlights;
