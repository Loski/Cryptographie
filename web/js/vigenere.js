function vigenere_crypt(texte,cle,alphabet,paquet){

	var crypt="";
	var modulo = alphabet.length;
	var ite=0;
	console.log(paquet);
	for(var i=0,j=0;i<texte.length;i++)
	{	
		if(ite%paquet==0 && ite!=0 && alphabet.indexOf(texte[i-1])!=-1)
		{
			j++;
		}
	
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
			ite++;
		}
		
		else
		{
			indice=alphabet.indexOf(cara);
			if(indice==-1)
			{
				crypt+=cara;
			}
			else
			{
				var somme=(indice+alphabet.indexOf(cle.charAt(j)))%modulo;
				var val = alphabet.charAt(somme);
				crypt+=val;
				ite++;
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
			if(alphabet.indexOf(crypt[i])!=-1)
			{
				//console.log(crypt[i],alphabet.indexOf(crypt[i]));
				nb=alphabet.indexOf(crypt[i]);
				/*if(i%paquet==0 && i!=0)
					newcrypt+=" ";*/
				if(nb<10)
					newcrypt+="0";
				newcrypt+=nb;
			}
			else 
			{
				var textFalse ="";
			
				for(var k=0;k<2;k++)
					textFalse+="_";
				
				newcrypt+=textFalse;
			}
		}
		
		crypt=newcrypt;
	}
	
	document.getElementById('textecode').value=crypt;
	$('.decrypter-button').attr("disabled", false);
}

function vigenere_decrypt(texte,cle,alphabet,paquet){
	var decrypt="";
	var modulo = alphabet.length;
	var iteration=0;
	var OK=0;
	//déCodage par paquets
	if(paquet>1)
	{
		for(var i=0,j=0;i<texte.length;i+=2)
		{
			console.log(iteration,cle.charAt(j),texte[i],iteration%paquet==0);
			if(iteration%paquet==0 && iteration!=0 && texte[i]!='_')
				j++;
		console.log(iteration,cle.charAt(j),texte[i],iteration%paquet==0);
			if(j==cle.length) //on reboucle sur le début de la clé
				j=0;
			
			var textFalse ="";
			
			for(var k=0;k<2;k++)
				textFalse+="_";
			
			if(texte.substr(i,2)!=textFalse)
			{
				var nb = parseInt(texte.substr(i,2));
				nb-=alphabet.indexOf(cle.charAt(j))%modulo;
				if(nb<0)
					nb+=modulo;
				//console.log(nb,nb);
				
				decrypt+=alphabet.charAt(nb);
				iteration++;
			}
			
			else
				decrypt+=textFalse;
		}
	}
	
	else
	
	for(var i=0,j=0;i<texte.length;i++)
	{
		if(iteration!=0 && OK)
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
			OK=true;
		}
		
		else
		{
			indice=alphabet.indexOf(cara);
			if(indice==-1)
			{
				OK=false;
				decrypt+=cara;
			}
			else
			{
				var somme=(indice-alphabet.indexOf(cle.charAt(j)))%modulo; //position dans l'alphabet
				if(somme<0)
					somme+=modulo;
				var val = alphabet.charAt(somme);
				decrypt+=val;
				iteration++;
				OK=true;
			}
		}
	}
	
	document.getElementById('texteclair').value=decrypt;
	$('.crypter-button').attr("disabled", false);
}

$(document).ready(function()
{ 
	
	$('#cryptVig').mousedown(function()
		{
			var texte=document.getElementById('texteclair').value;
			var cle = document.getElementById('keyVig').value;
			var alphabet = document.getElementById('alphabet').value;
			var paquet = parseInt(document.getElementById('codagePaquet').value);
			vigenere_crypt(texte,cle,alphabet,paquet);
		});
		
	$('#standard_check').mousedown(function()
		{
			console.log("Basique alphabet");
			var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			document.getElementById('alphabet').value=alphabet;
		});
		
	$('#alphaExt_check').mousedown(function()
		{
			console.log("EXTEND ALPHA");
			var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz’«» \\\n\t&(ÀàÂâÄ†ãÑñíÍßóÓÁá©ÆæÇçÉéÈèÊêËëÎîÏïÔôÖŒœÙùÛûÜüŸÿ-_\"\'1234567890°)~#{[|`^@]}$£€!:;,?./§%*<>".split();
			document.getElementById('alphabet').value=alphabet;
		});
		
	$('#ascii_check').mousedown(function()
		{
			console.log("ASCII");
			var alphabet ="";
			for(var i=0;i<128;i++)
				alphabet+=String.fromCharCode(i);
			document.getElementById('alphabet').value=alphabet;
		});
		
	$('#decryptVig').mousedown(function()
		{
			var texte=document.getElementById('textecode').value;
			var cle = document.getElementById('keyVig').value;
			var alphabet = document.getElementById('alphabet').value;
			var paquet = parseInt(document.getElementById('codagePaquet').value);
			vigenere_decrypt(texte,cle,alphabet,paquet);
		});

	$('#KeyGenVig').mousedown(function()
		{
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