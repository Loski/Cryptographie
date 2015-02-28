function vigenere_crypt(texte,cle){
	var crypt="";
	for(var i=0,j=0;i<texte.length;i++)
	{
		if(j==cle.length) //on reboucle sur le début de la clé
			j=0;
		
		var cara=texte.charAt(i);
		var indice=cara.charCodeAt(0);
		
		if(indice>="a".charCodeAt(0) && indice<="z".charCodeAt(0)) //Minuscule
		{
			cara=cara.toUpperCase();
			indice=cara.charCodeAt(0);
			var somme=(indice+cle.charAt(j).charCodeAt(0))%26;
			var val = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(somme);
			crypt+=val.toLowerCase();
			j++;
		}
		
		else if((indice>="A".charCodeAt(0) && indice<="Z".charCodeAt(0))) //Maj
		{
			var somme=(indice+cle.charAt(j).charCodeAt(0))%26; //position dans l'alphabet
			var val = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(somme);
			crypt+=val;
			j++;
		}
		else
		{
			crypt+=cara;
		}
		
	}
	
	document.getElementById('textecode').value=crypt;
	$('.decrypter-button').attr("disabled", false);
}

function vigenere_decrypt(texte,cle){
	console.log("DECRYPT");
	var decrypt="";
	for(var i=0,j=0;i<texte.length;i++)
	{
		if(j==cle.length) //on reboucle sur le début de la clé
			j=0;
		
		var cara=texte.charAt(i);
		var indice=cara.charCodeAt(0);
		
		if(indice>="a".charCodeAt(0) && indice<="z".charCodeAt(0)) //Minuscule
		{
			cara=cara.toUpperCase();
			indice=cara.charCodeAt(0);
			var somme=(indice-cle.charAt(j).charCodeAt(0))%26;
			if(somme<0)
				somme+=26;
			var val = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(somme);
			decrypt+=val.toLowerCase();
			j++;
		}
		
		else if((indice>="A".charCodeAt(0) && indice<="Z".charCodeAt(0))) //Maj
		{
			var somme=(indice-cle.charAt(j).charCodeAt(0))%26; //position dans l'alphabet
			if(somme<0)
				somme+=26;
			var val = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(somme);
			decrypt+=val;
			j++;
		}
		else
		{
			decrypt+=cara;
		}
		
	}
	
	document.getElementById('texteclair').value=decrypt;
	$('.crypter-button').attr("disabled", false);
}

$(document).ready(function()
{ 
	$('#cryptVig').mousedown(function()
		{
			console.log("VIGENERE CRYPTAGE");
			var texte=document.getElementById('texteclair').value;
			var cle = document.getElementById('keyVig').value;
			vigenere_crypt(texte,cle);
		});
		
	$('#decryptVig').mousedown(function()
		{
			console.log("VIGENERE DECRYPTAGE");
			var texte=document.getElementById('textecode').value;
			var cle = document.getElementById('keyVig').value;
			vigenere_decrypt(texte,cle);
		});


});