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
$(document).ready(function() {
	writeHTML = $('form.Editor').innterHTML;
	$('form.Editor').html('<img src="/images/wait.gif" />');
	
	
	
	
	var jsonURL = "/backgrounds.json?v=1";
	var imgList= "";
	imgList += "<div class=\"ant-form-item-label\"><label for=\"backgrounds\"><span class=\"Editor__label\">";
	imgList += "<span>Select a Background</span></span></label></div>";


	imgList += "<div class=\"container\" style=\"  padding-top: 14px;  overflow-x: scroll;    height: 100px;    overflow-y: hidden;\"><div class=\"well\ wellColor\">";

	
	
	imgArray.forEach(function(entry) {
		 imgList += "<div class=\"col-sm-6 col-md-3\" align=\"center\">"
                + "<div class=\"backgroundCard\">"				
                + "<img class=\""
                + "image img-responsive\" src=\"" + entry.src + "\" /></div></div>";
	});
 imgList += "</div></div>";
	
	
	var user = $(".Topnav__user__username")[0].outerText;
	steem.api.setOptions({ url: 'https://api.steemit.com'});
	
		$('form.Editor').html('<div id="cryptokitties" class="ant-row ant-form-item" class="height:200px;"></div><div id="backgrounds" class="ant-row ant-form-item" class="height:200px;">'+imgList+'</div><div class="ant-row ant-form-item"><img id="img_canvas" src="/images/backgrounds/bg1.png" width="800" height="500" /></div><div class="Editor__bottom"><div class="Editor__bottom__right"><div class="ant-row ant-form-item"><div class="ant-form-item-control-wrapper"><div class="ant-form-item-control "><button class="" type="">Meow Next</button></div></div></div></div></div>'); 

	
	
	
	renderUserCryptokitties(user);
	
	//var tid = setTimeout(attachEventSelectors, 2000);

	attachEventSelectors();
	
	
});

function attachEventSelectors(){
$(".kittyCard").click(function() {  
		$(".kittyCard").removeClass("glow");
		var id = this.id;
		console.log("#input_"+id);
		cryptokittie = $("#input_"+id).val();
		$("#input_"+id).prop("checked", true);
		compileAdventure(imgArray[0],$("#image_"+id)[0]);
		$(this).addClass("glow");      //add the class to the clicked element
		Cookies.set('cryptokittie', cryptokittie);
	});	
		
	
	$('input[name=kittie]').change(function() {
		$(".kittyCard").removeClass("glow");
		var id = this.id;
		$(id.replace("input_", "")).addClass("glow");
    });
	cryptokittie = Cookies.get('cryptokittie'); 
	if (cryptokittie){
		$("input[value='kittie']").prop("checked", true);
	}
	 tid = setTimeout(attachEventSelectors, 1000);	
}
var getCanvasImage = function(image) {
 
    var imgWidth = 800,
        imgHeight = 500;
 
    //define canvas image
    var canvas = document.createElement('canvas');
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, imgWidth, imgHeight);
         
    //convert canvas to jpeg URL
    return canvas.toDataURL("image/jpeg");
}
	
	
function compileAdventure(bg, cryptokittieIMG) {
	 var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    
        //var bg = document.getElementById(bg);
    
    var DOMURL = window.URL || window.webkitURL || window;
    var imgBG = new Image();
    imgBG.src = bg.src;
   // var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    //var url = DOMURL.createObjectURL(svg);
    
    imgBG.onload = function () {
      ctx.drawImage(imgBG, 0, 0);
     // DOMURL.revokeObjectURL(url);
    }
    var img = new Image();
    img.src = cryptokittieIMG.src;
   // var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    //var url = DOMURL.createObjectURL(svg);
    
    img.onload = function () {
      ctx.drawImage(img, 400, 370, 300, 300);
      //DOMURL.revokeObjectURL(url);
    }
	$('#img_canvas').src = canvas.toDataURL("image/jpeg");
}

function finishStory() {
		
	imagesHTML = $('form.Editor').innterHTML;
	$('form.Editor').html('<img src="/images/wait.gif" /><div style="display:none;">'+imagesHTML+'</div>');
	 var canvas = $('#canvas');
    var ctx = canvas.getContext('2d');
    
	
	$('form.Editor').html(writeHTML);
	
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
            //  + "<div class=\"row\">";
          
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
           /* if (i == 4 || i == 8) {
              cats += "<div class=\"row\">";
            }*/
            cats += "<div class=\"col-sm-6 col-md-3\" align=\"center\">"
                + "<div class=\"kittyCard\" id=\"" + i + "\">"
				+ "<input type=\"radio\" name=\"kittie\" value=\"" + cat.id + "\" id=\"input_" + i + "\">"
                + "<img class=\""
                + "image img-responsive\" src=" + cat.image_url + " id=\"image_"
                + i + "\"></div>" + "<div>" + details + "</div></div>";
           /* if (i == 3 || i == 7 || i == 11) {
              cats += "<\/div>";
            }*/
            newColors[i] = COLORS[cat.color];
            newColors[j] = COLORS[cat.color];
            j++;
          }
          cats += "</div></div>";
		  
          $(location).html(cats);
          for (i = 0; i < max; i++) {
            var change = "#" + i;
            $(change).css('background-color', newColors[i]);
            $(change).css('border-radius', '5px');
          }
          for (l = max; l < (max * 2); l++) {
            var change2 = "#" + l;
            $(change2).css('background-color', newColors[j]);
          }
        }
      });
    };
	
}(jQuery));