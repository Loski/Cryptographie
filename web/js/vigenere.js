function vigenere_crypt(texte,cle,alphabet){
	var crypt="";
	var modulo = alphabet.length;
	for(var i=0,j=0;i<texte.length;i++)
	{
		if(j==cle.length) //on reboucle sur le début de la clé
			j=0;
		
		var cara=texte.charAt(i);
		var indice=cara.charCodeAt(0);
		
		if(indice>="a".charCodeAt(0) && indice<="z".charCodeAt(0)) //Minuscule
		{
			cara=cara.toUpperCase();
			indice=alphabet.indexOf(cara);
			var somme=(indice+alphabet.indexOf(cle.charAt(j)))%modulo;
			var val = alphabet.charAt(somme);
			crypt+=val.toLowerCase();
			j++;
		}
		
		else
		{
			indice=alphabet.indexOf(cara);
			var somme=(indice+alphabet.indexOf(cle.charAt(j)))%modulo;
			var val = alphabet.charAt(somme);
			crypt+=val;
			j++;
		}		
	}
	
	document.getElementById('textecode').value=crypt;
	$('.decrypter-button').attr("disabled", false);
}

function vigenere_decrypt(texte,cle,alphabet){
	console.log("DECRYPT");
	var decrypt="";
	var modulo = alphabet.length;
	for(var i=0,j=0;i<texte.length;i++)
	{
		if(j==cle.length) //on reboucle sur le début de la clé
			j=0;
		
		var cara=texte.charAt(i);
		var indice=cara.charCodeAt(0);
		
		if(indice>="a".charCodeAt(0) && indice<="z".charCodeAt(0)) //Minuscule
		{
			cara=cara.toUpperCase();
			indice=alphabet.indexOf(cara);
			var somme=(indice-alphabet.indexOf(cle.charAt(j)))%modulo;
			if(somme<0)
				somme+=modulo;
			var val = alphabet.charAt(somme);
			decrypt+=val.toLowerCase();
			j++;
		}
		
		else
		{
			indice=alphabet.indexOf(cara);
			var somme=(indice-alphabet.indexOf(cle.charAt(j)))%modulo; //position dans l'alphabet
			if(somme<0)
				somme+=modulo;
			var val = alphabet.charAt(somme);
			decrypt+=val;
			j++;
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
			var alphabet = document.getElementById('alphaVig').value;
			vigenere_crypt(texte,cle,alphabet);
		});
		
	$('#ascii_check').mousedown(function()
		{
			console.log("ASCII");
			var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			document.getElementById('alphaVig').value=alphabet;
		});
		
	$('#alphaExt_check').mousedown(function()
		{
			console.log("EXTEND ALPHA");
			var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz’«» \\\n\t&(ÀàÂâÄ†ãÑñíÍßóÓÁá©ÆæÇçÉéÈèÊêËëÎîÏïÔôÖŒœÙùÛûÜüŸÿ-_\"\'1234567890°)~#{[|`^@]}$£€!:;,?./§%*<>";
			document.getElementById('alphaVig').value=alphabet;
		});
		
	$('#decryptVig').mousedown(function()
		{
			console.log("VIGENERE DECRYPTAGE");
			var texte=document.getElementById('textecode').value;
			var cle = document.getElementById('keyVig').value;
			var alphabet = document.getElementById('alphaVig').value;
			vigenere_decrypt(texte,cle,alphabet);
		});

	$('#KeyGenVig').mousedown(function()
		{
			console.log("VIGENERE KEYGEN");
			document.getElementById('keyVig').value="";
			var taille = Math.floor(Math.random()*(26-1)+1);
			for(var i=0;i<taille;i++)
			{
				var nb = Math.floor(Math.random()*(26-1)+1);
				document.getElementById('keyVig').value+="ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(nb)
			}
		});
});