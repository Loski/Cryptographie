var fileName="cyptTest";

var disable = function disableBouton(){
	$('.decrypter-button').attr("disabled", true);
	$('.crypter-button').attr("disabled", true);
	if(document.getElementById('texteclair').value!==''){
		if($('.active#affine').length)
		{
			if($('#CA').val()!=='' && $('#CB').val()!=='')
				$('.crypter-button').attr("disabled", false);
		}
		else if($('.active#RSADiv').length){
			$('.crypter-button').attr("disabled", false);
		}
		else if($('.active#HillDiv').length){
			/*var vide = false;
			var matrice = recupererMatrice();
			for(var i = 0; i < 4; i++){
				if(matrice[i].trim()=== "")
					vide = true;
			}
			if(!vide)*/
				$(".crypter-button").attr("disabled", false);
		}
		else if($('.active .cle').val()!==''){
			$(".crypter-button").attr("disabled", false);
		}
	}
	if(document.getElementById('textecode').value!==''){
		if($('.active#affine').length){
			if($('#CA').val()!=='' && $('#CB').val()!=='')
				$(".decrypter-button").attr("disabled", false);
		}
		else if($('.active#RSADiv').length){
			$(".decrypter-button").attr("disabled", false);
		}
		else if($('.active#HillDiv').length){
			/*var vide = false;
			var matrice = recupererMatrice();
			for(var i = 0; i < 4; i++){
				if(matrice[i].trim()=== "")
					vide = true;
			}
			if(!vide)*/
				$(".decrypter-button").attr("disabled", false);
		}
		else if($('.active .cle').val()!==''){
			$(".decrypter-button").attr("disabled", false);
		}
	}
};


function modal(nb){
	if(nb === 0){
		$('.modal-body p').text("");
		$('.modal-body p').append(nl2br($('#texteclair').val()));
		$('.modal-title').text("Texte décrypté");
		$("#save").attr("onclick","saveTextAsFile(0)");
	}
	else{
		$('.modal-body p').text("");
		$('.modal-body p').append(nl2br($('#textecode').val()));
		$('.modal-title').text("Texte crypté");
		$("#save").attr("onclick","saveTextAsFile(1)");

	}
}
function recupererRadio(){
	return parseInt($('input[type=radio][name=optradio]:checked').val());
}
function recupererRadio2(){
	return parseInt($('input[type=radio][name=optradio2]:checked').val());
}
function traitementTxt(str){
	str = str.trim();
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }
     
    return str;
}

//Remplace les \n par des <br/>
function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}

function saveTextAsFile(id)
{
	var fileNameToSaveAs = fileName;
	var textToWrite;
	if(id===0)
	{
		 textToWrite = document.getElementById("texteclair").value;
		 fileNameToSaveAs += "_decrypt";
	}
	else
	{
		 textToWrite = document.getElementById("textecode").value;
		 fileNameToSaveAs += "_crypt";
	}
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}
function creerTableHill(n){
	$('#HillDiv table').text('');
	var str ="<tr>";
	for(var i = 0; i < n; i++){
		str+='<th class="col-xs-1"><input pattern="/[0-9]+/" type="number" required class="form-control"></th>';
	}
	str+="</tr>";
	for(i = 0; i< n;i++){
		$('#HillDiv table').append(str);
	}
}
$(document).ready(function()
{ 
	disable();	
	$( "#clickme" ).click(function() {
		$("#clickme").siblings().toggle();
	});
	
	$('#menu li').mousedown(function()
	{
		$('.active').removeClass('active');
		$(this).addClass('active');
		var i = $("#menu>li").index($(this));
		$(".onglet").eq(i).addClass('active');
		document.title=($("#menu>li").eq(i).text());
		disable();
		$('#error').hide();
	});
	
	$('#textecode').on("keyup change", disable);	
	$('#texteclair').on("keyup change", disable);
    $('.active .cle').keyup(disable);
    $('.cleAffine').keyup(disable);
	$("#keyVig").keyup(disable);
	$("#matrice th").keyup(disable);
	$('#HillDiv select').change(function(event) {
		creerTableHill(event.target.value);
	});
	$("label input[type=file]").change(function(event)
	{
		var file = this.files[0];
		fileName=file.name.substr(0,file.name.lastIndexOf('.'));
		if (file) 
		{
			var reader = new FileReader();
			reader.readAsText(file);
			var txt = $(this).parent().siblings('textarea').eq(0);
			reader.onload = function(e) 
			{
				$(txt).val(e.target.result);
				disable();
			};
		}
	});
});