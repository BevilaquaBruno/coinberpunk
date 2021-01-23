"use strict";
function main() {
  /*let html = "<div class=\"col-sm-10 no-margin no-padding\">Retrieving data from Véio da Havan...</div>";
    document.getElementById('btc_value').innerHTML = html;
    document.getElementById('eth_value').innerHTML = html;
    document.getElementById('xrp_value').innerHTML = html;
    
    document.getElementById('btc_image').setAttribute('src',"spinner.svg");
    document.getElementById('eth_image').setAttribute('src',"spinner.svg");
    document.getElementById('xrp_image').setAttribute('src',"spinner.svg");*/
  axios({url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=bitcoin,ethereum,ripple" })
    .then(function (res) {
      const coins = res.data;
      coins.forEach(el => {
        document.getElementById(el.symbol+'_value').innerHTML = "<div class=\"col-sm-12\">R$ "+el.current_price.toLocaleString('pt-BR')+"</div>";
        document.getElementById(el.symbol+'_image').setAttribute('src', el.image);
      });
    }).catch(function (err) {
      console.error(err);
    });
}
setInterval(function () {
  main();
}, 15000);
window.onload = function () {
  main();
}

