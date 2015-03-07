function isPrime(n) {
    if (n <= 3) { return n > 1; }
    if (n % 2 === 0 || n % 3 === 0) { return false; }
    for (var  i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) { return false; }
    }
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
	console.log("hi");
	var premier = true;
	if(!isPrime(p))
	{
		console.log("p non premier");
		$('#RSA_p').popover(); //A mettre dans la vérif de clé (genre le même truc que Hill)
		premier = false;
		$('#RSA_p').parent().addClass('has-error');
	}
	else{
		$('#RSA_p').parent().addClass('has-success');
		$('#RSA_p').popover('destroy');
	}
	
	if(!isPrime(q))
	{
		console.log("q non premier");
		$('#RSA_q').popover(); //A mettre dans la vérif de clé (genre le même truc que Hill)
		premier = false;
		$('#RSA_q').parent().addClass('has-error');
	}
	else{
		$('#RSA_q').parent().addClass('has-success');
		$('#RSA_q').popover('destroy');
	}
	if(!premier)
		return;

	var ind_euler = (p-1)*(q-1);
	
	
	//Revoir le calcul aléa de e (là ça donne juste un nombre entre 2 et 10)
<<<<<<< HEAD
<<<<<<< HEAD
	var e = Math.floor(Math.random()*(ind_euler)+1);
	while(pgcd(e,ind_euler)!=1) 
		e = Math.floor(Math.random()*(ind_euler)+1);
=======
	var e = Math.floor(Math.random()*(10-2)+2);
	while(pgcd(e,ind_euler)!==1 && e < ind_euler) 
		e = Math.floor(Math.random()*(10-2)+2);
>>>>>>> fbbbe260a64df105ed18c0c9317711ce0ed8b689
		
	
=======
	var e = Math.floor(Math.random()*(ind_euler-2)+2);
	while(pgcd(e,ind_euler)!==1 && e < ind_euler) 
		e = Math.floor(Math.random()*(ind_euler-2)+2);
	console.log("e="+e);
	var n = p*q;
	var d = euclideEtendu(e,ind_euler)%ind_euler;
>>>>>>> 7afdca458e5e2895f25fce7795ac06de8585e26d
	document.getElementById('textecode').value=crypt;
	$('.decrypter-button').attr("disabled", false);
	$('#RSADiv').append("La clé publique est : ("+n+","+e+")");
	$('#RSADiv').append("La clé privé est : ("+n+","+d+")");
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