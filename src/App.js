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
    console.log(PalavraSorteada)




    function SortearPalavra() {
        let Palavra = palavras[Math.floor(Math.random() * 231)]

        setPalavraSorteada(Palavra)


        let i = 0
        while (i < Palavra.length) {
            Palavra = Palavra.replace(Palavra[i], "_")
            i++
        }
        console.log(Palavra)


        setPalavraEscondida(Palavra)
        setAtiva(true)
        setTemPalavra(true)
        setErros(0)
    }

    function erros() {
        let img;

        let Test = PalavraEscondida.split("").includes("_")
        console.log(Test)




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
                alert("Cason queira jogar novamente, aperte o botão Escolher Palavra")

            }, 200);
        }
        if (NumeroErros === "P") {
            img = forca6

        }
        if (NumeroErros === "G") {
            img = forca0
        }
        if (PalavraEscondida === PalavraSorteada) {
            setAtiva(false)
            setPalavraEscondida(PalavraSorteada)
            setPalavraSorteada("X")
            setTemPalavra(false)
            setLetrasClicadas([])
            setTimeout(() => {
                alert("Caso queira jogar novamente, aperte o botão Escolher Palavra")

            }, 200);
        }


        return img
    }


    function LetraClicada(letra) {
        const a = PalavraSorteada.split("")
        setLetrasClicadas([...LetrasClicadas, letra])
        let ca = PalavraEscondida
        if (a.includes(letra.toLowerCase()) === true || a.includes("ã") === true || a.includes("é") === true || a.includes("í") === true
            || a.includes("á") === true || a.includes("à") === true || a.includes("ç") === true || a.includes("ê") === true || a.includes("ú") === true) {
            a.forEach((l, index) => {
                if (l === "ô" || l === "ó" || l === "ò" || l === "õ" || l === "â" || l === "á" || l === "à" || l === "ã" ||
                    l === "ê" || l === "é" || l === "è" || l === "ẽ" || l === "î" || l === "í" || l === "ì" || l === "ĩ" ||
                    l === "û" || l === "ú" || l === "ù" || l === "ũ" || l === "ç") {
                    function PonhaLetra(str, index, replacement) {
                        return str.substr(0, index) + replacement + str.substr(index + replacement.length)
                    }
                    ca = PonhaLetra(ca, index, l)
                    setPalavraEscondida(ca)
                } else if (l === letra.toLowerCase()) {
                    function PonhaLetra(str, index, replacement) {
                        return str.substr(0, index) + replacement + str.substr(index + replacement.length)
                    }
                    ca = PonhaLetra(ca, index, l)
                    setPalavraEscondida(ca)
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
                        <img className="ImgForca" src={erros()} alt="Imagem" />
                    </div>
                    <div className="EscolherPalavra">
                        <button onClick={TemPalavra === false ? SortearPalavra : () => alert("Sua palavra já foi sorteada")}>Escolher Palavra</button>
                        <div className={PalavraSorteada === null ? "PalavraEscolhida Hidden" : EscolheCor()}>{PalavraEscondida}</div>
                    </div>
                </div>
                {console.log(PalavraSorteada === PalavraEscondida)}
                <div className="Bottom">
                    <div className="Teclado">
                        {alfabeto.map((letra, index) =>
                            <button
                                onClick={() => LetraClicada(letra)}
                                disabled={Ativa === false || LetrasClicadas.includes(letra) === true ? true : false}
                                className={Ativa === false || LetrasClicadas.includes(letra) === true ? "Letra LetraDesativada" : "Letra"}
                                key={index}> {letra}
                            </button>)}
                    </div>

                    <div className="Chute">
                        <p>Já sei a palavra!</p>
                        <input disabled={Ativa === false ? true : false} className={Ativa === false ? "InputDesativado" : ""}></input>
                        <button disabled={Ativa === false ? true : false} className={Ativa === false ? "BotaoDesativado" : ""}>Chutar</button>
                    </div>
                </div>
            </main>
        </>
    )


}


