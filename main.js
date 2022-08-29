var id = 0
var banco = []

// 1º PASSO: FUNÇÃO PARA LIMPAR O MEU ARRAY DE ALUNOS (ESSA FUNÇÃO VAI SERVIR DE APOIO P/ A FUNÇÃO ATUALIZAR)

const limparAlunos = () => {
    const list = document.getElementById('addAluno')
    while(list.firstChild){
        list.removeChild(list.lastChild)
    }
}

// 2º PASSO: FUNÇÃO PARA ATUALIZAR MINHA TELA DE CADASTRO (ESSA FUNÇÃO VAI CADASTRAR O MEU INPUT NA TELA - BANCO > TELA)

const atualizar = () =>{
    limparAlunos();
    banco.forEach(item => criarAluno(item.id, item.nome, item.nota1,item.nota2,item.nota3,item.nota4))
}

// 3º PASSO: FUNÇÃO ANÔNIMA PARA RECEBER OS DADOS E ARMAZENAR EM NOSSO BANCO DE DADOS (banco[])

const addItem = (evento) =>{
    const tecla = evento.key
    if (tecla === 'Enter') {
        let list = document.getElementsByClassName('input')
        banco.push({'id': id, 'nome': list[0].value, 'nota1': list[1].value, 'nota2': list[2].value, 'nota3': list[3].value, 'nota4': list[4].value})
        id += 1
        atualizar()
        
        for (let x = 0; x < list.length; x++) {
            list[x].value = ''
            
        }
    }
}

document.getElementsByClassName('input')[0].addEventListener('keypress', addItem)
document.getElementsByClassName('input')[1].addEventListener('keypress', addItem)
document.getElementsByClassName('input')[2].addEventListener('keypress', addItem)
document.getElementsByClassName('input')[3].addEventListener('keypress', addItem)
document.getElementsByClassName('input')[4].addEventListener('keypress', addItem)

// 4º PASSO: FUNÇÃO INSERIR OS DADOS NA TELA

const criarAluno = (id, nome, n1, n2, n3, n4) => {

    if (id < 10) {
        id += 1

        const aluno = document.createElement('tr')
        aluno.innerHTML =
        `<tr>
            <th scope="row">${id}</th>
            <td><input type="text" value="${nome}" ></td>
            <td><input type="number" name="nota" min="0" max="100" value="${n1}"></td>
            <td><input type="number" name="nota" min="0" max="100" value="${n2}"></td>
            <td><input type="number" name="nota" min="0" max="100" value="${n3}"></td>
            <td><input type="number" name="nota" min="0" max="100" value="${n4}"></td>
            <td name="media" class="center"></td>
            <td name="situacao" class="center">
                <div name="circle" class="circle"></div>
            </td>
        </tr>`
        document.getElementById('addAluno').appendChild(aluno)
    }

}

// 5° FUNÇÃO PARA CALCULAR A MÉDIA DOS ALUNOS

function calcular() {
    let notas = document.getElementsByName('nota')
    let media = document.getElementsByName('media')
    let situacao = document.getElementsByName('circle')
    let m = 0
    let soma = 0
    let count1 = 0
    let count2 = 0
    let mediaTotal = 0

    for (let x = 0; x < notas.length; x++) {
        let nota = Number(notas[x].value)
        soma += nota
        count1 += 1
        if (count1 == 4) {
            m = soma / 4
            media[count2].innerText = m

            if (m >= 70) {
                situacao[count2].style.background = 'green'
            }else if (m < 70 && m > 50) {
                situacao[count2].style.background = 'orange'
            }else{
                situacao[count2].style.background = 'red'
            }
            
            mediaTotal += m

            soma = 0
            count1 = 0
            count2 += 1
        }
    }

    document.getElementById('mt').innerText = (mediaTotal / count2).toFixed(2)
}

