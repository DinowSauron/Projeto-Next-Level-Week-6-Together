
import { useParams, useHistory } from "react-router-dom";

import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";
import { Button } from "../components/Button";
import { database } from "../services/firebase";
import { useRoom } from "../hooks/useRoom";
import { useAuth } from "../hooks/useAuth";

import deleteImg from "../assets/images/delete.svg";
import logoImg from "../assets/images/logo.svg";
import "../styles/room.scss"


type RoomParams = {
    id: string;
}

export function AdminRoom() {
    
    const {user} = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions, authorId } = useRoom(roomId);
    const history = useHistory();


    async function handleDeleteQuestion(questionId: string) {

        if( user?.id === authorId){
            if (window.confirm("Tem ceteza que deseja excluir esta pergunta?")) {
                await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
            }
        }else{
            alert("Você precisa ser o dono da sala para excluir perguntas!");
        }
    }

    async function handleEndRoom() {

        if( user?.id === authorId){
            if (window.confirm("Tem ceteza que deseja encerrar a sessão?")) {
                database.ref(`rooms/${roomId}`).update({
                    endedAt: new Date(),
                })
    
                history.push("/");
            }
        }else{
            alert("Você precisa ser o dono da sala para encerra-la!");
        }
    }
    

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logo letmeask" />
                    <div className="room-buttons">
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>

                    {(questions.length > 0) && (<span>{questions.length} Perguntas</span>)}
                </div>



                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover Pergunta" />
                                </button>

                            </Question>
                        )
                    })}
                </div>
                
            </main>
        </div>
    );
}
