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