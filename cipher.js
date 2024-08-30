const fs = require('fs');

class Cipher {

    constructor() {
        this.alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ.,;!?'.split('');
        this.message = this.readText();
    }

    readText() {
        try {
            const data = fs.readFileSync('cipher6.txt', 'utf8');

            // Remove caracteres não alfabéticos e coloca em letras maiúsculas
            return data.toUpperCase().replace(/[^A-Z]/g, ''); 

        } catch (err) {
            console.error('Arquivo não encontrado!');
            return '';
        }
    }

    kasiskiRepeat(tam) {
        const repeats = {};
       
        // Encontra repetições de padrões no texto
        for (let i = 0; i <= this.message.length - tam; i++) {
            const p = this.message.substring(i, i + tam);
            if (repeats[p]) {
                repeats[p].push(i);
            } else {
                repeats[p] = [i];
            }
        }

        return repeats;
    }

    kasiskiDist(repeats){
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
    kasiskiComp(keyMin, keyMax){
        const comp = [];

        for (let i = keyMin; i <= keyMax; i++) {
            const rep = this.kasiskiRepeat(i);
            const dis = this.kasiskiDist(rep);
            if (dis.length > 0) {
                comp.push({ i, dis });
            }
        }
        return comp;
    }
    
    descriptografar(message, chave) {
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

}

const cipher = new Cipher();
const comp = cipher.kasiskiComp(3, 6);
console.log("Possíveis comprimentos de chave e distâncias:");
comp.forEach(item => {
    console.log(`Comprimento: ${item.i}, Distâncias: ${item.dis}`);
});