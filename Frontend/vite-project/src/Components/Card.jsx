export default function Card({props}){
    return(
    <div className="border-1 border-black rounded-md">
        <div>
            <image src={props.image}></image>
        </div>
        <h2 className="font-semibold text-xl p-2 mb-1">{props.name}</h2>
        <h2 className="font-semibold text-xl p-2">U/A {props.language}</h2>
    </div>
    )

}