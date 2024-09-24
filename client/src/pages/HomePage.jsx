import { useState, useEffect } from "react";
import Navbar from "../components/home/Navbar.jsx"
import SearchCard from "../components/cards/SearchCard.jsx";
import FilterFlights from "../components/cards/filtercards/FilterFlights.jsx";
import NewsCard from "../components/cards/NewsCards.jsx";
import FlightsCard from "../components/cards/FlightsCards.jsx";

const HomePage = () => {
    const [airlines, setAirlines] = useState([]); // Havayolu şirketlerini saklayacak state
    const [selectedAirline, setSelectedAirline] = useState(null); // Seçilen havayolu filtreleme

    const handleSearchClick = () => {

        setTimeout(() => {
            // Simulate loading time
        }, 2500); // Minimum loading süresi (4.5 saniye)
    };

    const handleAirlinesUpdate = (airlines) => {
        setAirlines(airlines); // Havayolu verilerini güncelle
    };

    const handleAirlineSelect = (selectedAirline) => {
        setSelectedAirline(selectedAirline); // Seçilen havayolu güncelle
    };

    // ! Sayfanın başlangıçtaki estetik görünümü adına oluşturulmuştur, small ekran görünümü için bu alanı kaldırmanız gerekir.
    useEffect(() => {
        // Sayfa yüklenirken 'overflow-hidden' sınıfını body'ye ekle
        document.body.classList.add("overflow-hidden");

        // Bileşen unmount olduğunda sınıfı kaldır
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);
    // ! Sayfanın başlangıçtaki estetik görünümü adına koyulmuştur, small ekran görünümü için bu alanı kaldırmanız gerekir.

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex flex-col md:flex-row md:space-x-4 p-4 mt-6">
                <div className="flex flex-col flex-grow">
                    <SearchCard onSearchClick={handleSearchClick} />
                    <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
                        <div className="md:hidden mb-4">
                            <FilterFlights
                                airlines={airlines}
                                onAirlineSelect={handleAirlineSelect} // Seçim değişikliğini üst bileşene bildir
                            />
                        </div>
                        <div className="flex flex-col md:w-2/3">
                            <div className="h-96 overflow-y-auto">
                                <FlightsCard
                                    onAirlinesUpdate={handleAirlinesUpdate}
                                    selectedAirline={selectedAirline} // Seçilen havayolu bilgisini geç
                                />
                            </div>
                        </div>
                        <div className="flex-col md:w-1/3 md:block hidden">
                            <FilterFlights
                                airlines={airlines}
                                onAirlineSelect={handleAirlineSelect} // Seçim değişikliğini üst bileşene bildir
                            />
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex flex-col md:space-y-4 space-y-2">
                    <NewsCard />
                </div>
            </div>

        </div>
    );
};

export default HomePage;
