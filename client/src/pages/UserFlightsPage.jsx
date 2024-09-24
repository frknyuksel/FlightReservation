import React from 'react';
import SortBy from '../common/SortBy';
import AvgFare from '../common/AvgFare';
import MyFlightsCard from '../components/cards/userflightcards/MyFlightsCard';
import Navbar from '../components/home/Navbar';

const MyFlightsPage = () => {

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="flex justify-between p-4 mt-5 ">
                <SortBy />
                <AvgFare />
            </div>
            <div className="container mx-auto p-4">
                <div className="flex justify-center mt-10">
                    <MyFlightsCard />
                </div>
            </div>
        </div>

    );
};

export default MyFlightsPage;
