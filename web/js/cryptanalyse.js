//Tentative dans le train !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function frequence(texte, taille){
	var arrayTxt = [];
	var txttmp = texte;
	arrayFreq = [];
	for(var i = 0;  i < taille; i++){ // on coupe le txt, puis on enlève le premier caractère pour faire différente série de caractère
		arrayTxt.push(couperTexte(txttmp, taille)); // def dans hill
		txttmp = txttmp.substring(1, txttmp.lenght);    //fction qui retire le premier caractère
		arrayFreq[i] = [];
	}
	arrayFreq[taille] = []; // on renvoie cette partie qui concatène tout.
	for(i = 0; i < taille; i++){
		arrayTxt[i].forEach(function(element, index, array){
			if(!arrayFreq[i].hasOwnProperty(element)){ // S l'élément n'est pas déjà présent le tableau donc déjà test
				arrayFreq[i][element] = 0;   // add avec key = element
				arrayTxt[i].forEach(function(element2, index, array){
					if(element === element2){
						arrayFreq[i][element]++;
					}
				});
			}
		});
	}
	for(i = 0; i < taille; i++){
		arrayTxt[i].forEach(function(element2, index, array){
			if(arrayFreq[taille].hasOwnProperty(element2)){
				arrayFreq[taille][element2] += arrayFreq[i][element2];
			}
			else{
				arrayFreq[taille][element2] = arrayFreq[i][element2];
			}
		});	
	}
	console.log(arrayFreq[taille]);
	return arrayFreq[taille];
}