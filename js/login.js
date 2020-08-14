function autenticar(event){

    event.preventDefault(); //não faça o comportamento padrão de datr um get (enviar o formulário)

    let usuario = document.getElementById('txtUsuario');
    let senha = document.getElementById('txtSenha');

    // criar um objeto para ser enviado como Json para o backend
    let loginMsg = {
        email: usuario.value,
        racf: usuario.value,
        senha: senha.value
    }
    let cabecalho = {
        method: 'POST',
        body: JSON.stringify(loginMsg), //pega a variavel criada e transforma em JSON
        headers:{
            'Content-type':'application/json'
        }
    }

    //este é o comando que manda essas informações la para o servidor, como se fosse o Postman.
    //quando voltar a resposta, faz o que está no then
    fetch('http://localhost:8080/login', cabecalho)
        .then(res => tratarResposta(res)); // atribui-se o nome res a resposta, usou numa função arrow que ativarpa a função de tratar a resposta
}

function tratarResposta(res){
    
    if(res.status == 200){
        res.json().then(res => fazerLogin(res));
    } else {
        document.getElementById("msgErro").innerHTML = "Usuário/senha inválidos.";
        document.getElementById("msgErro").hidden = false;
    }
}

function fazerLogin(res){
    localStorage.setItem("userLogged", JSON.stringify(res)); //cria uma variavel local para armazenar os dados do usuario que fez login
    window.location = "relatorio2.html";
}