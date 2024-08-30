const fs = require('fs');
const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ.,;!?'.split('');
const message = readText();
const dists = [];



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

    // Encontrar possíveis comprimentos de key
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

    function desciprit(message, key) {
        const charList = message.split('');
        const charListD = [];
        const stringCaracteres = alpha.join('');

        for (const c of charList) {
            const charM = c.toUpperCase();
            const letterP = stringCaracteres.indexOf(charM);
            const i = (letterP + key) % alpha.length;
            let charD = stringCaracteres[i];

            if (c === '#') {
                charD = ' ';
            }

            charListD.push(charD);
        }

        return charListD.join('');
    }


    const comp = kasiskiComp(2, 5);
    console.log("Possíveis comprimentos de key e distâncias:");
    comp.forEach(item => {
        console.log(item.i, item.dis);
    });