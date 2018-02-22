var imgArray = new Array();

imgArray[0] = new Image();
imgArray[0].src = '/images/backgrounds/bg1.png';


imgArray[1] = new Image();
imgArray[1].src = '/images/backgrounds/bg2.png';

imgArray[2] = new Image();
imgArray[2].src = '/images/backgrounds/bg3.png';

imgArray[3] = new Image();
imgArray[3].src = '/images/backgrounds/bg4.png';

imgArray[4] = new Image();
imgArray[4].src = '/images/backgrounds/bg5.png';



var writeHTML = "";

const getUserCryptokitties = async (user) => {
  const [account] = await steem.api.getAccountsAsync([user]);
  var cryptokitties = JSON.parse(account.json_metadata).profile.cryptokitties
  Cookies.set('cryptokitties', cryptokitties);
  return cryptokitties;
};

const renderUserCryptokitties = async (user) => {
	var cryptokitties = Cookies.get('cryptokitties'); 
	if(!cryptokitties){
		$('#cryptokitties').cryptoCase(await getUserCryptokitties(user));
	}else{
		$('#cryptokitties').cryptoCase(cryptokitties);
	}
};

var cryptokittie = "";
var writeHTML = "";

function adventureForm(){

		
	var jsonURL = "/backgrounds.json?v=1";
	var imgList= "";
	imgList += "<div class=\"ant-form-item-label\"><label for=\"backgrounds\"><span class=\"Editor__label\">";
	imgList += "<span>Select a Background</span></span></label></div>";
	imgList += "<div class=\"container\" style=\"  padding-top: 14px;  overflow-x: scroll;    height: 120px;    overflow-y: hidden;\"><div class=\"well\ wellColor\">";	
	imgArray.forEach(function(entry) {
		 imgList += "<div class=\"col-sm-6 col-md-3\" align=\"center\">"
                + "<div class=\"backgroundCard\" onclick=\"BackgroundClick(this);\">"				
                + "<img class=\""
                + "image img-responsive\" src=\"" + entry.src + "\" /></div></div>";
	});
	imgList += "</div></div>";
	
	var user = $(".Topnav__user__username")[0].outerText;
	steem.api.setOptions({ url: 'https://api.steemit.com'});
	setTimeout(function(){
	$('.Editor0').html('<div id="cryptokitties" class="ant-row ant-form-item" class="height:200px;"><img src="/images/wait.gif" /><h2>Meow, Please wait...</h2></div><div id="backgrounds" class="ant-row ant-form-item" class="height:200px;">'+imgList+'</div><div id="previewadventure" class="ant-row ant-form-item" class="height:200px;"></div><div class="ant-row ant-form-item"></div><div class="Editor__bottom"><div class="Editor__bottom__right"><div class="ant-row ant-form-item"><div class="ant-form-item-control-wrapper"><div class="ant-form-item-control "><button class="" type="">Meow Next</button></div></div></div></div></div>'); 
	renderUserCryptokitties(user);
	
	}, 1000);
	

}


$(document).ready(function() {
	
	var tid0 = setTimeout(adventureForm, 500);
 
});



function KittieClick(e){

		$(".kittyCard").removeClass("glow");
		var id = e.id;
		
		$(e).addClass("glow");      //add the class to the clicked element
		if(!Cookies.get('background')){
			compileAdventure(Cookies.get('background'),$("#image_"+id)[0].src);
		}
		Cookies.set('id', id);
}	

function BackgroundClick(e){
		$(".backgroundCard").removeClass("glow");
		var background = $(e).children('img').src;
		id = Cookies.get('id'); 
		$(e).addClass("glow");      //add the class to the clicked element
		if(!Cookies.get('id')){
			compileAdventure(background,$("#image_"+id)[0].src);
		}
		Cookies.set('background', background);

}	
function compileAdventure(bg, cryptokittieIMG) {
	 var canvas = document.createElement('canvas');
	 canvas.width = 800;
	 canvas.height = 600;
	canvas.style.width = 800;
	 canvas.style.height = 600;
	  $('#previewadventure').replaceWith(canvas);
	var ctx = canvas.getContext('2d');
      
    var DOMURL = window.URL || window.webkitURL || window;
    var imgBG = new Image();
    imgBG.src = bg;
    
    imgBG.onload = function () {
      ctx.drawImage(imgBG, 0, 0, 800, 600);
    }
    var img = new Image();
    img.src = cryptokittieIMG;
    
    img.onload = function () {
      ctx.drawImage(img, 350, 270, 300, 300);
      //DOMURL.revokeObjectURL(url);
    }
	
	     imageFoo = document.createElement('img');
	    dataUrl = canvas.toDataURL();
imageFoo.src = dataUrl;

// Style your image here
imageFoo.style.width = '600px';
imageFoo.style.height = '450px';

// After you are done styling it, append it to the BODY element
$('#previewadventure').append(imageFoo);
 
	
}

