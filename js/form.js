var botaoAdicionar = document.querySelector("#adicionar-cliente");

botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();
    var form = document.querySelector("#form-adiciona")
    var cliente = obtemClienteDoForm(form);
    console.log(cliente.cpf);
    console.log(cliente.dataDeNascimento);
    console.log(cliente.nome);
    console.log(cliente.renda);
    var valorRenda = validaRenda(cliente.renda);
    if (!valorRenda){
        console.log('validou a renda')
        var justificativa = document.querySelector("#justificativa");
        if (justificativa.value.length <=0){
            console.log('vc deve incluir a justifcatvia')
            alert('Você informou uma renda menor que R$ 1.000,00. Inclua uma justificativa')
            justificativa.focus();
        }else{
            adicionaClienteNaTabela(cliente);
            var justificativa = document.querySelector("#justificativa");
            var justificativaLabel = document.querySelector("#justificativaLabel");
            console.log(justificativa.value)
            justificativa.classList.add("invisivel");
            justificativaLabel.classList.add("invisivel")
            form.reset();  
        }
    }else{
        adicionaClienteNaTabela(cliente);
        var justificativa = document.querySelector("#justificativa");
        var justificativaLabel = document.querySelector("#justificativaLabel");
        console.log(justificativa.value)
        justificativa.classList.add("invisivel");
        justificativaLabel.classList.add("invisivel")
        form.reset();  
    }
somaRenda();
/*     var justificativa = document.querySelector("#justificativa");
    if (justificativa.value.length>0){

    }
 */

/*     var erros = validaCliente(cliente);
    console.log(erros)
    if(erros.length > 0){
        exibeMensagemDeErro(erros);
        return;
    }
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML=""; */ 
/*      adicionaClienteNaTabela(cliente);  
     form.reset();   */

});

function obtemClienteDoForm(form){
    
    if (form.justificativa.value.length>0){
        textoJustificativa = form.justificativa.value + " - indicio de trabalho escravo"
    }else{
        textoJustificativa = "renda maior que mil"
    }
    var cliente = {
        nome : form.nome.value,
        cpf : form.cpf.value,
        renda : form.renda.value,
        dataDeNascimento : form.dataDeNascimento.value,
        idade : calculaIdade(form.dataDeNascimento.value), 
        justificativa: textoJustificativa
    }
    console.log('aqui vai idade ' + cliente.idade)
    return cliente;
}

function montaTr(cliente){


    console.log('dentro da tr' + cliente.cpf);
    console.log('dentro da tr' + cliente.dataDeNascimento);
    console.log('dentro da tr' + cliente.nome);
    console.log('dentro da tr' + cliente.renda);
     
    var clienteTr = document.createElement("tr");
    clienteTr.classList.add("cliente");

    var nomeTd = montaTd(cliente.nome, "info-nome")
    var cpfTd = montaTd(cliente.cpf,"info-cpf")
    var rendaTd = montaTd(cliente.renda,"info-renda")
    var dataDeNascimentoTd = montaTd(cliente.dataDeNascimento, "info-data-de-nascimento")
    var idadeTd = montaTd(cliente.idade,"info-idade");
    var justificativaTd = montaTd(cliente.justificativa, "info-justificativa")
    

    nomeTd.textContent = cliente.nome;
    cpfTd.textContent = cliente.cpf;
    rendaTd.textContent = cliente.renda;
    dataDeNascimentoTd.textContent = cliente.dataDeNascimento;
    idadeTd.textContent = cliente.idade;
    justificativaTd.textContent = cliente.justificativa;

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
    /* var cpfTd
    var rendaTd
    var dataDeNascimentoTd

    var nomeTd = montaTd(paciente.nome, "info-nome");
    var pesoTd = montaTd(paciente.peso, "info-peso");
    var alturaTd = montaTd(paciente.altura, "info-altura");
    var gorduraTd = montaTd(paciente.gordura, "info-gordura");
    var imcTd = montaTd(paciente.imc, "info-imc");
    

    nomeTd.textContent    = paciente.nome;
    pesoTd.textContent    = paciente.peso
    alturaTd.textContent  = paciente.altura;
    gorduraTd.textContent = paciente.gordura;
    imcTd.textContent     = paciente.imc;

    pacienteTr.appendChild(nomeTd);
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);
    pacienteTr.appendChild(imcTd);

    return pacienteTr; */
 
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

/*     if(validaPeso(paciente.peso)){
         return true; 
    }else{
         return false; 
        erros.push("peso inválido");
    } */

  /*   if (validaAltura(paciente.altura)){

    }else{
        erros.push("altura inválida");
    }
    
    if (paciente.peso.length == 0){
        erros.push("peso não pode ser nulo");
    }

    if (paciente.gordura.length == 0){
        erros.push("gordura não pode ser nulo");
    }

    if(paciente.nome.length == 0){
        erros.push("nome não pode ser nulo");
    }

    if (paciente.altura.length == 0){
        erros.push("altura não pode ser nulo");
    }
 */

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
    console.log(tabela + "tabela")
    tabela.appendChild(clienteTr);  
}

function calculaIdade(dataDeNascimento){
/*     var idadeParse = new Date(dataDeNascimento)
    alert(idadeParse);
    var idade =  idadeParse + 10;
    alert(idade)
    return idade; */

    var dataDeNascimentoParse = new Date(dataDeNascimento);
    var dataDeHoje = new Date();
    var idade = dataDeHoje - dataDeNascimentoParse;
    var diferença = Math.abs(dataDeHoje.getTime() - dataDeNascimentoParse.getTime())
    var dia = 1000*60*60*24;
    alert('data é ' + idade)
    var total = Math.round(diferença/dia)
    alert('outra data é '  + total)
    return total;


} 