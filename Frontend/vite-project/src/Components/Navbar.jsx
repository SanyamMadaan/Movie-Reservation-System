import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [city, setCity] = useState("India");
    const [searchmovie,setMovie]=useState("");

    const navigate=useNavigate();

    useEffect(() => {
        async function getUserCity() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        console.log("Location found");
                        const { latitude, longitude } = position.coords;

                        console.log("Latitude:", latitude);
                        console.log("Longitude:", longitude);

                        // Reverse Geocoding to get City Name
                        try {
                            const response = await fetch(
                                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                            );
                            const data = await response.json();
                            console.log("Geolocation API Response:", data);
                            if (data.city) {
                                setCity(data.city);
                            } else if (data.locality) {
                                setCity(data.locality);
                            } else {
                                setCity("Unknown Location");
                            }
                        } catch (error) {
                            console.error("Error fetching city:", error);
                            setCity("Error in fetching city");
                        }
                    },
                    (error) => {
                        console.error("Geolocation error:", error);
                        setCity("Location access denied");
                    }
                );
            } else {
                console.error("Geolocation not supported");
                setCity("Geolocation not supported");
            }
        }

        getUserCity();
    }, []);

    async function FilterMovies(){

    }

    return (
        <div className="bg-white">
            <div className="flex p-5 w-full">
                <div className="w-1/4">
                    <button onClick={()=>navigate('/login')}className="status font-semibold text-sm border-2 p-2 px-4 cursor-pointer border-black bg-black text-white rounded-sm">
                        Login
                    </button>
                </div>
                <div className="searchbar w-2/4 mx-5 flex">
                    <input
                        className="border-2 p-2 w-3/4 border-black"
                        type="text"
                        placeholder="Search Movie, actor or director"
                        onChange={(e)=>setMovie(e.target.value)}
                    />
                    <button onClick={()=>FilterMovies} className="border-2 w-1/4 cursor-pointer p-2 border-l-0 bg-black text-white font-semibold  border-black">
                        Find
                    </button>
                </div>
                <div className="location w-1/4 mx-5">
                    <select className="p-2 border-2 border-black font-semibold">
                        <option value="Current-Location" selected="selected">
                            {city + " (current location)"}
                        </option>
                        <option value="Delhi">Delhi</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Faridabad">Faridabad</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Pune">Pune</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
