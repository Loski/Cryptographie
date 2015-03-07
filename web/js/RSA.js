function isPrime(n) {
    if (n <= 3) { return n > 1; }
    if (n % 2 === 0 || n % 3 === 0) { return false; }
    for (var  i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) { return false; }
    }
    return true;
}
function testDePrimalite(n, k){
	var max = n -1;
	var min = 2;
	while(k--){
		var a = Math.floor(Math.random() * (max - min) + min);
		if(Math.pow(a, max) !== 1%n)
			return;
		else{
			while(true);
		}
	}
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
	
	if(isPrime(p))
	{
		console.log("p non premier");
		alert("Clé invalide, p n'est pas premier"); //A mettre dans la vérif de clé (genre le même truc que Hill)
		return;
	}
	
	if(isPrime(q))
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