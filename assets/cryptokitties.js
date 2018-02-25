function valueChangeREACT(selector, value){
var target = $(selector)[0]
var event = document.createEvent("HTMLEvents");  
$(selector).val(value)
event.initEvent(selector, true, true);
target.dispatchEvent(event);
}
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
	steem.api.setOptions({ url: 'https://api.steemit.com'});
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
  Cookies.set('background', '');
  	Cookies.set('kittieName', '');
		Cookies.set('id', '');
	
	$('.Editor0').html('<div id="cryptokitties" class="ant-row ant-form-item" class="height:200px;"></div><div id="backgrounds" class="ant-row ant-form-item" class="height:200px;"></div><div id="previewadventure" class="ant-row ant-form-item" class="height:450px;"><canvas id="preview_canvas"></canvas></div><div class="ant-row ant-form-item"></div><div class="Editor__bottom"><div class="Editor__bottom__right"><div class="ant-row ant-form-item"><div class="ant-form-item-control-wrapper"><div class="ant-form-item-control "><button class="Action" type="" onclick="finishStory();">Meow Next</button></div></div></div></div></div>'); 

		
	var jsonURL = "/backgrounds.json?v=1";
	var imgList= "";
	imgList += "<div class=\"ant-form-item-label\"><label for=\"backgrounds\"><span class=\"Editor__label\">";
	imgList += "<span>Select a Background</span></span></label></div>";
	imgList += "<div class=\"container\" style=\"  padding-top: 14px;  overflow-x: scroll;    height: 120px;    overflow-y: hidden;\"><div class=\"well\ wellColor\">";	
	imgArray.forEach(function(entry) {
		 imgList += "<div class=\"col-sm-6 col-md-3\" align=\"center\">"
                + "<div class=\"backgroundCard\" onclick=\"BackgroundClick('"+entry.src+"', this);\">"				
                + "<img class=\""
                + "image img-responsive\" src=\"" + entry.src + "\" /></div></div>";
	});
	imgList += "</div></div>";
	 $("#backgrounds").html(imgList);
	
	var user = $(".Topnav__user__username")[0].innerText;
		//setTimeout(function(){
	renderUserCryptokitties(user);
	//}, 1000);
	$('.Editor0').show();

}


$(document).ready(function() {	
setTimeout(function(){
	adventureForm();
 }, 4000);
});



function KittieClick(e){

		$(".kittyCard").removeClass("glow");
		var id = e.id;
		
		$(e).addClass("glow");      //add the class to the clicked element
		if(Cookies.get('background')){
			compileAdventure(Cookies.get('background'),$("#image_"+id)[0].src.toString());
		}
  	Cookies.set('kittieName', $("#name_"+id)[0].innerText.replace('\n', ''));
		Cookies.set('id', id);
}	

function BackgroundClick(src, e){
		$(".backgroundCard").removeClass("glow");
		var background = src;
		id = Cookies.get('id'); 
		$(e).addClass("glow");      //add the class to the clicked element
		if(Cookies.get('id')){
			compileAdventure(background,$("#image_"+id)[0].src.toString());
		}
		Cookies.set('background', background);

}	
function compileAdventure(bg, cryptokittieIMG) {
	 var canvas = document.getElementById('preview_canvas');
	 canvas.width = 800;
	 canvas.height = 600;
	 
	canvas.style.width = "100%";
	canvas.style.height = "100%";
	// $('#previewadventure').replaceWith(canvas);
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var DOMURL = window.URL || window.webkitURL || window;
	var imgBG = new Image();
	//imgBG.crossOrigin = "Anonymous";
	imgBG.src = bg;
    
    imgBG.onload = function () {
      ctx.drawImage(imgBG, 0, 0, 800, 600);
    }
	
	
    var img = new Image();
	img.crossOrigin = "Anonymous";
    img.src = 'https://img.steemkitties.com/index.php?svg='+cryptokittieIMG.replace('https://storage.googleapis.com/ck-kitty-image/','');
    
     img.onload = function () {
      ctx.drawImage(img, 130, 220, 300, 300);
ctx.font = 'bold 25px Whitney, sans-serif';
ctx.fillStyle = '#ffffff';
ctx.fillText(Cookies.get('kittieName') + ' #'+Cookies.get('id'), 30, 580);
ctx.strokeStyle = 'black';
ctx.strokeText(Cookies.get('kittieName')+ ' #'+Cookies.get('id'),30, 580);

ctx.fillStyle = '#ffffff';
ctx.fillText('SteemKitties', 610, 580);
ctx.strokeStyle = 'black';
ctx.strokeText('SteemKitties',610, 580);
ctx.textBaseline = 'bottom'

	  localStorage.setItem( "savedImageData", canvas.toDataURL() );
    }
	
	
	
}

function finishStory() { 
  var canvas = document.getElementById('preview_canvas');

  handleImageUpload(postCanvasToURL(canvas),insertImage, imageInvalid);
 // let counter = window.localStorage.getItem("counter");
window.localStorage.setItem('title', Cookies.get('kittieName')+ ' Adventures on Steem, MEOW!!');
   //valueChangeREACT('.Editor__title', );
 
//$(".Editor__title").val(Cookies.get('kittieName')+ ' Adventures on Steem');
//$("textarea").val('![image.png]('+canvas.toDataURL()+')');
		$('.Editor0').hide();
		$('.Editor').show();
}



function postCanvasToURL(canvas_e) {
	
	
  return dataURItoBlob(localStorage.getItem('savedImageData'));
  
}

function dataURItoBlob(dataURI) {
// convert base64/URLEncoded data component to raw binary data held in a string
var byteString;
if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
else
    byteString = unescape(dataURI.split(',')[1]);
// separate out the mime component
var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
// write the bytes of the string to a typed array
var ia = new Uint8Array(byteString.length);
for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
}
return new Blob([ia], {type:mimeString});
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
                + cat.id + "\"></div>" + "<div  id=\"name_" + cat.id + "\">" + details + "</div></div>";
         
           
          }
          cats += "</div></div>";
		  
          $(location).html(cats);
         
		   $('.waiting').hide();
		  $('.Editor0').show();
		 
        }
      });
    };
	
}(jQuery));



function handleImageUpload(blob, callback, errorCallback){
  $('.waiting').show();
      	var user = $(".Topnav__user__username")[0].innerText;

     
      const formData = new FormData();
      formData.append('files', blob);

      fetch('https://img.busy.org/@'+user+'/uploads', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(res => callback(res.secure_url, 'image'))
        .catch(err => {
          console.log('err', err);
          errorCallback();
        });
}
function imageInvalid(){
alert('invalid image');
}
function insertImage(image, imageName = 'image') {
   
	const editor = $('.EditorInput__dropzone-base textarea');

    const value = editor.val();

    const startPos = 0;
    const endPos = 0;
    const imageText = '!['+imageName+']('+image+')\n';
    const newValue = imageText+value;
    //editor.resizeTextarea();
  valueChangeREACT('.EditorInput__dropzone-base textarea', newValue);
$('.waiting').hide();
    //editor.val(newValue, startPos + imageText.length, startPos + imageText.length);
  }
