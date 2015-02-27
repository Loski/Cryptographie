﻿function vigenere_crypt(texte,cle,alphabet,choice){
	var crypt="";
	for(var i=0,j=0;i<texte.length;i++)
	{
		if(j==cle.length) //on reboucle sur le début de la clé
			j=0;
		
		var cara=texte.charAt(i);
		var indice=cara.charCodeAt(0);
		
		if(indice>="a".charCodeAt(0) && indice<="z".charCodeAt(0)) //Minuscule
		{
			//???????????????
			crypt+="?";
			j++;
		}
		
		else if((indice>="A".charCodeAt(0) && indice<="Z".charCodeAt(0)) || choice) //Maj
		{
			var somme=(indice+cle.charAt(j).charCodeAt(0))%26; //position dans l'alphabet
			var val=cara;
			if(somme!=0)
				val = alphabet.charAt(somme);
			crypt+=val;
			j++;
		}
		else
		{
			crypt+=cara;
		}
		
	}
	
	$("#textecode").text(crypt);
}

$(document).ready(function()
{ 
	$('#cryptVig').mousedown(function()
		{
			console.log("VIGENERE INIT");
			var texte=document.getElementById('texteclair').value;
			var cle = document.getElementById('keyVig').value;
			var alphabet = document.getElementById('alphabet').value;
			var cryptageCara = document.getElementById('cryptOtherCaract').checked;
			vigenere_crypt(texte,cle,alphabet,cryptageCara);
		});


});