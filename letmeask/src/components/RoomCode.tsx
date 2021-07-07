
import copyImg from "../assets/images/copy.svg";
import "../styles/room-code.scss";

type RoomCodeProps = {
    code: string;
}

export function RoomCode({code} : RoomCodeProps){

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(code)
    }

    return (
        <button className="room-code">
            <div>
                <img src={copyImg} alt="Copy Room Code" />
            </div>
            <span>Sala #{code}</span>
        </button>
    );
}