import { useNavigate } from "react-router-dom"
export default function Welcome(){
    const navigate=useNavigate();
    return(
        <>
        <div className="buttons flex p-2 m-2 justify-end ">
            <button className="status font-semibold text-sm border-2 mx-2 p-2 px-4 cursor-pointer border-black bg-black text-white rounded-sm" onClick={()=>navigate('/add/movie')}>Add Movie</button>
            <button className="status font-semibold text-sm border-2 p-2 px-4 cursor-pointer border-black bg-black text-white rounded-sm" onClick={()=>navigate('/add/theatre')}>Add Theatre</button>
        </div>
        <hr/>
        {/*Display movie logic here*/}
        </>
    )
}