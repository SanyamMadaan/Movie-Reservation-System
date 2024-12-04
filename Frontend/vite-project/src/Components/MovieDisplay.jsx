import { useState ,useEffect } from "react"
import Navbar from "./Navbar";
export default function MovieDisplay(){
    
    const [movies,setMovies]=useState([]);

    return(
        <>
    <Navbar />
    <div>
        <hr/>
        <div className="movie-list p-10 bg-white border-2 border-white rounded-2xl ">
            <h1 className="font-bold text-xl p-5">
                Movies in 
            </h1>
            {movies.map((movie)=>{
                return(
                 <div className="grid grid-cols-3">
                    <Card className="movie-card" id={movie.id} name={movie.name} language={movie.language} image={movie.image}></Card>
                 </div>
                    
                )
            })}
        </div>
    </div>
    </>
    )
}