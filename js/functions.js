$(document).ready(function(){
	//consumindo a api:
    $.ajax({
		url: 'https://api.blinktrade.com/api/v1/BRL/ticker',
		dataType: 'jsonp',
		success: function(fox){
	    		$("#compra_cotacao").val(fox.buy);
	    		$("#venda_cotacao").val(fox.sell);
	    		$("#cotacao_compra").val(fox.buy);	
	    		$("#cotacao_venda").val(fox.sell);
	    		$("#cotacao_compra1").val(buy);
		}
	});
	var alert = '<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">'+
					'<div class="modal-dialog modal-sm">'+
						'<div class="modal-content">'+
							'<div class="modal-header">'+
								'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
								'<h4 class="modal-title" id="myModalLabel">Ops!</h4>'+
							'</div>'+
							'<div class="modal-body">Preencha os campos corretamente.</div>'+
						'</div>'+
					'</div>'+
				'</div>';
	$(".nconversao1").click(function(){
		$(this).addClass("active");
		$(".ncalculo_lucro").removeClass("active");
		$(".nconversao2").removeClass("active");
	});
	$(".ncalculo_lucro").click(function(){
		$(this).addClass("active");
		$(".nconversao1").removeClass("active");
		$(".nconversao2").removeClass("active");
	});
	$(".nconversao2").click(function(){
		$(this).addClass("active");
		$(".nconversao1").removeClass("active");
		$(".ncalculo_lucro").removeClass("active");
	});
	// funação para converter de real para bitcoin:
	$("#enviar1").click(function(){
		var cotacao_compra = $("#cotacao_compra").val();
		var valor_compra = $("#valor_compra").val();
		var resultado = (valor_compra / cotacao_compra).toFixed(8);
		$('.aviso').html('');
		if(cotacao_compra == 0 || valor_compra == 0){
			$(".aviso").html(alert);
			$('.modal-content').addClass('success');
		}else{
			$(".conversao").html("<div class='alert alert-success' role='alert'><strong>A quantidade em bitcoin é: </strong>"+resultado+"</div>");
			$("#qtd_comprada").val(resultado);
			$("#compra_cotacao").val(cotacao_compra);	
		}
	});
	// função para calcular lucro ou perda:
	$("#enviar2").click(function(){
		var qtd_comprada = $("#qtd_comprada").val();
		var compra_cotacao = $("#compra_cotacao").val();
		var venda_cotacao = $("#venda_cotacao").val();
		var venda_btc = qtd_comprada - (qtd_comprada * 0.25 / 100); 
		var valor_pago = qtd_comprada * compra_cotacao;
		var venda_bruta = ((venda_btc - (venda_btc * 0.25 / 100)) * venda_cotacao);
		var venda_minima = venda_cotacao - (venda_btc * 0.25 / 100);
		var lucro = (venda_bruta - (qtd_comprada * compra_cotacao));
		var saldo = valor_pago + lucro;
		var em_btc = saldo / venda_cotacao;
		$('.aviso').html('');
		if(qtd_comprada == 0 || compra_cotacao == 0 && venda_cotacao == 0){
			$('.aviso').html(alert);
			$('.modal-content').addClass('primary');
		}else if(compra_cotacao == 0){
			var preco = qtd_comprada * venda_cotacao;
			$(".calculo_lucro1").html("<div class='alert alert-info' role='alert'><strong> O valor da venda foi R$ </strong>"+preco.toFixed(2)+"</div>");
			$(".calculo_lucro2").html("");
			$(".calculo_lucro3").html("");
		}else if(venda_cotacao == 0){
			var preco = qtd_comprada * compra_cotacao;
			$(".calculo_lucro1").html("<div class='alert alert-info' role='alert'><strong> O valor da compra foi R$ </strong>"+preco.toFixed(2)+"</div>");
			$(".calculo_lucro2").html("");
			$(".calculo_lucro3").html("");
		}else{
			if(lucro > 0){
				$(".calculo_lucro1").html("<div class='alert alert-success' role='alert'><strong> O lucro é de R$ </strong>"+lucro.toFixed(8)+"</div>");
				$(".calculo_lucro2").html("<div class='alert alert-info' role='alert'><strong> O saldo é R$ </strong>"+saldo.toFixed(2)+" (฿ "+em_btc.toFixed(8)+"), <strong>na cotação R$ </strong>"+venda_cotacao+".</div>");
				$(".calculo_lucro3").html("<div class='alert alert-info' role='alert'><strong> O saldo inical foi R$ </strong>"+valor_pago.toFixed(2)+"</div>");
			}else if(lucro == 0){
				$(".calculo_lucro1").html("<div class='alert alert-info' role='alert'><strong>Vendido a preço da custo.</strong></div>");
				$(".calculo_lucro2").html("");
				$(".calculo_lucro3").html("");
			}else{
				$(".calculo_lucro1").html("<div class='alert alert-danger' role='alert'><strong>A perda é de R$ </strong>"+(lucro * (-1)).toFixed(8)+"</div>");
				$(".calculo_lucro2").html("");
				$(".calculo_lucro3").html("");
			}
		}	
	});
 	// função para converter de bitcoin para real:
	$("#enviar3").click(function(){
		var qtd_btc = $("#qtd_btc").val();
		var cotacao_venda = $("#cotacao_venda").val();
		var resultado = (qtd_btc * cotacao_venda).toFixed(8);
		$('.aviso').html('');
		if(qtd_btc ==  0 || cotacao_venda == 0){
			$('.aviso').html(alert);
			$('.modal-content').addClass('danger');
		}else{
			$(".conversao1").html("<div class='alert alert-success' role='alert'><strong>O valor é R$ </strong>"+resultado+"</div>");
		}
		
	});
	$("#enviar4").click(function(){
		var lucro_desejado = parseFloat($("#lucro_desejado").val()) + 0.5;
		var cotacao_compra1 = parseFloat($("#cotacao_compra1").val());
		var soma_lucro = (cotacao_compra1 * lucro_desejado) / 100;
		var resultado = parseFloat(cotacao_compra1) + parseFloat(soma_lucro); 
		$('.aviso').html('');
		if(cotacao_compra1 ==  0 || lucro_desejado == 0){
			$('.aviso').html(alert);
			$('.modal-content').addClass('primary');
		}else{
			$(".lucro_desejado").html("<div class='alert alert-success' role='alert'><strong>O indicado para venda é R$ </strong>"+resultado.toFixed(2)+"</div>");
			$("#compra_cotacao").val(cotacao_compra1);	
		}
	});
	//função para atualizar os valores:
	$("#atualizar").click(function(){
 		location.reload();
 	});
	// funções para limpar as div de resultado:
	$(".l1").click(function(){
		$(".conversao").html("");
	});
	$(".l2").click(function(){
		$(".calculo_lucro1").html("");
		$(".calculo_lucro2").html("");
		$(".calculo_lucro3").html("");
	});
	$(".l3").click(function(){
		$(".conversao1").html("");
	});
	$(".l4").click(function(){
		$(".lucro_desejado").html("");
	});
});	
