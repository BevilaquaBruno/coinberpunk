"use strict";
function openUrl(url) {
  window.open(url, '_blank');
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

async function changeTitle() {
  await (function () {
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
  })();
}

setInterval(main, 15000);
setInterval(changeTitle, 3000);
window.onload = function () {
  var slide_wrp 		= "side-menu-wrapper"; //Menu Wrapper
  var open_button 	= "menu-open"; //Menu Open Button
  var close_button 	= "menu-close"; //Menu Close Button
  var overlay 		= "menu-overlay"; //Overlay

  //$(slide_wrp).hide().css( {"right": -$(slide_wrp).outerWidth()+'px'}).delay(50).queue(function(){$(slide_wrp).show()});
  var els = document.getElementsByClassName(slide_wrp);
  Array.prototype.forEach.call(els,function (el) {
    el.style.right = -el.offsetWidth+'px';
    el.style.display = 'none';
    el.style.display = 'block';
    /*setTimeout(function () {
      el.style.display = 'block';
    },50);*/
  });

  /*$(open_button).click(function(e){
    e.preventDefault();
    $(slide_wrp).css( {"right": "0px"});
    setTimeout(function(){
      $(slide_wrp).addClass('active');
    },50);
    $(overlay).css({"opacity":"1", "width":"100%"});
  });*/
  els = document.getElementsByClassName(open_button);
  Array.prototype.forEach.call(els, (el) => {
    el.addEventListener('click', () => {
      let els2 = document.getElementsByClassName(slide_wrp);
      Array.prototype.forEach.call(els2, (el2) => {
        el2.style.right = '0px';
        setTimeout(() => {
          el2.classList.add('active')
        }, 50);
      });
      els2 = document.getElementsByClassName(overlay);
      Array.prototype.forEach.call(els2, (el2) => {
        el2.style.opacity = '1';
        el2.style.width = '100%';
      });
    });
  });

  /*$(close_button).click(function(e){
    e.preventDefault();
    $(slide_wrp).css( {"right": -$(slide_wrp).outerWidth()+'px'});
    setTimeout(function(){
      $(slide_wrp).removeClass('active');
    },50);
    $(overlay).css({"opacity":"0", "width":"0"});
  });*/
  els = document.getElementsByClassName(close_button);
  Array.prototype.forEach.call(els, (el) => {
    el.addEventListener('click', () => {
      let els2 = document.getElementsByClassName(slide_wrp);
      Array.prototype.forEach.call(els2, (el2) => {
        el2.style.right = -el2.offsetWidth+'px';
        setTimeout(() => {
          el2.classList.remove('active');
        }, 50);
      });
      els2 = document.getElementsByClassName(overlay);
      Array.prototype.forEach.call(els2, (el2) => {
        el2.style.opacity = '0';
        el2.style.width = '0';
      });
    });
  });

  /*$(document).on('click', function(e) {
    if (!e.target.closest(slide_wrp) && $(slide_wrp).hasClass("active")){
      $(slide_wrp).css( {"right": -$(slide_wrp).outerWidth()+'px'}).removeClass('active');
      $(overlay).css({"opacity":"0", "width":"0"});
    }
  });*/
  document.body.addEventListener('click', (e) => {
    if (!e.target.closest('.'+slide_wrp) && document.getElementsByClassName(slide_wrp)[0].classList.contains('active')) {
      let els = document.getElementsByClassName(slide_wrp);
      Array.prototype.forEach.call(els, (el) => {
        el.style.right = -el.offsetWidth+'px';
        el.classList.remove('active');
      });
      els = document.getElementsByClassName(overlay);
      Array.prototype.forEach.call(els, (el) => {
        el.style.opacity = '0';
        el.style.width = '0';
      });
    }
  });
  main();
}