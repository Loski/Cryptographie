function RSA_crypt(texte,p,q){
	var crypt="";
	
	//Tester si p et q sont null
		//->Clée aléa
	
	//p et q nb premiers ??
	
	var ind_euler = (p-1)*(q-1);
	
	//e doit etre premier avec ind_euler
	
	//A FINIR
	
	
	
	
	document.getElementById('textecode').value=crypt;
	$('.decrypter-button').attr("disabled", false);
}

$(document).ready(function()
{ 
	$('#cryptRSA').mousedown(function()
		{
			console.log("VIGENERE CRYPTAGE");
			var texte=document.getElementById('texteclair').value;
			vigenere_crypt(texte,p,q);
		});
		
	$('#decryptRSA').mousedown(function()
		{
			console.log("RSA DECRYPTAGE");
			var texte=document.getElementById('textecode').value;
		});


});