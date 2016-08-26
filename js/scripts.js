function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    exibirDados([position.coords.latitude,position.coords.longitude],'2');
}

window.onload = getLocation;

function pedeRequisicao(url){
	var requisicao = new XMLHttpRequest();
	requisicao.open("GET",url, false);
	requisicao.send();
	var resultado = JSON.parse(requisicao.responseText);


	return resultado;
}

function converterTemperatura(temperatura){
	return (temperatura - 32) / 18;
}

function modificaHTML(id,conteudo){
	document.getElementById(id).innerHTML += conteudo;
}

function converterHora(hora){
	var date = new Date(hora*1000);
	// Hours part from the timestamp
	var hours = date.getHours();
	// Minutes part from the timestamp
	var minutes = "0" + date.getMinutes();
	// Seconds part from the timestamp
	var seconds = "0" + date.getSeconds();

	// Will display time in 10:30:23 format
	var formattedTime = hours + ':' + minutes.substr(-2);

	return formattedTime;
}

function limparHTML(id){
	document.getElementById("city").innerHTML = "";
	document.getElementById("descricao").innerHTML = "";
	document.getElementById("imgIcon").innerHTML = "";
	document.getElementById("tempAtual").innerHTML = "";
	document.getElementById("tempMinima").innerHTML = "Temperatura mínima : ";
	document.getElementById("tempMaxima").innerHTML = "Temperatura máxima : ";
	document.getElementById("nascerDoSol").innerHTML = "Nascer do Sol : ";
	document.getElementById("porDoSol").innerHTML = "Por do Sol : ";
	document.getElementById("latitude").innerHTML = "Latitude : ";
	document.getElementById("longitude").innerHTML = "Longitude : ";
}

var contador = 0;

function exibirDados(dados,tipo){
      var listaCidades = ["","","","",""];

			limparHTML();
			var resultado ="";
			var latitude = "";
			var longitude = "";
      var nomeCidade = "";

			if(tipo == 1){
				nomeCidade = document.getElementById('nomeCidade').value;
				resultado = pedeRequisicao("http://api.openweathermap.org/data/2.5/weather?q="+nomeCidade+"&metric=unit?&APPID=667a1c5b39280a306e500f7c25c9cf09");
				latitude = resultado.coord.lat;
				longitude = resultado.coord.lon;
			}else{
				if(tipo == 2){
					latitude = dados[0];
					longitude = dados[1];
					resultado = pedeRequisicao("http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=667a1c5b39280a306e500f7c25c9cf09");
					nomeCidade = resultado.name;
				}else{
          if(tipo == 3){
            nomeCidade = dados;
            resultado = pedeRequisicao("http://api.openweathermap.org/data/2.5/weather?q="+nomeCidade+"&metric=unit?&APPID=667a1c5b39280a306e500f7c25c9cf09");
            latitude = resultado.coord.lat;
            longitude = resultado.coord.lon;
          }
        }
			}

      if(contador==5){
        contador = 0;
      }
      else {
        listaCidades[contador] = resultado.name;
        console.log(listaCidades[contador]);
      }

    // var stringTeste = "<a href='#' onClick='exibirDados('\""+listaCidades[contador]+"\"')'>"+listaCidades[contador]+"</a>"

    var teste10 = ''+resultado.name+'';


    modificaHTML("listarCidades","<a href=\"#\" onclick=\"exibirDados('"+nomeCidade+"',"+3+")\">"+listaCidades[contador]+"</a><br/>");



			var enderecoIcone = "http://openweathermap.org/img/w/"+resultado.weather[0].icon+".png";
			var traducao = pedeRequisicao("https://www.googleapis.com/language/translate/v2?key=AIzaSyD7wuclhSp5RpF7bxHq0G2_PsiqTpuAc-0&q="+resultado.weather[0].description+"&source=en&target=pt-br");

			document.getElementById('image-bg').style.backgroundImage="url(https://maps.googleapis.com/maps/api/streetview?size=400x800&location="+resultado.coord.lat+","+resultado.coord.lon+"&fov=200&heading=305&pitch=10&key=AIzaSyD7wuclhSp5RpF7bxHq0G2_PsiqTpuAc-0)";

			modificaHTML("city",resultado.name);
			modificaHTML("descricao",traducao.data.translations[0].translatedText);

			modificaHTML("imgIcon","<img src="+enderecoIcone+" width='100px'/>");


			modificaHTML("tempAtual",parseInt(converterTemperatura(resultado.main.temp)) +  " °C");
			modificaHTML("tempMinima",parseInt(converterTemperatura(resultado.main.temp_min)) +  " °C");
			modificaHTML("tempMaxima",parseInt(converterTemperatura(resultado.main.temp_max)) +  " °C");
			modificaHTML("nascerDoSol",converterHora(resultado.sys.sunrise));
			modificaHTML("porDoSol",converterHora(resultado.sys.sunset));

			modificaHTML("latitude",latitude);
			modificaHTML("longitude",longitude);

			initialize(latitude,longitude);

			var d = document.getElementById("teste");
			d.classList.remove("ocultar");
      //d.classList.add("wow");
      //d.classList.add("wobble");
			d.classList.add("exibir");

			var d2 = document.getElementById("teste2");
			d2.classList.remove("ocultar");
      //d.classList.add("wow");
      //d.classList.add("wobble")
			d2.classList.add("exibir");

      var d3 = document.getElementById("listaCidades");
      d3.classList.remove("ocultar");
      //d.classList.add("wow");
      //d.classList.add("wobble")
      d3.classList.add("exibir");

      contador++;



}
