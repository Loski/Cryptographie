function nbpremier(nbParam)
 {
	var nb = parseInt(nbParam);
	var max = nb/ 2;
	for(i = 2; i <= max ; i++)
	{
		if(nb% i == 0)
		{
			console.log("DIVISIBLE PAR :"+i);
			return false;
		}
	}

	console.log("PAS DIVISIBLE");
	return true;
 }

function pgcd(a,b){
	while (a!=b)
	{
		if (a>b)
			a-=b; 
		else 
			b-=a;
	}
	return a;
}

function RSA_crypt(texte,p,q){
	var crypt="";
	
	//Tester si p et q sont null
		//->Clée aléa
	
	if(!nbpremier(p))
	{
		console.log("p non premier");
		alert("Clé invalide, p n'est pas premier"); //A mettre dans la vérif de clé (genre le même truc que Hill)
		return;
	}
	
	if(!nbpremier(q))
	{
		console.log("q non premier");
		alert("Clé invalide, q n'est pas premier"); //A mettre dans la vérif de clé (genre le même truc que Hill)
		return;
	}
	
	var ind_euler = (p-1)*(q-1);
	
	
	//Revoir le calcul aléa de e (là ça donne juste un nombre entre 2 et 10)
	var e = Math.floor(Math.random()*(10-2)+2);
	while(! pgcd(e,ind_euler)==1)
		e = Math.floor(Math.random()*(10-2)+2);
		
	
	document.getElementById('textecode').value=crypt;
	$('.decrypter-button').attr("disabled", false);
	$('#RSADiv').append("La clé publique est : ("+p*q+","+e+")");
}

$(document).ready(function()
{ 
	$('#cryptRSA').mousedown(function()
		{
			console.log("RSA CRYPTAGE");
			var texte=document.getElementById('texteclair').value;
			var p=document.getElementById("RSA_p").value;
			var q=document.getElementById("RSA_q").value;
			RSA_crypt(texte,p,q);
		});
		
	$('#decryptRSA').mousedown(function()
		{
			console.log("RSA DECRYPTAGE");
			var texte=document.getElementById('textecode').value;
		});


});