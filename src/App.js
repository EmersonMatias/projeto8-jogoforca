import "./reset.css"
import "./style.css"
import palavras from "./palavras.js"
import forca0 from "./img/forca0.png"
import forca1 from "./img/forca1.png"
import forca2 from "./img/forca2.png"
import forca3 from "./img/forca3.png"
import forca4 from "./img/forca4.png"
import forca5 from "./img/forca5.png"
import forca6 from "./img/forca6.png"
import { useState } from "react"

export default function App() {
    const alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    const [PalavraSorteada, setPalavraSorteada] = useState(null)
    const [TemPalavra, setTemPalavra] = useState(false)
    const [Ativa, setAtiva] = useState(false)
    const [NumeroErros, setErros] = useState(0)
    const [LetrasClicadas, setLetrasClicadas] = useState([])
    const [PalavraEscondida, setPalavraEscondida] = useState("")
    const [Chute, setChute] = useState("")

    function SortearPalavra() {
        let Palavra = palavras[Math.floor(Math.random() * 231)]

        setPalavraSorteada(Palavra)


        let i = 0
        while (i < Palavra.length) {
            Palavra = Palavra.replace(Palavra[i], "_")
            i++
        }



        setPalavraEscondida(Palavra)
        setAtiva(true)
        setTemPalavra(true)
        setErros(0)
    }

    function erros() {
        let img;

        if (NumeroErros === 0) {
            img = forca0
        }
        if (NumeroErros === 1) {
            img = forca1
        }
        if (NumeroErros === 2) {
            img = forca2
        }
        if (NumeroErros === 3) {
            img = forca3
        }
        if (NumeroErros === 4) {
            img = forca4
        }
        if (NumeroErros === 5) {
            img = forca5
        }
        if (NumeroErros === 6) {
            img = forca6

            setErros("P")
            setPalavraEscondida(PalavraSorteada)
            setAtiva(false)
            setTemPalavra(false)
            setLetrasClicadas([])
            setTimeout(() => {
                alert("QUE PENA, VOCÊ PERDEU! Caso queira jogar novamente, aperte o botão Escolher Palavra")

            }, 200);
        }
        if (NumeroErros === "P") {
            img = forca6
        }

        if (PalavraEscondida === PalavraSorteada && NumeroErros !== "P") {
            setAtiva(false)
            setPalavraEscondida(PalavraSorteada)
            setPalavraSorteada("X")
            setTemPalavra(false)
            setLetrasClicadas([])
            setTimeout(() => {
                alert("PARABÉNS, VOCÊ GANHOU! Caso queira jogar novamente, aperte o botão Escolher Palavra")

            }, 200);
        }


        return img
    }

    function Chutar() {
        if (Chute === PalavraSorteada) {
            setAtiva(false)
            setPalavraEscondida(PalavraSorteada)
            setPalavraSorteada("X")
            setTemPalavra(false)
            setLetrasClicadas([])
            setTimeout(() => {
                alert("Caso queira jogar novamente, aperte o botão Escolher Palavra")

            }, 200);
            setChute("")
        } else if (Chute !== PalavraSorteada) {
            setErros(6)
            setChute("")
        }
    }

    function LetraClicada(letraDigitada) {
        setLetrasClicadas([...LetrasClicadas, letraDigitada])

        const ListaPalavraSorteada1 = PalavraSorteada.normalize('NFD').replace(/[\u0300-\u036f]/g, "").split("")
        const ListaPalavraSorteada2 = PalavraSorteada.split("")


        let MontaPalavra = PalavraEscondida;

        if ((ListaPalavraSorteada1.includes(letraDigitada.toLowerCase())) === true) {
            ListaPalavraSorteada1.forEach((letra, index) => {
                if (letra === letraDigitada.toLowerCase()) {
                    function PonhaLetra(str, index, replacement) {
                        return str.substr(0, index) + replacement + str.substr(index + replacement.length)
                    }
                    MontaPalavra = PonhaLetra(MontaPalavra, index, ListaPalavraSorteada2[index])
                    setPalavraEscondida(MontaPalavra)
                }
            })

        } else {
            setErros(NumeroErros + 1)
        }
    }

    function EscolheCor() {
        if (NumeroErros === "P") {
            return "PalavraEscolhida Red"
        } else if (PalavraSorteada === "X") {
            return "PalavraEscolhida Green"
        } else if (PalavraSorteada !== null) {
            return "PalavraEscolhida"
        }
    }


    return (
        <>
            <main>
                <div className="Top">
                    <div className="Forca">
                        <img className="ImgForca" src={erros()} alt="Imagem" data-identifier="game-image"/>
                    </div>
                    <div className="EscolherPalavra">
                        <button
                            onClick={TemPalavra === false ? SortearPalavra : () => alert("Sua palavra já foi sorteada")}
                            data-identifier="choose-word">
                            Escolher Palavra
                        </button>
                        <div className={PalavraSorteada === null ? "PalavraEscolhida Hidden" : EscolheCor()}
                        data-identifier="word">
                            {PalavraEscondida}</div>
                    </div>
                </div>

                <div className="Bottom">
                    <div className="Teclado">
                        {alfabeto.map((letra, index) =>
                            <button
                                onClick={() => LetraClicada(letra)}
                                disabled={Ativa === false || LetrasClicadas.includes(letra) === true ? true : false}
                                className={Ativa === false || LetrasClicadas.includes(letra) === true ? "Letra LetraDesativada" : "Letra"}
                                data-identifier="letter"
                                key={index}> {letra}
                            </button>)}
                    </div>

                    <div className="Chute">
                        <p>Já sei a palavra!</p>
                        <input
                            disabled={Ativa === false ? true : false}
                            className={Ativa === false ? "InputDesativado" : ""}
                            onChange={(e) => setChute(e.target.value)}
                            value={Chute}
                            data-identifier="type-guess"
                        >
                        </input>
                        <button
                            onClick={Chutar}
                            disabled={Ativa === false ? true : false}
                            className={Ativa === false ? "BotaoDesativado" : ""}
                            data-identifier="guess-button">
                            Chutar
                        </button>
                    </div>
                </div>
            </main>
        </>
    )


}


