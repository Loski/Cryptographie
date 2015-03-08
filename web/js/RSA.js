String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
};

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
	console.log(e);
	console.log(n);
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
	var n = bigInt(q).multiply(p);
	var d = bigInt(euclideEtendu(e,ind_euler)%ind_euler);
	$('#textecode').val(chiffrement(decoupeParTaille(decoupage(texte),4), e, n).join(' '));  // Par 4 temp 
	$('.decrypter-button').attr("disabled", false);
	$('#RSA_n').val(n);
	$('#RSA_e').val(e);
	$('#RSA_d').val(d);
	$('#RSADiv').append("La clé publique est : ("+n+","+e+")");
	$('#RSADiv').append("<br />La clé privée est : ("+n+","+d+")");
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
	var tab = [];
	for(var i = 0; i < texte.length; i+=taille)
		tab.push(texte.substring(i, i +taille));
	var tailleLast = texte.length%taille;
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
function RSA_decryptage(texte,taillebloc){
    var s=texte.split(" ");
    var n=bigInt($('#RSA_n').val());
    var d=bigInt($('#RSA_d').val());
    for(var i=0;i<s.length;i++)
    {
        s[i]=bigInt(s[i]);
        s[i]=s[i].modPow(d,n);
        s[i]=s[i].toString();
    }
    var walid="";
    for( i=0;i<s.length-1;i++)
    {
            if(s[i].length<taillebloc)
            {
                s[i]="0".repeat(taillebloc-s[i].length)+s[i];
            }
    

            
        walid=walid+s[i];

    }
    walid=walid+s[s.length-1];
    var tab=[];
    for(i=0;i<walid.length;i=i+3)
    {
        if(walid[i+2])
            tab.push(walid[i]+walid[i+1]+walid[i+2]);
        else if (walid[i+1])
            tab.push(walid[i]+walid[i+1]);
        else
            tab.push(walid[i]);
    }
   for(i=0;i<tab.length;i++)
   {
       tab[i]=String.fromCharCode(tab[i]);
   }
  
    $('#texteclair').val(tab.join(""));
        
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
				var e = document.getElementById("RSA_e").value;
				RSA_cryptePublic(texte, n, e);
			}
		});
		
	$('#decryptRSA').mousedown(function()
		{
			var texte=document.getElementById('textecode').value;
			var n = document.getElementById("RSA_n").value;
			var d = document.getElementById("RSA_d").value;
            RSA_decryptage(texte,4);
		});
		
	$('#KeyGenRSA').mousedown(function()
		{
			console.log("RSA KEYGEN");
			var max=100000000;
			var min=100;
			document.getElementById("RSA_e").value="";
			document.getElementById("RSA_n").value="";
			document.getElementById("RSA_d").value="";
			
			var nb = bigInt(Math.floor(Math.random()*(max-min)+min));
			while(!isPrime(nb))
				var nb = bigInt(Math.floor(Math.random()*(max-min)+min));
			document.getElementById('RSA_p').value=nb;
			
			var nb = bigInt(Math.floor(Math.random()*(max-min)+min));
			while(!isPrime(nb))
				var nb = bigInt(Math.floor(Math.random()*(max-min)+min));
			document.getElementById('RSA_q').value=nb;
		});
});



