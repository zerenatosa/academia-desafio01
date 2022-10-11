var botaoAdicionar = document.querySelector("#adicionar-cliente");
var botaoIncluirPacienteManualmente = document.querySelector("#buscar-pacientes4")
var botaomostrarclientes = document.querySelector("#mostrar-clientes");
var botaoesconderclientes = document.querySelector("#esconder-clientes");

botaoesconderclientes.addEventListener("click", function(event){
    event.preventDefault();
    escondeTabelaClientes()
})

botaomostrarclientes.addEventListener("click", function(event){
    event.preventDefault();
    mostraTabelaClientes();
})


botaoIncluirPacienteManualmente.addEventListener("click", function(event){
    event.preventDefault();
    mostraAdicionaPacientesManualmente();
    escondeTabelaClientes();

})

botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();
    var form = document.querySelector("#form-adiciona")
    var cliente = obtemClienteDoForm(form);
    console.log(cliente.cpf);
    console.log(cliente.data_nascimento);
    console.log(cliente.nome);
    console.log(cliente.renda);
    var valorRenda = validaRenda(cliente.renda);
    if (!valorRenda){
        console.log('validou a renda')
        var justificativa = document.querySelector("#justificativa");
        if (justificativa.value.length <=0){
            console.log('vc deve incluir a justifcatvia')
            alert('Você informou uma renda menor que R$ 1.000,00. Inclua uma justificativa')
            removeInvisivel();
            justificativa.focus();
            return;
        }else{
            adicionaClienteNaTabela(cliente);
            AddInvisivel();
            form.reset();  
        }
    }else{
        adicionaClienteNaTabela(cliente);
        AddInvisivel();
        form.reset();  
    }

    //faz mostrar a tabela que contém os clientes
    var containerInicial = document.querySelector("#containerInicial");
    containerInicial.classList.remove("invisivel")
/*     var containerIncialSemPacientes = document.querySelector("#containerNaoPossuiClientes");
    containerIncialSemPacientes.classList.add("invisivel") */
    somaRenda();
    escondeAdicionaPacientesManualmente();
    mostraTabelaClientes();

});

function obtemClienteDoForm(form){
    
    if (form.justificativa.value.length>0){
        textoJustificativa = form.justificativa.value + " - indicio de trabalho escravo"
    }else{
        textoJustificativa = "renda maior que mil"
    }
    var cliente = {
        cd_clientes: 1,
        nome : form.nome.value,
        cpf : form.cpf.value,
        renda : form.renda.value,
        data_nascimento : form.data_nascimento.value,
        idade : calculaIdade(form.data_nascimento.value), 
        justificativa: textoJustificativa,
        matricula:'f6.666.666-6'
    }
    console.log('aqui vai idade ' + cliente.idade)
    
    var f = cliente.renda.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    console.log('valor em moeda' + f)
    return cliente;
}

function montaTr(cliente){

  
    var clienteTr = document.createElement("tr");
    clienteTr.classList.add("cliente");

    var nomeTd = montaTd(cliente.nome, "info-nome")
    var cpfTd = montaTd(cliente.cpf,"info-cpf")
    var rendaTd = montaTd(cliente.renda,"info-renda")
    var dataDeNascimentoTd = montaTd(cliente.data_nascimento, "info-data-de-nascimento")
    var idadeTd = montaTd(cliente.idade,"info-idade");
    var justificativaTd = montaTd(cliente.justificativa, "info-justificativa")
    
    

    nomeTd.textContent = cliente.nome;
    cpfTd.textContent = cliente.cpf;
    rendaTd.textContent = cliente.renda;
    dataDeNascimentoTd.textContent = cliente.data_nascimento;
    idadeTd.textContent = cliente.idade;
    justificativaTd.textContent = cliente.justificativa;
    
    value = parseInt(rendaTd.textContent);
    var price = value.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    })

console.log('price' + price)

rendaTd.textContent = price;

    
/*     var formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    }) */

    
    


    clienteTr.appendChild(cpfTd);
    clienteTr.appendChild(nomeTd);
    clienteTr.appendChild(dataDeNascimentoTd);
    clienteTr.appendChild(rendaTd);
    clienteTr.appendChild(idadeTd);
    clienteTr.appendChild(justificativaTd);
    

    var justificativa = document.querySelector("#justificativa");
    if (justificativa.value.length>0){
        clienteTr.classList.add("destaqueTexto")
    }

    return clienteTr;
 
}

function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}



function validaCliente(cliente){

    var erros = [];

    if(!validaRenda(cliente.renda)){
        erros.push("renda inválida. deve ser superior a R$ 1.000,00")
    }

    return erros;
    
}


function exibeMensagemDeErro(erros){
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML="";
    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    })
}

function adicionaClienteNaTabela(cliente){

    var clienteTr = montaTr(cliente) ; 
    var tabela = document.querySelector("#tabela-clientes");
    tabela.appendChild(clienteTr);  
}

function calculaIdade(dataDeNascimento){
    var ano_atual = new Date().getFullYear();
    var ano_nascimento = new Date(dataDeNascimento).getFullYear();
    total = ano_atual - ano_nascimento;
    return total;
}


var botaoDeletar = document.querySelector("#info-bt");

botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();


})

function escondeTabelaClientes(){
    var containerInicial = document.querySelector("#containerInicial");
    containerInicial.classList.add("invisivel")
}

function mostraTabelaClientes(){
    var containerInicial = document.querySelector("#containerInicial");
    containerInicial.classList.remove("invisivel")
/*     var containerIncialSemPacientes = document.querySelector("#containerNaoPossuiClientes");
    containerIncialSemPacientes.classList.add("invisivel") */
    var containerInicial2 = document.querySelector("#containerAdicionaPacinetes");
    containerInicial2.classList.add("invisivel")
}

function mostraAdicionaPacientesManualmente(){
    var containerInicial2 = document.querySelector("#containerAdicionaPacinetes");
    containerInicial2.classList.remove("invisivel")
}


var cancelarAdicionarPaciente = document.querySelector('#cancelarAdicionarPaciente')
console.log(cancelarAdicionarPaciente)
cancelarAdicionarPaciente.addEventListener("click",function(event){
    event.preventDefault();
    escondeAdicionaPacientesManualmente();
} );

function escondeAdicionaPacientesManualmente(){
    var form = document.querySelector("#form-adiciona")
    form.reset(); 
    var containerInicial2 = document.querySelector("#containerAdicionaPacinetes");
    containerInicial2.classList.add("invisivel")
    
}