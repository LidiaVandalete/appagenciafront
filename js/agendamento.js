
obterAgencias();

function obterAgencias() {
    //este cara vai buscar os dados no banco de dados e trazer


    // usar fetch() para isso
    let res = fetch('http://localhost:8080/agencias')
        .then(res => res.json())
        .then(res => preencheAgencias(res));

}

function preencheAgencias(res) {
    let agencias;

    for (let index = 0; index < res.length; index++) {
        agencias = agencias + `<option value = ${res[index].id}>${res[index].nome_agencia}</option>`;
    }
    document.getElementById("sel_agencias").innerHTML = agencias;
}

function getInformacoes(event) {

    event.preventDefault(); //não faça o comportamento padrão de datr um get (enviar o formulário)

    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let cel = document.getElementById('cel').value;
    let agencia = document.getElementById('sel_agencias').value;
    let data = document.getElementById('data').value;
    let hora = document.getElementById('hora').value;
    let obs = document.getElementById('obs').value;

    if (!nome || !email || !cel || !agencia || !data || !hora) {
        document.getElementById("nok").hidden = false;
        document.getElementById("ok").hidden = true;
    } else {

        let lista = {
            nome_cli: nome,
            email_cli: email,
            celular_cli: cel,
            hora_agendamento: hora,
            data_agendamento: data,
            observacao: obs,
            agencia: {
                id: agencia
            }
        }

        let cabecalho = {
            method: 'POST',
            body: JSON.stringify(lista), //pega a variavel criada e transforma em JSON
            headers: {
                'Content-type': 'application/json'
            }
        }

        //este é o comando que manda essas informações la para o servidor, como se fosse o Postman.
        //quando voltar a resposta, faz o que está no then
        fetch('http://localhost:8080/agendamento/novo', cabecalho)
            .then(res => validarOk(res)); // atribui-se o nome res a resposta, usou numa função arrow que ativarpa a função de tratar a resposta
    }

}

function validarOk(res) {
    if (res.status == 200) {
        document.getElementById("ok").hidden = false;
        document.getElementById("nok").hidden = true;
    }
}