function finishStory() {
		

	
	//$('form.Editor').html('<img src="/images/wait.gif" /><div style="display:none;">'+imagesHTML+'</div>');
	 var canvas = $('#canvas');
    var ctx = canvas.getContext('2d');
    
	
	
		$('.Editor0').hide();
		$('.Editor').show();
}
	
	
	(function($) {
    $.fn.cryptoCase = function(address) {
		if (!address) {alert("Edit Your Profile and Set Your CryptoKitties Address.");
		return;}
      const URL = 'https://api.cryptokitties.co/kitties?owner_wallet_address='
          + address;
      const INDIVIDUAL_URL = 'https:\/\/www.cryptokitties.co\/kitty\/';
      var location = this;
      const COLORS = new Object();
        COLORS['sizzurp'] = '#c1c1ea';
        COLORS['bubblegum'] = '#fcdede';
        COLORS['limegreen'] = '#d9f5cb';
        COLORS['topaz'] = '#d1eeeb';
        COLORS['thundergrey'] = '#eee9e8';
        COLORS['chestnut'] = '#efe1da';
        COLORS['mintgreen'] = '#cdf5d4';
        COLORS['pumpkin'] = '#fae1ca';
        COLORS['gold'] = '#faf4cf';
        COLORS['babypuke'] = '#eff1e0';
        COLORS['strawberry'] = '#efbaba';
      var newColors = new Object();
      var cats = "";
      $.ajax({
        url: URL,
        cache: true,
        success: function(response) {
          cats += "<h2>Begin your adventure...</h2>"
		  cats += "<div class=\"ant-row ant-form-item\"><div class=\"ant-form-item-label\"><label for=\"kitties\"><span class=\"Editor__label\">"
		  cats += "<span>Select a CryptoKittie</span></span></label></div>"
		 
			
		  cats += "<div class=\"container\" style=\" padding-top: 14px;    overflow-x: scroll;   height: 214px;    overflow-y: hidden;\"><div class=\"well\ wellColor\">";
  
          
            max = response.total;
         console.log(max);
          var j = max;
          for (i = 0; i < max; i++) {
            var cat = response.kitties[i];
            var details = "";
            details += "<div class=\"textbox\" align=\"left\">"
                + "<span class=\"kittyTextID\">"
                + cat.name + "<\/span>";
            /*if (cat.is_exclusive) {
              details += "<span class=\"details\"> &#xB7; Exclusive<\/span>";
            } if (cat.is_fancy) {
              details += "<span class=\"details\"> &#xB7; Fancy<\/span>";
            }*/
              details += "<\/div>";
           
            cats += "<div class=\"col-sm-6 col-md-3\" align=\"center\">"
                + "<div class=\"kittyCard\" id=\"" + cat.id + "\" onclick=\"KittieClick(this);\" style=\"background-color:"+COLORS[cat.color]+";border-radius:5px;\">"
                + "<img class=\""
                + "image img-responsive\" src=" + cat.image_url + " id=\"image_"
                + cat.id + "\"></div>" + "<div>" + details + "</div></div>";
           /* if (i == 3 || i == 7 || i == 11) {
              cats += "<\/div>";
            }*/
            newColors[i] = COLORS[cat.color];
            newColors[j] = COLORS[cat.color];
            j++;
          }
          cats += "</div></div>";
		  
          $(location).html(cats);
         
		   $('.wiating').hide();
		  $('.Editor0').show();
		 
        }
      });
    };
	
}(jQuery));