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
function pgcdBI(a,b){
	a = new bigInt(a);
	b = new bigInt(b);
	while (a.notEquals(b))
	{
		if (a.gt(b))
			a = a.minus(b); 
		else 
			b = b.minus(a);
	}
	return a;
}
function nbBloc(n){
	return n.toString().length -1;
}
function RSA_cryptePublic(texte, n, e){
	n = bigInt(n);
	e = bigInt(e);
	$('#textecode').val(chiffrement(decoupeParTaille(decoupage(texte),nbBloc(n)), e, n).join(' '));

}
function RSA_crypt(texte,p,q){
	q = bigInt(q);
	p = bigInt(p);
	var premier = true;
	if(!MillerRobin(p,30))
	{
		$('#RSA_p').popover(); //A mettre dans la vérif de clé (genre le même truc que Hill)
		premier = false;
		$('#RSA_p').parent().addClass('has-error');
	}
	else{
		$('#RSA_p').parent().addClass('has-success');
		$('#RSA_p').popover('destroy');
	}
	
	if(!MillerRobin(q,30))
	{
		$('#RSA_q').popover(); //A mettre dans la vérif de clé (genre le même truc que Hill)
		premier = false;
		$('#RSA_q').parent().addClass('has-error');
	}
	else{
		$('#RSA_q').parent().addClass('has-success');
		$('#RSA_q').popover('destroy');
	}
	if(q.equals(p)){
		$('#RSA_q').parent().addClass('has-error');
		$('#RSA_q').popover('destroy');
		$('#RSA_q').popover({title:"p=q"});
		return;
	}
	if(!premier)
		return;

	var ind_euler = new bigInt((p.minus(1)).multiply(q.minus(1)));
    
	var e = new bigInt(bigInt.randBetween("2", ind_euler));
	while(pgcdBI(e,ind_euler).notEquals(1) && e.lt(ind_euler)){
		e = bigInt(bigInt.randBetween(e, ind_euler));
	}
	var n = new bigInt(q.multiply(p));
	console.log(n.toString());
	var d = new bigInt(euclideEtenduBI(e,ind_euler)).mod(ind_euler);
	var nbBlo = nbBloc(n);
	while(texte.length <nbBlo/3)
		texte+=" ";
	$('#textecode').val(chiffrement(decoupeParTaille(decoupage(texte),nbBloc(n)), e, n).join(' '));  // Par 4 temp 
	$('.decrypter-button').attr("disabled", false);
	$('#RSA_n').val(n.toString());
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
function euclideEtenduBI(determinant, mod){
	var r = new bigInt(determinant); var r2 = new bigInt(mod); var u = new bigInt(1); var v = new bigInt(); var u2 = new bigInt(); var v2 = new bigInt();
	while(r2.gt(0)){
		var q = new bigInt(r.divide(r2));
		var rs = new bigInt(r);
		var us = new bigInt(u);
		var vs = new bigInt(v);
		r = r2;
		u = u2;
		v = v2;
		r2 = rs.minus(q.multiply(r2));
		u2 = us.minus(q.multiply(u2));
		v2 = vs.minus(q.multiply(v2));
	}
	if(r.notEquals(1))
		return false;
	else
		return new bigInt(mod.add(u));
}

function RSA_decryptage(texte, n, d,taillebloc){
    var s=texte.split(" ");
    var walid="";
    for(var i=0;i<s.length-1;i++)
    {
        s[i]=bigInt(s[i]);
        s[i]=s[i].modPow(d,n);
        s[i]=s[i].toString();
        
        if(s[i].length<taillebloc)
            {
                s[i]="0".repeat(taillebloc-s[i].length)+s[i];
            }
        walid=walid+s[i];
    }
    s[s.length-1]=bigInt(s[s.length-1]);
        s[s.length-1]=s[s.length-1].modPow(d,n);
        s[s.length-1]=s[s.length-1].toString();
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
				console.log(p);
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
            RSA_decryptage(texte,n,d,nbBloc(n));
		});
		
	$('#KeyGenRSA').mousedown(function()
		{
			document.getElementById("RSA_e").value="";
			document.getElementById("RSA_n").value="";
			document.getElementById("RSA_d").value="";
			document.getElementById('RSA_p').value=genereNbPremier();
			document.getElementById('RSA_q').value=genereNbPremier();
			disable();
		});
});


function genereNbPremier(){
	var max  = bigInt("1e300");
	var nb = bigInt.randBetween("1000",max);
	if(nb.isEven())
		nb = nb.add(1);
	while(!MillerRobin(nb,30))
		nb = nb.add(2);
	return nb.toString();
}
function MillerRobin(n, k) {
	if (n.equals(2) || n.equals(3))
		return true;
	if (n.mod(2).equals(0) || n.lt(2))
		return false;

	var s = new bigInt(0), d = new bigInt(n.prev());
	while (d.mod(2).equals(0)) {
		d = d.divide(2);
		s = s.add(1);
	}
 
	loop_verification: do {

		var tmp = new bigInt(bigInt.randBetween("2", (n.minus(3)).toString(10)));
		var x = new bigInt(tmp).modPow(d,n);
		if (x.equals(1) || x.equals(n.minus(1)))
			continue;
 
		for (var i = s - 1; i--;) {
			x = x.multiply(x).mod(n);
			if (x.equals(1))
				return false;
			if (x.equals(n.prev()))
				continue loop_verification;
		}
 
		return false;
	} while (--k);
 
	return true;
}