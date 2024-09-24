import { CarRental, Hotel, BeachAccess } from '@mui/icons-material';
import Car from "../../assets/Car.jpeg";
import HotelImage from "../../assets/HotelImage.jpg";
import TravelPack from "../../assets/TravelPack.jpg";

// CustomCard component
const CustomCard = ({ src, alt, icon: Icon, iconText }) => {
    return (
        <div className="relative overflow-hidden rounded-lg max-w-[180px] max-h-[250px] md:max-w-[350px] md:max-h-[300px]"> {/* Boyutlar azaltıldı */}
            <img src={src} alt={alt} className="w-full h-full object-cover" />
            {Icon && (
                <div className="absolute bottom-0 left-0 p-2 text-white flex flex-col items-start bg-opacity-70 bg-[#640D5F]"> {/* Arka plan rengi ve opaklık eklendi */}
                    <Icon className="text-xl" />
                    <span className="w-auto">{iconText}</span>
                </div>
            )}
        </div>
    );
};

// NewsCards component
const NewsCards = () => {
    return (
        <div className="flex flex-row md:flex-col gap-8 bg-gray-100 p-4"> {/* Ekleme: padding eklenerek içeriklerin üstte kaymaması sağlandı */}
            <CustomCard
                src={Car}
                alt="Car Rentals"
                icon={CarRental}
                iconText="CAR RENTALS"
            />
            <CustomCard
                src={HotelImage}
                alt="Hotels"
                icon={Hotel}
                iconText="HOTELS"
            />
            <CustomCard
                src={TravelPack}
                alt="Travel Packages"
                icon={BeachAccess}
                iconText="TRAVEL PACKAGES"
            />
        </div>
    );
};

export default NewsCards;
