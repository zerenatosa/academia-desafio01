function validaRenda(renda){
    if(renda > 1000){
        return true;
    }else{
        return false;
    }
}

function justificativa(){
    var renda = document.querySelector("#renda");
    renda.onblur= function(){
        console.log('saiu')
    }
}

var renda = document.querySelector("#renda");
console.log('aqui')
renda.onblur= function(){
    if (renda.value<=1000){
        console.log('saiu')
        var justificativa = document.querySelector("#justificativa");
        var justificativaLabel = document.querySelector("#justificativaLabel");
        console.log(justificativa.value)
        justificativa.classList.remove("invisivel");
        justificativaLabel.classList.remove("invisivel")
    }else{
        var justificativa = document.querySelector("#justificativa");
        var justificativaLabel = document.querySelector("#justificativaLabel");
        console.log(justificativa.value)
        justificativa.classList.add("invisivel");
        justificativaLabel.classList.add("invisivel")
    }
    
}