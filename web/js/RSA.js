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
function RSA_cryptePublic(texte, n, e){
	n = bigInt(n);
	e = bigInt(e);
	$('#textecode').val(chiffrement(decoupeParTaille(decoupage(texte),4), e, n).join(' ')); 
}
function RSA_crypt(texte,p,q){
	q = bigInt(q);
	p = bigInt(p);
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

	var ind_euler = bigInt((p-1)*(q-1));
    
	var e = bigInt(Math.floor(Math.random()*(ind_euler-2)+2));
	while(pgcd(e,ind_euler)!==1 && e < ind_euler) 
		e = bigInt(Math.floor(Math.random()*(ind_euler-2)+2));
	console.log("e="+e);
	var n = bigInt(q).multiply(p);
	console.log(n);
	var d = bigInt(euclideEtendu(e,ind_euler)%ind_euler);
	$('#textecode').val(chiffrement(decoupeParTaille(decoupage(texte),4), e, n).join(' '));  // Par 4 temp 
	$('.decrypter-button').attr("disabled", false);
	$('#RSA_n').val(n);
	$('#RSA_e').val(e);
	$('#RSA_d').val(d);
	
}
function decoupage(texte){
	var str = "";
	for(var i = 0; i < texte.length; i++){
		var tmp = texte.charCodeAt(i);
		if(tmp - 100 < 0)
			str += "0"+tmp.toString();
		else
			str += tmp.toString();
	}
	return str;
}
function decoupeParTaille(texte, taille){
	console.log(texte);
	var tab = [];
	for(var i = 0; i < texte.length; i+=taille)
		tab.push(texte.substring(i, i +taille));
	var tailleLast = texte.length%taille;
	console.log(tailleLast);
	if(tailleLast > 0){
		var tmp = tab[tab.length-1];
		tab[tab.length-1] ="";
		for(i = 0; i < taille -tailleLast; i++)
			tab[tab.length-1]+="0";
		tab[tab.length-1]+=tmp;
	}
	return tab;
}

function chiffrement(tab, e, n){
	for(var i = 0 ; i < tab.length;i++){
		tab[i] = bigInt(tab[i]);
		tab[i] = tab[i].modPow(e,n);
	}
	return tab;
}
$(document).ready(function()
{ 
	$('#cryptRSA').mousedown(function(){
		
			var texte=document.getElementById('texteclair').value;
			var n = document.getElementById("RSA_n").value;
			if(n.trim() ===""){
				var p=document.getElementById("RSA_p").value;
				var q=document.getElementById("RSA_q").value;
				RSA_crypt(texte,p,q);
			}
			else{
				var e = document.getElementById("RSA_q").value;
				RSA_cryptePublic(texte, n, e);
			}
		});
		
	$('#decryptRSA').mousedown(function()
		{
			var texte=document.getElementById('textecode').value;
			var n = document.getElementById("RSA_n").value;
			var d = document.getElementById("RSA_d").value;
			// call decrypt
		});
});



