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


function crypte_hill(texte, matrice, mod){

	for(var i = 0; i< matrice.taille; i++){
		for(var j =0;j < matrice.taille;j++){
			matrice.matrice[i][j] = matrice.matrice[i][j]%mod;
			if(matrice.matrice[i][j] < 0)
				matrice.matrice[i][j] = matrice.matrice[i][j] + mod;
		}
	}	
	var alphabet = creerAlphabet(mod);
	while(texte.length%matrice.taille!==0)
		texte+='A';
	var message_non_code_num = couperTexte(texte, matrice.taille);
	message_code = crypterTexte(message_non_code_num, matrice, mod).split(',');
	message_code.pop(); // supprime le dernier caract donc la ,
	return retourneMot(message_code,alphabet);
}

function crypterTexte(tab, mat, mod){
	var alphabet = creerAlphabet(mod);
	var message_code ="";
	tab.forEach(function(element, index, array){ // On choppe le message codé en nombre
		for(var i = 0; i < mat.taille ;i++){ //par ligne
			message_code_tmp = 0;    //index de la lettre
			for(var j = 0; j < mat.taille;j++){
				 message_code_tmp += alphabet.indexOf(element.charAt(j))*mat.matrice[i][j];
			}
			message_code += message_code_tmp%mod + ',';
		}
	});
	return message_code;
}
function couperTexte(texte, taille){
	var j = 0; 
	var message_non_code_num = [];
	while(true){
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
			if(nb == taille){
				texte = texte.substring(i+1, texte.length); // on vire la partie découpé !
				j++;
				break;
			}
			i++;
		}
	}
	return message_non_code_num;
}
function decrypte_hill(texte, matrice, determinant, mod){
	matrice = matrice.inverserMatrice(mod);
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
	var determinant = matrice.verifMatrice(mod);
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

function genererKey(){
	var mod = creerAlphabet(recupererRadio()+26).length;
	var matrice = [];
	var taille = Math.floor(Math.random() * 5+2);
	do{
		for(var i = 0; i < taille * taille; i++){
			matrice[i] = Math.floor(Math.random()*150);
		}
		matriceObject = new Matrice(matrice);
	}while(false === matriceObject.verifMatriceGen(mod));
	creerTableHill(taille);
	afficherMatrice(matriceObject);
	$("#HillDiv select").val(taille);
	disable();
}
function recupererTexte(choice){
	if(choice == 1)
		return $('#texteclair').val();
	return  $('#textecode').val();
}
function recupererMatrice(){
	var array = [];
	var tr = $('table tr');
	var n = $('#HillDiv select option:selected').val();
	tr.each(function(element){
		for(var i = 0; i < n; i++){
			array.push(parseInt($(this).children().eq(i).children().val()));
		}
	});
	return new Matrice(array);
}
function afficherMatrice(matrice){
	var n = matrice.taille;
	var tr = $('table tr');
	var j = 0;
	tr.each(function(element){
		for(var i = 0; i < n; i++){
			$(this).children().eq(i).children().val(matrice.matrice[j][i]);
		}
		j++;
	});
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
};

Matrice.prototype = {
	
	calculdeterminant: function(){
		if(this.taille == 2)
			return this.matrice[0][0] * this.matrice[1][1] - this.matrice[1][0] * this.matrice[0][1];
		else{
			matricetmp = this.gauss();
			return Math.round(matricetmp.multiDiago());
		}
	},
	verifCarre: function(){
		return this.matrice.length === this.matrice[0].length;
	},
	multiDiago: function(){
		var valDiago = this.matrice[0][0];
		for(i = 1;  i <  this.taille;i++){
			valDiago*= this.matrice[i][i];
		}
		return valDiago;
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
		return this;
	},
	gauss: function() {
		var M = new Matrice(this), els;
		var n = this.matrice.length, k = n, i, np, kp = this.matrice[0].length, p;
		do { i = k - n;
			if (M.matrice[i][i] === 0) {
				for (j = i + 1; j < k; j++) {
					if (M.matrice[j][i] !== 0) {
						els = []; np = kp;
						do { p = kp - np;
							els.push(M.matrice[i][p] + M.matrice[j][p]);
						} while (--np);
						M.matrice[i] = els;
						break;
					}
				}
			}
			if (M.matrice[i][i] !== 0) {
				for (j = i + 1; j < k; j++) {
					var multiplier = M.matrice[j][i] / M.matrice[i][i];
					els = []; np = kp;
					do { p = kp - np;
            // Elements with column numbers up to an including the number
            // of the row that we're subtracting can safely be set straight to
            // zero, since that's the point of this routine and it avoids having
            // to loop over and correct rounding errors later
	            els.push(p <= i ? 0 : M.matrice[j][p] - M.matrice[i][p] * multiplier);
	        } while (--np);
	        M.matrice[j] = els;
	    }
	}
	} while (--n);
	    /*for( i = 0; i < M.taille; i ++ ){
	    	M.diviserLigne(i, M.matrice[i][i]);
	    }*/
	    return M;
	},
	cofacteur:function(){
		var determinant = this.calculdeterminant();
		array = [];
		for(var i = 0; i < this.taille; i++)
			for(var j = 0; j < this.taille;j++){
				var detCo = this.supprimerLigneColonne(this, i, j).calculdeterminant();
				if((i+j)%2 !==0)
					detCo*=-1;
				array.push(detCo);
			}
			return new Matrice(array);
	},
	supprimerLigneColonne:function(mat, ligne, colonne){
		var array_nouvelle_matrice = [];
		for(var i = 0; i < mat.taille; i++){
			for(var j = 0; j < mat.taille; j++)
				if(i!== ligne && j !== colonne)
					array_nouvelle_matrice.push(mat.matrice[i][j]);
			}
			return new Matrice(array_nouvelle_matrice);
	},
	diviserLigne: function(ligne, diviseur){
		if(diviseur === 0)
			return;
		for(var j = 0; j < this.taille; j++){
			this.matrice[ligne][j] = (this.matrice[ligne][j]/diviseur);
		}
		return this;
	},
	multiplierLigne: function(ligne, facteur){
		for(var j = 0; j < this.taille; j++){
			this.matrice[ligne][j] = (this.matrice[ligne][j]*facteur);
		}
		return this;
	},
	transvection: function (ligne, ligne_facteur, facteur){
		var mat = new Matrice(this);
		for(var j = 0; j < this.taille; j++){
			mat.matrice[ligne][j] = mat.matrice[ligne][j]*(facteur*mat.matrice[ligne_facteur][j]);
		}
		return mat;
	},
	triangulation: function(){
		var mat = new Matrice(this);
		mat = mat.diviserLigne(0, mat.matrice[0][0]);
		for(var i = 1; i < mat.taille; i++){
			mat = mat.transvection(i, 0, mat.matrice[i][0]/mat.matrice[0][0]);
		} 
		return mat;
	},
	inverserMatrice:function(mod){
		var determinant = this.calculdeterminant();
		determinant = euclideEtendu(determinant, mod);
		var cofacteur_inverser = this.cofacteur().transposer();
		for(var i = 0; i < cofacteur_inverser.taille; i++)
			for(var j = 0; j <cofacteur_inverser.taille; j++)
				cofacteur_inverser.matrice[i][j] = (cofacteur_inverser.matrice[i][j] * determinant);
		return cofacteur_inverser;
	},
	multiplicationMatrice:function(matrice2){
		var matriceMultiplier =[];
		matriceMultiplier.push(this.matrice[0][0] * matrice2.matrice[0][0]+this.matrice[0][1] * matrice2.matrice[1][0]);
		matriceMultiplier.push(this.matrice[0][0] * matrice2.matrice[0][1]+this.matrice[0][1] * matrice2.matrice[1][1]);
		matriceMultiplier.push(this.matrice[1][0] * matrice2.matrice[0][0]+this.matrice[1][1] * matrice2.matrice[1][0]);
		matriceMultiplier.push(this.matrice[1][0] * matrice2.matrice[0][1]+this.matrice[1][1] * matrice2.matrice[1][1]);
	
			return matriceMultiplier;
	},
	transposer: function(){
		var matriceTranspo = new Matrice(this);
		for(var i = 0; i < matriceTranspo.taille;i++)
			for(var j = 0; j < matriceTranspo.taille; j++){
				matriceTranspo.matrice[i][j] = this.matrice[j][i];
			}
		console.log(matriceTranspo);
			return matriceTranspo;
	},
	soustraitreLigne: function(ligne, moins){
		var tmp = new Matrice(this);
		for(var j = 0; j < this.taille; j++){
			tmp.matrice[ligne][j] -= moins;
		}
		return tmp;
	},
	ajouterLigne: function(ligne, plus){
		this.soustraitreLigne(ligne,-plus);
	},
	setMatrice: function(els) {
		this.matrice = [];
		if(els.hasOwnProperty('matrice')){ //Double dimension
			var taille = els.matrice.length;
			for(var i = 0; i <taille; i++){
				this.matrice[i] = [];
				for(var j = 0; j < taille; j++){
					this.matrice[i].push(els.matrice[i][j]);
				}
			}
		}
		else{
			var n = Math.sqrt(els.length);
			for(var i = 0; i < n; i++){
				this.matrice[i] = [];
				for(var j = 0; j < n; j++)
					this.matrice[i].push(els[j + i * n]);
			}
		}
		this.taille =  this.matrice.length;
	},
	verifMatriceGen:function(mod){
		var determinant = this.calculdeterminant();
		if(Math.abs(determinant) < 0.000001){//Matrice non inversible
			return false;
		}
		else{
			determinant = euclideEtendu(determinant, mod);
			if(determinant === false){
				return false;
			}
		}
		return determinant;
	},
	verifMatrice: function(mod){
		var determinant = this.verifMatriceGen(mod);
		if(determinant === false){
			$('#matrice').addClass('has-error');
			$('#error').text('Clé invalide.');
			$('#error').show();
			return false;
		}
		$('#error').hide();
		$('#matrice').removeClass('has-error');
		$('#matrice').addClass('has-success');
		return determinant;
	},

};

function matriceIdentite(n){
	var array =[];
	for(var i = 0; i < n; i++){
		for(var j = 0; j < n; j++){
			if(i===j)
				array.push(1);
			else array.push(0);
		}
	}
	return new Matrice(array);
}

