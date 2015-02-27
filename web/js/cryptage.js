function creerAlphabet(){
	return "abcdefghijklmnopqrstuvwxyz".split("");
}

function calculdeterminant(array){
	return array[0] * array[3] - array[1] * array[2];
}
function inverserMatrice(matrice, determinant){
		return [(determinant * matrice[3]), (determinant * -matrice[1]), (determinant * -matrice[2]), (determinant * matrice[0])];
}
//Fonction pour trouver les nombres premiers entrent eux. Le petit génie qui va faire la fonction affine et qui va récupérer un magnifique travail tout fait. JE L'EMMERDE 
function trouverDeterminantModulo(determinant, modulo){
	liste_premier = [1, 3, 5, 7, 9, 11, 15, 17, 21, 23, 25]; //On met pas 2 et 13, car c'est jamais premier avec 26. #LOL
	for(var i = 0; i < liste_premier.length; i++)
		if(((determinant*liste_premier[i])%26) ===1)
			return liste_premier[i];
	return false;
}
function absoluteMatrice(matrice){
	for(var i = 0; i< 4; i++){
		matrice[i] = matrice[i]%26;
		if(matrice[i] < 0)
			matrice[i] = matrice[i] + 26;
	}
	return matrice;
}
function crypte_hill(texte, matrice){
	var alphabet = creerAlphabet();
	matrice = absoluteMatrice(matrice);
	if(!texte.length%2){
		texte+='a';
	}
	texte = texte.toLowerCase();
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
			if(texte.charAt(i).match(/[a-z]+/)){
				nb++;
			}
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
		message_code += (alphabet.indexOf(element.charAt(0))*matrice[0] + alphabet.indexOf(element.charAt(1))*matrice[1])%26 + ',';
		message_code += (alphabet.indexOf(element.charAt(0))*matrice[2] +alphabet.indexOf(element.charAt(1))*matrice[3])%26 + ',';
	});
	message_code = message_code.split(',');
	message_code.pop();
	console.log(message_code.join(','));
	return retourneMot(message_code,alphabet);
}
function decrypte_hill(texte, matrice, determinant){
	matrice = inverserMatrice(matrice, determinant);
	return crypte_hill(texte, matrice);
}
function hill(choice){
	var texte = recupererTexte(choice);
	var matrice = recupererMatrice();
	var determinant = verifMatrice(matrice);
	if(determinant===false)
		return;
	if(choice == 1){
		$('#textecode').val(crypte_hill(texte, matrice));
	}
	else{
		$('#texteclair').val(decrypte_hill(texte, matrice, determinant));
	} 
}
function verifMatrice(matrice){
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
		$('#error').text('Le déterminant est nul.');
		$('#error').show();
		error = true;	
	}
	else{
		determinant = trouverDeterminantModulo(determinant, 26);
		if(determinant === false){
			$('#matrice').addClass('has-error');
			$('#error').text('Le déterminant n\'est pas premier avec 26.');
			$('#error').show();
			error = true;
		}
	}
	if(error)
		return false;
	$('#error').hide();
	$('#matrice').removeClass('has-error');
	$('#matrice').addClass('has-success');
	console.log(determinant);
	return determinant;
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