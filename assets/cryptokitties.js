const getUserCryptokitties = async (user) => {
  const [account] = await steem.api.getAccountsAsync([user]);
  var cryptokitties = JSON.parse(account.json_metadata).profile.cryptokitties
  Cookies.set('cryptokitties', cryptokitties);
  return cryptokitties;
};

const renderUserCryptokitties = async (user) => {
	$('.Editor').html('<div id="cryptokitties" class="ant-row ant-form-item"></div>'); 
	var cryptokitties = Cookies.get('cryptokitties'); 
	if(!cryptokitties){
		$('#cryptokitties').cryptoCase(await getUserCryptokitties(user));
	}else{
		$('#cryptokitties').cryptoCase(cryptokitties);
	}
	//$('#cryptokitties').cryptoCase(await getUserCryptokitties(user));
	$(".kittyCard").click(function() {  
		$(".kittyCard").removeClass("glow");
		var id = $(this).id;
console.log("#input_"+id);
		$("#input_"+id).prop("checked", true);
		$(this).addClass("glow");      //add the class to the clicked element
	});	
	
	$('input[type=radio][name=kittie]').change(function() {
	//	$(".kittyCard").removeClass("glow");
	//	var id = $(this).id
	//	$(id.replace("input_", "")).addClass("glow");
    });
};

$(document).ready(function() {
	var user = $(".Topnav__user__username")[0].outerText;
	steem.api.setOptions({ url: 'https://api.steemit.com'});
	renderUserCryptokitties(user);
});
	
	
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
          cats += "<h3>Start an Adventure</h3>"
		  cats += "<div class=\"ant-row ant-form-item\"><div class=\"ant-form-item-label\"><label for=\"kitties\"><span class=\"Editor__label\">"
		  cats += "<span>Your CryptoKitties</span></span></label></div>"
		 
			
		  cats += "<div class=\"container\" style=\"    overflow-x: scroll;    height: 214px;    overflow-y: hidden;\"><div class=\"well\ wellColor\">";
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