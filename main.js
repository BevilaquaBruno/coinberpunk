"use strict";
function main() {
  axios({url: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,ripple&vs_currencies=brl,usd&include_last_updated_at=true" })
  .then(function (res) {
    let dt, plus;
    //BTC
    document.getElementById('title_here').innerText = res.data.bitcoin.brl.toLocaleString('pt-BR')+';'+
      res.data.ethereum.brl.toLocaleString('pt-BR')+';'+
      res.data.ripple.brl.toLocaleString('pt-BR');
    dt = new Date(res.data.bitcoin.last_updated_at * 1000);
    plus = "GMT"+((dt.getHours() >= dt.getUTCHours() )? "+": "-");
    document.getElementById('btc_value').innerHTML = "<div class=\"col-sm-12\">R$ "+res.data.bitcoin.brl.toLocaleString('pt-BR')+" | "+
      "$ "+res.data.bitcoin.usd.toLocaleString('pt-BR')+
      "<br>"+dt.toLocaleString('pt-BR')+'&nbsp;'+plus+(dt.getTimezoneOffset() / 60)+"</div>";
    //ETH
    dt = new Date(res.data.ethereum.last_updated_at * 1000);
    plus = "GMT"+((dt.getHours() >= dt.getUTCHours() )? "+": "-");
    document.getElementById('eth_value').innerHTML = "<div class=\"col-sm-12\">R$ "+res.data.ethereum.brl.toLocaleString('pt-BR')+" | "+
      "$ "+res.data.ethereum.usd.toLocaleString('pt-BR')+
      "<br>"+dt.toLocaleString('pt-BR')+'&nbsp;'+plus+(dt.getTimezoneOffset() / 60)+"</div>";
    //XRP
    dt = new Date(res.data.ripple.last_updated_at * 1000);
    plus = "GMT"+((dt.getHours() >= dt.getUTCHours() )? "+": "-");
    document.getElementById('xrp_value').innerHTML = "<div class=\"col-sm-12\">R$ "+res.data.ripple.brl.toLocaleString('pt-BR')+" | "+
      "$ "+res.data.ripple.usd.toLocaleString('pt-BR')+
      "<br>"+dt.toLocaleString('pt-BR')+'&nbsp;'+plus+(dt.getTimezoneOffset() / 60)+"</div>";
  }).catch(function (err) {
    console.error(err);
  });
}

function changeTitle() {
  switch (document.title.split(':')[0]) {
    case 'BTC':
      document.title = 'ETH: R$ '+document.getElementById('title_here').innerText.split(';')[1];
      break;
    case 'ETH':
      document.title = 'XRP: R$ '+document.getElementById('title_here').innerText.split(';')[2];
      break;
    case 'XRP':
      document.title = 'BTC: R$ '+document.getElementById('title_here').innerText.split(';')[0];
      break;
    default:
      document.title = 'BTC: R$ '+document.getElementById('title_here').innerText.split(';')[0];
      break;
  }
}

setInterval(main, 15000);
setInterval(changeTitle, 3000);
window.onload = function () {
  main();
}

