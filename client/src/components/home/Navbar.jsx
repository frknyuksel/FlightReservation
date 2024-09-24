import React from 'react';
import { Link } from 'react-router-dom';
import { FlightTakeoffRounded } from '@mui/icons-material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';  // Deals için ikon
import TravelExploreIcon from '@mui/icons-material/TravelExplore';  // Discover için ikon
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AvatarImage from '../../assets/AvatarImage.png';

export default function Navbar() {
    return (
        <header className="text-[#640D5F] body-font bg-gray-200">  {/* Arka plan rengi ve metin rengi ayarlandı */}
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
                {/* Sol Taraf: Logo ve Başlık */}
                <Link to="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <FlightTakeoffRounded className="text-[#640D5F] text-xl" />
                    <span className="ml-3 text-[#640D5F]">PLANE SCAPE</span>
                </Link>

                {/* Sağ Taraf: Bağlantılar ve Avatar */}
                <div className="flex items-center md:ml-auto">
                    <nav className="flex flex-wrap items-center text-base justify-center">
                        {/* Deals için LocalOfferIcon kullanımı */}
                        <Link to="/" className="mr-5 transition-colors duration-200 flex items-center text-[#640D5F] hover:text-[#5A0F5F] ">
                            <LocalOfferIcon className="mr-1 text-[#640D5F]" />  {/* Deals ikonunu ekledik */}
                            DEALS
                        </Link>
                        {/* Discover için TravelExploreIcon kullanımı */}
                        <Link to="/" className="mr-5 transition-colors duration-200 flex items-center text-[#640D5F] hover:text-[#5A0F5F] ">
                            <TravelExploreIcon className="mr-1 text-[#640D5F]" />  {/* Discover ikonunu ekledik */}
                            DISCOVER
                        </Link>
                    </nav>
                    <Stack src="/" direction="row" spacing={2} className="ml-4">
                        <Avatar alt="User Avatar" src={AvatarImage} />
                        <span className="text-xs md:text-sm font-bold flex items-center text-[#640D5F]">MARTIN EDEN</span>
                    </Stack>
                </div>
            </div>
        </header>
    );
}
