"use strict";
function openGithub() {
  window.open('https://www.github.com/bevilaquabruno/coinberpunk', '_blank');
}

async function main() {
  await axios({url: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,ripple,dogecoin&vs_currencies=brl,usd&include_last_updated_at=true" })
  .then(function (res) {
    let dt, lang = (navigator.language != '' && navigator.language != null)?navigator.language:'pt-BR';
    //BTC
    document.getElementById('title_here').innerText = res.data.bitcoin.brl.toLocaleString(lang)+';'+
      res.data.ethereum.brl.toLocaleString(lang)+';'+
      res.data.ripple.brl.toLocaleString(lang)+';'+
      res.data.dogecoin.brl.toLocaleString(lang);
    dt = new Date(res.data.bitcoin.last_updated_at * 1000);
    document.getElementById('btc_value').innerHTML = "<div class=\"col-sm-12\">R$ "+res.data.bitcoin.brl.toLocaleString(lang)+" | "+
      "$ "+res.data.bitcoin.usd.toLocaleString(lang)+
      "<br>"+dt.toLocaleString(lang)+"</div>";
    //ETH
    dt = new Date(res.data.ethereum.last_updated_at * 1000);
    document.getElementById('eth_value').innerHTML = "<div class=\"col-sm-12\">R$ "+res.data.ethereum.brl.toLocaleString(lang)+" | "+
      "$ "+res.data.ethereum.usd.toLocaleString(lang)+
      "<br>"+dt.toLocaleString(lang)+"</div>";
    //XRP
    dt = new Date(res.data.ripple.last_updated_at * 1000);
    document.getElementById('xrp_value').innerHTML = "<div class=\"col-sm-12\">R$ "+res.data.ripple.brl.toLocaleString(lang)+" | "+
      "$ "+res.data.ripple.usd.toLocaleString(lang)+
      "<br>"+dt.toLocaleString(lang)+"</div>";
    //DOGE
    dt = new Date(res.data.dogecoin.last_updated_at * 1000);
    document.getElementById('doge_value').innerHTML = "<div class=\"col-sm-12\">R$ "+res.data.dogecoin.brl.toLocaleString(lang)+" | "+
      "$ "+res.data.dogecoin.usd.toLocaleString(lang)+
      "<br>"+dt.toLocaleString(lang)+"</div>";
    let plus = "GMT"+((dt.getHours() >= dt.getUTCHours() )? "+": "-");
    document.getElementById('current_gmt').innerText = plus+(dt.getTimezoneOffset() / 60)
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
      document.title = 'DOGE: R$ '+document.getElementById('title_here').innerText.split(';')[3];
      break;
    case 'DOGE':
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

