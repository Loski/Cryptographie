function vigenere_crypt(texte,cle,alphabet,paquet){
console.log(paquet);
	var crypt="";
	var modulo = alphabet.length;
	for(var i=0,j=0;i<texte.length;i++)
	{	
		if(i%paquet==0 && i!=0)
				j++;
	
		if(j==cle.length) //on reboucle sur le début de la clé
			j=0;
		
		var cara=texte.charAt(i);
		var indice=cara.charCodeAt(0);
		
		if(alphabet.indexOf('a')==-1 && indice>="a".charCodeAt(0) && indice<="z".charCodeAt(0)) //Minuscule si ASCII
		{
			cara=cara.toUpperCase();
			indice=alphabet.indexOf(cara);
			var somme=(indice+alphabet.indexOf(cle.charAt(j)))%modulo;
			var val = alphabet.charAt(somme);
			crypt+=val.toLowerCase();

		}
		
		else
		{
			indice=alphabet.indexOf(cara);
			if(indice==-1)
				crypt+=cara;
			else
			{
				var somme=(indice+alphabet.indexOf(cle.charAt(j)))%modulo;
				var val = alphabet.charAt(somme);
				crypt+=val;
			}
			//console.log(cara+" "+indice+" =>"+somme+" "+val);
		}		
	}
	
	//Codage par paquets
	if(paquet>1)
	{
		newcrypt="";
		var nb = 0;
		for(var i=0;i<crypt.length;i++)
		{
			console.log(crypt[i],alphabet.indexOf(crypt[i]));
			nb=alphabet.indexOf(crypt[i]);
			/*if(i%paquet==0 && i!=0)
				newcrypt+=" ";*/
			if(nb<10)
				newcrypt+="0";
			newcrypt+=nb;
		}
		
		crypt=newcrypt;
	}
	
	document.getElementById('textecode').value=crypt;
	$('.decrypter-button').attr("disabled", false);
}

function vigenere_decrypt(texte,cle,alphabet,paquet){
	console.log("DECRYPT");
	var decrypt="";
	var modulo = alphabet.length;
	
	//déCodage par paquets
	if(paquet>1)
	{
		var iteration=0;
		for(var i=0,j=0;i<texte.length;i+=paquet,iteration++)
		{
			if(iteration%paquet==0 && iteration!=0)
				j++;
		
			if(j==cle.length) //on reboucle sur le début de la clé
				j=0;
			
			var nb = parseInt(texte.substr(i,paquet));
			nb-=alphabet.indexOf(cle.charAt(j))%modulo;
			if(nb<0)
				nb+=modulo;
			console.log(nb,nb);
			
			decrypt+=alphabet.charAt(nb);
		}
	}
	
	else
	
	for(var i=0,j=0;i<texte.length;i++)
	{
		if(i%paquet==0 && i!=0)
				j++;
	
		if(j==cle.length) //on reboucle sur le début de la clé
			j=0;
		
		var cara=texte.charAt(i);
		var indice=cara.charCodeAt(0);
		
		if(alphabet.indexOf('a')==-1 && indice>="a".charCodeAt(0) && indice<="z".charCodeAt(0)) //Minuscule
		{
			cara=cara.toUpperCase();
			indice=alphabet.indexOf(cara);
			var somme=(indice-alphabet.indexOf(cle.charAt(j)))%modulo;
			if(somme<0)
				somme+=modulo;
			var val = alphabet.charAt(somme);
			decrypt+=val.toLowerCase();
			
		}
		
		else
		{
			indice=alphabet.indexOf(cara);
			if(indice==-1)
				crypt+=cara;
			else
			{
				var somme=(indice-alphabet.indexOf(cle.charAt(j)))%modulo; //position dans l'alphabet
				if(somme<0)
					somme+=modulo;
				var val = alphabet.charAt(somme);
				decrypt+=val;
			}
		}
	}
	
	document.getElementById('texteclair').value=decrypt;
	$('.crypter-button').attr("disabled", false);
}

$(document).ready(function()
{ 
	paquet=1;

	$("#codagePaquet").mousedown(function()
	{
		if(paquet==1)
			paquet=2;
		else
			paquet=1;
	});
	
	$('#cryptVig').mousedown(function()
		{
			console.log("VIGENERE CRYPTAGE");
			var texte=document.getElementById('texteclair').value;
			var cle = document.getElementById('keyVig').value;
			var alphabet = document.getElementById('alphaVig').value;
			vigenere_crypt(texte,cle,alphabet,paquet);
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
			var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz’«» \\\n\t&(ÀàÂâÄ†ãÑñíÍßóÓÁá©ÆæÇçÉéÈèÊêËëÎîÏïÔôÖŒœÙùÛûÜüŸÿ-_\"\'1234567890°)~#{[|`^@]}$£€!:;,?./§%*<>".split();
			document.getElementById('alphaVig').value=alphabet;
		});
		
	$('#decryptVig').mousedown(function()
		{
			console.log("VIGENERE DECRYPTAGE");
			var texte=document.getElementById('textecode').value;
			var cle = document.getElementById('keyVig').value;
			var alphabet = document.getElementById('alphaVig').value;
			vigenere_decrypt(texte,cle,alphabet,paquet);
		});

	$('#KeyGenVig').mousedown(function()
		{
			console.log("VIGENERE KEYGEN");
			document.getElementById('keyVig').value="";
			var taille = Math.floor(Math.random()*(26-1)+1);
			for(var i=0;i<taille;i++)
			{
				var nb = Math.floor(Math.random()*(26-1)+1);
				document.getElementById('keyVig').value+="ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(nb);
			}
			disable();
		});
});