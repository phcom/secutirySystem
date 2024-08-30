const fs = require('fs');
const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ.,;!?'.split('');
const message = readText();


    function readText() {
        try {
            const data = fs.readFileSync('cipher6.txt', 'utf8');
            // Remove caracteres não alfabéticos e coloca em letras maiúsculas
            return data.toUpperCase().replace(/[^A-Z]/g, ''); 

        } catch (err) {
            console.error('Arquivo não encontrado!');
            return '';
        }
    }

    function kasiskiRepeat(tam) {
        const repeats = {};
        
        // Encontra repetições de padrões no texto
        for (let i = 0; i <= message.length - tam; i++) {
            const p = message.substring(i, i + tam);
            if (repeats[p]) {
                repeats[p].push(i);
            } else {
                repeats[p] = [i];
            }
        }
        return repeats;
    }

    function kasiskiDist(repeats){
        const dists = [];
        for (let i = 0; i < repeats.length - 1; i++) {
            for (let j = i + 1; j < repeats.length; j++) {
                const d = repeats[j] - repeats[i];
                if (d > 0) {
                    dists.push(d);
                }
            }
        }
        return dists;
    }

    // Encontrar possíveis comprimentos de chave
    function kasiskiComp(keyMin, keyMax){
        const comp = [];

        for (let i = keyMin; i <= keyMax; i++) {
            const rep = kasiskiRepeat(i);
            const dis = kasiskiDist(rep);
            console.log(dis);
            if (dis.length > 0) {
                comp.push({ i, dis });
            }
        }
        return comp;
    }

    function descriptografar(message, chave) {
        const listaDeCaracteres = message.split('');
        const listaDeCaracteresDescriptografados = [];
        const stringCaracteres = this.alpha.join('');

        for (const c of listaDeCaracteres) {
            const letraMaiuscula = c.toUpperCase();
            const posicaoLetra = stringCaracteres.indexOf(letraMaiuscula);
            const indiceLetraDescriptografada = (posicaoLetra + chave) % this.alpha.length;
            let letraDescriptografada = stringCaracteres[indiceLetraDescriptografada];

            if (c === '#') {
                letraDescriptografada = ' ';
            }

            listaDeCaracteresDescriptografados.push(letraDescriptografada);
        }

        return listaDeCaracteresDescriptografados.join('');
    }


    const comp = kasiskiComp(2, 5);
    console.log("Possíveis comprimentos de chave e distâncias:");
    comp.forEach(item => {
        console.log(item.i, item.dis);
    });