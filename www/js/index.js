function acessarBanco(){
    return new localdb('database');
}

function criarTabela(){
    var db = acessarBanco();
    db.createTable('registro_paciente');
}

function verificarTabela(){
    var db = acessarBanco();
    if(db.tableExists('registro_paciente') == 'false') return criarTabela();
    else return console.log('A tabela já existe');
}

function salvarDados(){
    var db = acessarBanco();

    var Nome = document.getElementById('nome').value;
    var Idade = document.getElementById('idade').value;
    var Telefone = document.getElementById('telefone').value;
    var EspecialidadeMedica = document.getElementById('especialidade_medica').value;
    var Pagamento = document.getElementById('pagamento').value;
    
    if(!Nome || !Idade || !Telefone || !EspecialidadeMedica || !Pagamento) return alert('Preencha todos os campos!');

    db.insert('registro_paciente', {'nome': Nome, 'idade': Idade, 'telefone': Telefone, 'especialidade_medica': EspecialidadeMedica, 'pagamento': Pagamento});
    location.reload();
}

function mostrarDados(){
    var db = acessarBanco();
    var dados = JSON.parse(db.exportData('registro_paciente'));
    var total_registros = parseInt(dados.totalrows);
    var resultado_html = document.getElementById('resultado');

    for(let i = 1; i<=total_registros; i++){
        var find = db.findById('registro_paciente', i);

        var tr = document.createElement('tr');
        tr.addEventListener('click', function(){
            var id = dados.rows[i].ID;

            document.getElementById('nome').value = dados.rows[i].nome;
            document.getElementById('idade').value = dados.rows[i].idade;
            document.getElementById('telefone').value = dados.rows[i].telefone;
            document.getElementById('especialidade_medica').value = dados.rows[i].especialidade_medica;
            document.getElementById('pagamento').value = dados.rows[i].pagamento;

            alterar(id);
        });

        if(find.ID != undefined){
            var tdNome = document.createElement('td');
            tdNome.innerHTML = find.nome;
    
            var tdIdade = document.createElement('td');
            tdIdade.innerHTML = find.idade;
    
            var tdTelefone = document.createElement('td');
            tdTelefone.innerHTML = find.telefone;
    
            var tdEspecialidadeMedica = document.createElement('td');
            tdEspecialidadeMedica.innerHTML = find.especialidade_medica;
    
            var tdPagamento = document.createElement('td');
            tdPagamento.innerHTML = find.pagamento;
    
            tr.appendChild(tdNome);
            tr.appendChild(tdIdade);
            tr.appendChild(tdTelefone);
            tr.appendChild(tdEspecialidadeMedica);
            tr.appendChild(tdPagamento);
            resultado_html.appendChild(tr);
        };
    };
};

function alterar(id){
    var db = acessarBanco();

    var botao_atualizar = document.getElementById('botao_atualizar');
    botao_atualizar.addEventListener('click', function(){
        var novoNome = document.getElementById('nome').value;
        var novaIdade = document.getElementById('idade').value;
        var novoTelefone = document.getElementById('telefone').value;
        var novaEspecialidadeMedica = document.getElementById('especialidade_medica').value;
        var novoPagamento = document.getElementById('pagamento').value;

        db.updateById('registro_paciente', {'nome': novoNome, 'idade': novaIdade, 'telefone': novoTelefone, 'especialidade_medica': novaEspecialidadeMedica, 'pagamento': novoPagamento}, id);
        location.reload();
    });

    var botao_excluir = document.getElementById('botao_cancelar');
    botao_excluir.addEventListener('click', function(){
        excluir(id);
    });
}

function excluir(id){
    var db = acessarBanco();
    db.removeById('registro_paciente', id);
    location.reload();
}

window.onload = acessarBanco;
window.onload = verificarTabela;
window.onload = mostrarDados;

var botao_agendar = document.getElementById('botao_agendar');
botao_agendar.addEventListener('click', ()=>{
    salvarDados();
});