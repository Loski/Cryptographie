function creerAlphabet(mod){
	if(mod===26)
		return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	return creerAlphabetEtendu();
}
function creerAlphabetEtendu(){
	return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz’«» \\\n\t&(ÀàÂâÄ†ãÑñíÍßóÓÁá©ÆæÇçÉéÈèÊêËëÎîÏïÔôÖŒœÙùÛûÜüŸÿ-_\"\'1234567890°)~#{[|`^@]}$£€!:;,?./§%*<>".split("");
}
function nettoyage(txt){
	txt = traitementTxt(txt);
	return txt.replace(new RegExp("[^(a-zA-Z)]", "g"), '');
}
function calculdeterminant(array){ 
	return array[0] * array[3] - array[1] * array[2];
}
function inverserMatrice(matrice, determinant){
		return [(determinant * matrice[3]), (determinant * -matrice[1]), (determinant * -matrice[2]), (determinant * matrice[0])];
}
//Fonction pour trouver les nombres premiers entrent eux. Le petit génie qui va faire la fonction affine et qui va récupérer un magnifique travail tout fait. JE L'EMMERDE 
function trouverDeterminantModulo(determinant, modulo, liste_premier){
	liste_premier = [1, 3, 5, 7, 9, 11, 15, 17, 21, 23, 25]; //On met pas 2 et 13, car c'est jamais premier avec 26. #LOL
	for(var i = 0; i < liste_premier.length; i++)
		if(((determinant*liste_premier[i])%26) ===1)
			return liste_premier[i];
	return false;
}

function traitementCaracSpe(txt){
	txt.replace('/\n'/g, '╚');
	return txt;

}
function euclideEtendu(determinant, mod){
  	var r = determinant; var r2 = mod; var u = 1; var v = 0; var u2 = 0; var v2 = 1;
  	while(r2 > 0){
  		var q = Math.floor(r/r2);
  		var rs = r;
  		var us = u;
  		var vs = v;
  		r = r2;
  		u = u2;
  		v = v2;
  		r2 = rs - q *r2;
  		u2 = us - q * u2;
  		v2 = vs - q * v2;
  	}
  	if(r!==1)
		return false;
	else
		return mod+u;
  }

function absoluteMatrice(matrice, mod){
	for(var i = 0; i< 4; i++){
		matrice[i] = matrice[i]%mod;
		if(matrice[i] < 0)
			matrice[i] = matrice[i] + mod;
	}
	return matrice;
}
function crypte_hill(texte, matrice, mod){
	var alphabet = creerAlphabet(mod);
	matrice = absoluteMatrice(matrice, mod);
	if(!texte.length%2){
		texte+='a';
	}
	var message_non_code_num = [];
	var j = 0; 
	while(true){ // On coupe les éléments 2/2. Fuck si c'est impaire. FUCK FUCK FUCK FUCK
		if(texte.length === 0)
			break;
		var i = 0;
		var nb = 0;
		message_non_code_num[j]="";
		while(true){
			if(i >= texte.length){
				texte = "";
				break;
			}
			nb++;
			message_non_code_num[j] += texte.charAt(i);
			if(nb == 2){
				texte = texte.substring(i+1, texte.length); // on vire la partie découpé !
				j++;
				break;
			}
			i++;
		}
	}
	var message_code ="";
	message_non_code_num.forEach(function(element, index, array){ // On choppe le message codé en nombre
		message_code += (alphabet.indexOf(element.charAt(0))*matrice[0] + alphabet.indexOf(element.charAt(1))*matrice[1])%mod + ',';
		message_code += (alphabet.indexOf(element.charAt(0))*matrice[2] +alphabet.indexOf(element.charAt(1))*matrice[3])%mod + ',';
	});
	message_code = message_code.split(',');
	message_code.pop();
	return retourneMot(message_code,alphabet);
}
function decrypte_hill(texte, matrice, determinant, mod){
	matrice = inverserMatrice(matrice, determinant);
	return crypte_hill(texte, matrice, mod);
}
function hill(choice){
	var texte = recupererTexte(choice);
	var matrice = recupererMatrice();
	var mod = recupererRadio();
	var alphabet;
	if(mod === 0){
		mod = 26;
		texte = nettoyage(texte.toUpperCase());
	}
	else {
		mod = creerAlphabet(0).length;
	}
	var determinant = verifMatrice(matrice, mod);
	if(determinant===false)
		return;
	if(choice == 1){
		$('#textecode').val(crypte_hill(texte, matrice, mod));
	}
	else{
		$('#texteclair').val(decrypte_hill(texte, matrice, determinant, mod));
	}
	disable();
}
function verifMatrice(matrice, mod){
	var error = false;
	for(var i = 0; i < 4; i++){
		if(!matrice[i].match(/[0-9]+/)){
			$('#matrice th').eq(i).addClass('has-error');
			$('#error').text('Erreur dans la matrice.');
			$('#error').show();
			error = true;
		}
		else{
			$('#matrice th').eq(i).removeClass('has-error');
		}
	}
	if(error)
		return false;
	var determinant = calculdeterminant(matrice);
	if(determinant === 0){//Matrice non inversible
		$('#matrice').addClass('has-error');
		$('#error').text('Clé invalide.');
		$('#error').show();
		error = true;	
	}
	else{
		determinant = euclideEtendu(determinant, mod);
		if(determinant === false){
			$('#matrice').addClass('has-error');
			$('#error').text('Clé invalide.');
			$('#error').show();
			error = true;
		}
	}
	if(error)
		return false;
	$('#error').hide();
	$('#matrice').removeClass('has-error');
	$('#matrice').addClass('has-success');
	return determinant;
}
function verifMatriceGen(matrice, mod){
	var determinant = calculdeterminant(matrice);
	if(determinant === 0){//Matrice non inversible
		return false;
	}
	else{
		determinant = euclideEtendu(determinant, mod);
		if(determinant === false){
			return false;
		}
	}
	return true;
}
function genererKey(){
	var alphabet = creerAlphabet(recupererRadio()+26).length;
	var matrice = [];
	var determinant;
	do{
		for(var i = 0; i < 4; i++){
			matrice[i] = Math.floor(Math.random()*10000000);
		}
		determinant = calculdeterminant(matrice);
	}while(!verifMatriceGen(matrice,alphabet));
	$("input[name=top-left]").val(matrice[0]); $('input[name = top-right]').val(matrice[1]); $('input[name = "bottom-left"]').val(matrice[2]); $('input[name = "bottom-right"]').val(matrice[3]);
	disable();
}
function recupererTexte(choice){
	if(choice == 1)
		return $('#texteclair').val();
	return  $('#textecode').val();
}
function recupererMatrice(){
	return [$("input[name=top-left]").val(), $('input[name = top-right]').val(), $('input[name = "bottom-left"]').val(), $('input[name = "bottom-right"]').val()];
}
function retourneMot(mot_chiffre, alphabet){
	var mot_chiffre_text = "";
	for(var i = 0; i < mot_chiffre.length;i++) // - 1 pour virer la chaine vide créer par le split avec la dernière fucking virgule
		mot_chiffre_text += alphabet[Math.abs(parseInt(mot_chiffre[i]))];
	return mot_chiffre_text;
}
function retourneMotNombre(mot, alphabet){
	mot = mot.toLowerCase();
	var str = " ";
	for(var i = 0;  i<mot.length;i++){
		var tmp = alphabet.indexOf(mot.charAt(i));
		if(tmp != -1){
			str += tmp + ' ';
		}
		else
			str += mot.charAt(i);
	}
	return str;
}


var Matrice = function (array) {
	this.matrice = [];
	this.setMatrice(array);
	console.log(this);
};

Matrice.prototype = {
	gauss: function(){
		var r = 0;
		for(j = 0; j < this.taille ; j ++){ //Colonne
			k = this.maxColonne(j);
			console.log("k value = "+ k);
			if(this.matrice[k][j] !== 0){
				r++;
				this.diviserLigne(k, this.matrice[k][j]);
				console.log(" divi" + this.matrice[k]);
				this.swap(k, r);
				for(var i = 0; i < this.taille; i++){
					console.log(i+ " " + j);
					console.log(this.matrice[i]);
					if(i !==r){
						this.multiliplierLigne(r, this.matrice[i][j]);
					}
				}
			}
		}
	},
	maxColonne: function(j){
		var max = this.matrice[j][0];
		var indice  = 0;
		for(var i = 1; i < this.taille; i++){
			if(max < Math.abs(this.matrice[i][j])){
				indice = i;
				max = Math.abs(this.matrice[i][j]);
			}
		}
		return indice;
	},
	swap: function(i, k){
		if(i === k)
			return;
		var tmp = this.matrice[i];
		this.matrice[i] = this.matrice[k];
		this.matrice[k] = tmp;
	},
	diviserLigne: function(i, diviseur){
		if(diviseur === 0)
			return;
		for(var j = 0; j < this.taille; j++){
			this.matrice[i][j] /= diviseur;
		}
		return this;
	},
	multiliplierLigne: function(ligne, facteur){
		for(var j = 0; j < this.taille; j++){
			this.matrice[ligne][j] *= facteur;
		}
		return this;
	},
	soustraitreLigne: function(ligne, moins){
		for(var j = 0; j < this.taille; j++){
			this.matrice[ligne][j] -= moins;
		}
		return this;
	},
	toString: function(){
		var str = "";
		for(var i = 0; i < this.taille; i++){
			for(var j = 0; j < this.taille; j++)
				str+= this.matrice[i][j];
			str+="\n";
		}
	},
	setMatrice: function(els) {
		var n = Math.sqrt(els.length);
		for(var i = 0; i < n; i++){
			this.matrice[i] = [];
				for(var j = 0; j < n; j++)
						this.matrice[i].push(els[j + i * n]);
		}
		 this.taille =  this.matrice.length;
		 return this;
	}



};

