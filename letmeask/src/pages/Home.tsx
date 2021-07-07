import illustrationImg from "../assets/images/illustration.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import logoImg from "../assets/images/logo.svg";

import { database } from "../services/firebase";
import { useHistory } from "react-router-dom";
import { Button } from "../components/Button";
import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import "../styles/auth.scss";


export function Home() {

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [ roomCode , setRoomCode ] = useState("");

    async function handleCreateRoom() {
        if(!user) {
            await signInWithGoogle();
        }

        history.push("/rooms/new");
    }

    async function hadleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === "") {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            alert("ERRO: Room does not exists.");
            return;
        }

        history.push(`/rooms/join/${roomCode}`);

    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire dúvidas da sua audiência em tempo-real</p> 
            </aside>
            <main>
                <div className="main-content"> 
                    <img src={logoImg} alt="Letmeask" />
                    <Button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </Button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={hadleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
}