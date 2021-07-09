
import { useParams, useHistory } from "react-router-dom";

import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";
import { Button } from "../components/Button";
import { database } from "../services/firebase";
import { useRoom } from "../hooks/useRoom";
import { useAuth } from "../hooks/useAuth";

import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";
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
    const isAdmin = user?.id === authorId;


    async function handleDeleteQuestion(questionId: string) {

        if (isAdmin){
            if (window.confirm("Tem certeza que deseja excluir esta pergunta?")) {
                await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
            }
        } else {
            alert("Você precisa ser o dono da sala para excluir perguntas!");
        }
    }

    async function handleEndRoom() {
 
        if (isAdmin){
            if (window.confirm("Tem certeza que deseja encerrar a sessão?")) {
                database.ref(`rooms/${roomId}`).update({
                    endedAt: new Date(),
                })
    
                history.push("/");
            }
        } else {
            alert("Você precisa ser o dono da sala para encerra-la!");
        }
    }

    async function handleCheckAnsweredQuestion(questionId: string){
        if (isAdmin) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
                isAnswered: true,
            });
        } else {
            alert("Você precisa ser o dono da sala para responder perguntas!");
        }
    }

    async function handleHighlightQuestion(questionId: string){
        if (isAdmin) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
                isHighlighted: true,
            });
        } else {
            alert("Você precisa ser o dono da sala para deixar perguntas em destaque!");
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
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckAnsweredQuestion(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar Pergunta como respondida" />
                                        </button>

                                        <button     
                                            type="button"
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque a Pergunta" />
                                        </button>
                                    </>
                                )}

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
