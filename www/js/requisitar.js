function acessarBanco(){
    return new localdb('database');
}

function criarTabela(){
    var db = acessarBanco();
    db.createTable('registro_requisicao');
}

function verificarTabela(){
    var db = acessarBanco();
    if(db.tableExists('registro_requisicao') == 'false') return criarTabela();
    else return console.log('A tabela já existe');
}

function salvarDados(){
    var db = acessarBanco();
    var NomeMedico = document.getElementById('nome_medico').value;
    var Medicamento = document.getElementById('medicamento').value;
    var DataRequisicao = document.getElementById('data_requisicao').value;

    if(!NomeMedico || !medicamento || !DataRequisicao) return alert('Preencha todos os campos!');

    db.insert('registro_requisicao', {'nome_medico': NomeMedico, 'medicamento': Medicamento, 'data_requisicao': DataRequisicao});
    location.reload();
}

function mostrarDados(){
    var db = acessarBanco();
    var dados = JSON.parse(db.exportData('registro_requisicao'));
    var total_registros = parseInt(dados.totalrows);
    var html_resultado = document.getElementById('resultado_requisicao');

    for(let i = 1; i<=total_registros; i++){
        var find = db.findById('registro_requisicao', i);

        var tr = document.createElement('tr');
        tr.addEventListener('click', function(){
            var id = dados.rows[i].ID;

            document.getElementById('nome_medico').value = dados.rows[i].nome_medico;
            document.getElementById('medicamento').value = dados.rows[i].medicamento;
            document.getElementById('data_requisicao').value = dados.rows[i].data_requisicao;

            alterar(id);
        });

        if(find.ID != undefined){
            var tdNomeMedico = document.createElement('td');
            tdNomeMedico.innerHTML = find.nome_medico;
    
            var tdmedicamento = document.createElement('td');
            tdmedicamento.innerHTML = find.medicamento;
    
            var tdDataRequisicao = document.createElement('td');
            tdDataRequisicao.innerHTML = find.data_requisicao;
    
            tr.appendChild(tdNomeMedico);
            tr.appendChild(tdmedicamento);
            tr.appendChild(tdDataRequisicao);
            html_resultado.appendChild(tr);
        };
    };
};

function alterar(id){
    var db = acessarBanco();

    document.getElementById('divBotoes').removeAttribute('hidden');
    document.getElementById('botao_pedido').setAttribute('hidden', true)

    var botaoNova_requisicao = document.getElementById('botaoNova_requisicao');
    botaoNova_requisicao.addEventListener('click', function(){
        var novoNomeMedico = document.getElementById('nome_medico').value;
        var novoMedicamento = document.getElementById('medicamento').value;
        var novaDataRequisicao = document.getElementById('data_requisicao').value;

        db.updateById('registro_requisicao', {'nome_medico': novoNomeMedico, 'medicamento': novoMedicamento, 'data_requisicao': novaDataRequisicao}, id);
        location.reload();
    });

    var botaoCancelar_requisicao = document.getElementById('botaoCancelar_requisicao');
    botaoCancelar_requisicao.addEventListener('click', function(){
        excluir(id);
    });
}

function excluir(id){
    var db = acessarBanco();
    db.removeById('registro_requisicao', id);
    location.reload();
};

window.onload = acessarBanco;
window.onload = verificarTabela;
window.onload = mostrarDados;

var botao_pedido = document.getElementById('botao_pedido');
botao_pedido.addEventListener('click', ()=>{
    salvarDados();
});