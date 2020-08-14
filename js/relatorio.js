
function validaLogin() {

    let userTxt = localStorage.getItem('userLogged'); //pega no local storage se o usuario está logado

    if (!userTxt) {
        window.location = "index.html";
    }

    //trasnformar novamente o userTxt e JSON
    let jsonUser = JSON.parse(userTxt);

    //jogar dados no front
    document.getElementById("user").innerHTML = `<br>${jsonUser.nome} (${jsonUser.racf})`; // usar a crase serve para fazer uma string sem preciasr concatenar. utilizar ${variavel}
    document.getElementById("imgUser").innerHTML = `<img src="${jsonUser.linkFoto}">`;

    obterAgencias();
}



function logout() {
    localStorage.removeItem("userLogged");
    window.location = "index.html";
}

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

function coletarAgendamento(){

    //document.getElementById("campo_relatorio").hidden = false;

    let res = fetch('http://localhost:8080/agendamento')
        .then(res => res.json())
        .then(res => tabela(res));

    


}

function tabela(res){
    let status_ag = document.getElementById("check_ag").checked;
    let status_data = document.getElementById("check_data").checked;
    let status_cli = document.getElementById("check_cliente").checked;

    let dados_ag = document.getElementById("sel_agencias").value;
    let dados_data = document.getElementById("dataAgendamento").value;
    let dados_cli = document.getElementById("cliente").value;

    let lista_dados = [];

    document.getElementById("download-pdf").hidden = false;

    for (let i = 0; i < res.length; i++){
        lista_dados.push(res[i]);
    }
    
    var tabela_rel = new Tabulator("#tabela_relatorio", {
        data: lista_dados,           //load row data from array
        layout: "fitColumns",      //fit columns to width of table
        jsPDF:{
            unit:"in", //set units to inches
        },
        responsiveLayout: "hide",  //hide columns that dont fit on the table
        paginationSize: 2,         //allow 7 rows per page of data
        movableColumns: true,      //allow column order to be changed
        resizableRows: false,       //allow row order to be changed
        // // initialSort: [             //set the initial sort order of the data
        //     { column: "name", dir: "asc" },
        // ]
        columns: [                 //define the table columns
            { title: "Data",  field: "data_agendamento", width: 130, sorter: "date", hozAlign: "center" },
            { title: "Horário", field: "hora_agendamento", editor: "input" },
            { title: "Agencia", field: "agencia.nome_agencia", editor: "input" },
            { title: "id", field: "agencia.id", editor: "input" },
            { title: "Cliente", field: "nome_cli", editor: "input" },
            { title: "Telefone", field: "celular_cli", editor: "input" },
            { title: "E-mail", field: "email_cli", editor: "input" },
            { title: "Observacao", field: "observacao", editor: "input" },

        ],
    });

    
    if (status_ag == true){
        tabela_rel.setFilter("agencia.id", "=", dados_ag);
    }

    if (status_data == true){
        tabela_rel.setFilter("data_agendamento", "=", dados_data);
    }

    if (status_cli == true){
        tabela_rel.setFilter("nome_cli", "=", dados_cli);
    }

    // if (status_data == true){

    // }
    // if (status_cli == true){

    // }

    
    
    
    
    

}

// function baixarPdf(){

//     tabela_rel.download(
//         "pdf", "data.pdf", {
//             orientation:"portrait", //set page orientation to portrait
//             autoTable:function(doc){
//                 //doc - the jsPDF document object
        
//                 //add some text to the top left corner of the PDF
//                 doc.text("SOME TEXT", 1, 1);
        
//                 //return the autoTable config options object
//                 return {
//                     styles: {
//                         fillColor: [200, 00, 00]
//                     },
//                 };
//             },
//         }

//     );

// }

function CriaPDF() {
    var minhaTabela = document.getElementById('tabela_relatorio').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 20px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";
    // CRIA UM OBJETO WINDOW
    var win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><head>');
    win.document.write('<title>Empregados</title>');   // <title> CABEÇALHO DO PDF.
    win.document.write(style);                                     // INCLUI UM ESTILO NA TAB HEAD
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(minhaTabela);                          // O CONTEUDO DA TABELA DENTRO DA TAG BODY
    win.document.write('</body></html>');
    win.document.close(); 	                                         // FECHA A JANELA
    win.print();                                                            // IMPRIME O CONTEUDO
}



