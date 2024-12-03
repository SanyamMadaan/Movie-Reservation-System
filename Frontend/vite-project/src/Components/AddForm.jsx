import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export function AddForm() {
  const params = useParams();
  const page = params.page; // 'movie' or 'theatre'
  const navigate = useNavigate();

  // Common States
  const [button, setButton] = useState("Add");

  // Movie States
  const [movieTitle, setMovieTitle] = useState("");
  const [languages, setLanguages] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [date, setDate] = useState([]);
  const [timings, setTimings] = useState([]);

  // Theatre States
  const [theatreName, setTheatreName] = useState("");
  const [location, setLocation] = useState("");

  const UploadFile = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "images_preset");

    try {
      let cloudName = "dv3vxqkwd";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const saveForm = async (e) => {
    e.preventDefault();
    setButton("Adding...");
    const imageUrl = await UploadFile(); // Upload image if applicable

    const token = localStorage.getItem("adminToken");
    try {
      let payload = {};
      if (page === "movie") {
        payload = {
          title: movieTitle,
          languages,
          price,
          image: imageUrl,
          date,
          timings,
        };
      } else if (page === "theatre") {
        payload = {
          name: theatreName,
          location,
          image: imageUrl,
        };
      }

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/${page}/add`,
        payload,
        {
          headers: {
            admintoken: token,
          },
        }
      );

      alert(`${page === "movie" ? "Movie" : "Theatre"} added successfully!`);
      navigate(`/${page}s`);
    } catch (error) {
      console.error("Error adding:", error);
      alert(`Error adding ${page}`);
    } finally {
      setButton("Add");
    }
  };

  return (
    <div className="flex flex-col items-center bg-black h-screen">
      <h1 className="text-3xl font-semibold mb-5 text-white">
        Add New {page === "movie" ? "Movie" : "Theatre"}
      </h1>
      <form
        onSubmit={saveForm}
        className="bg-white border border-gray-300 rounded-lg p-6 w-96"
      >
        {page === "movie" ? (
          <>
            {/* Movie Inputs */}
            <div className="mb-4">
              <label
                htmlFor="movieTitle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Movie Title
              </label>
              <input
                id="movieTitle"
                type="text"
                className="border border-gray-300 rounded-lg p-3 w-full"
                onChange={(e) => setMovieTitle(e.target.value)}
                placeholder="Enter movie title"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="languages"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Languages
              </label>
              <input
                id="languages"
                type="text"
                className="border border-gray-300 rounded-lg p-3 w-full"
                onChange={(e) => setLanguages(e.target.value)}
                placeholder="Enter languages"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                className="border border-gray-300 rounded-lg p-3 w-full"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                required
              />
            </div>
          </>
        ) : (
          <>
            {/* Theatre Inputs */}
            <div className="mb-4">
              <label
                htmlFor="theatreName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Theatre Name
              </label>
              <input
                id="theatreName"
                type="text"
                className="border border-gray-300 rounded-lg p-3 w-full"
                onChange={(e) => setTheatreName(e.target.value)}
                placeholder="Enter theatre name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                className="border border-gray-300 rounded-lg p-3 w-full"
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                required
              />
            </div>
          </>
        )}

        {/* File Upload Field */}
        <div className="mb-4">
          <label
            htmlFor="file-upload"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {page === "movie" ? "Movie" : "Theatre"} Image
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".jpeg,.png,.jpg"
            className="border border-gray-300 rounded-lg p-3 w-full"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
          >
            {button}
          </button>
        </div>
      </form>
    </div>
  );
}
