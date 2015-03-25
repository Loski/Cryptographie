//Tentative dans le train !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function frequence(texte, taille){
	//texte = $('#textecode').val();
	var arrayTxt = [];
	var txttmp = texte;
	arrayFreq = [];
	for(var i = 0;  i < taille; i++){ // on coupe le txt, puis on enlève le premier caractère pour faire différente série de caractère
		arrayTxt.push(couperTexte(txttmp, taille)); // def dans hill
		txttmp = txttmp.substring(1, txttmp.length);    //fction qui retire le premier caractère
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
	//suprimme les multiples valeurs de arrayTxt
	for(i = 0; i < taille; i++)
		arrayTxt[i] = uniq_fast(arrayTxt[i]);
	for(i = 0; i < taille; i++){
		var arrayValue = [];
		arrayTxt[i].forEach(function(element2, index, array){
			if(arrayFreq[taille].hasOwnProperty(element2)){
				arrayFreq[taille][element2] += arrayFreq[i][element2];
			}
			else{
				arrayFreq[taille][element2] = arrayFreq[i][element2];
			}
			arrayValue.push(element2);
		});
	}
	arrayFreq[taille].sort(compare);
	return arrayFreq[taille];
}
function compare(x, y) {
    return y - x;
}
// créer les arrays des lettres les plus probable
function  arrayFreqApparition(n){
	switch(n){
	//Rajout des espaces c'est parfois le caractère qui revient le plus
		case 1:
			return "eas intrluodcmpvgfqhbxjyzkw ".split('');
		case 2:
			return "es,le,de,re,en,on,nt,er,te,et,el,an,se,la,ai,ne,ou,qu,me,it,ie,em,ed,ur,is,ec,ue,ti,ra,ns,in,ta".split(',');
		case 3: 
			return "ent,que,les,ede,des,ela,ion,ait,res".split(',');
		case 4:
			return "tion,ment,ique,emen,dela,elle".split(',');
	} 
	
}

/**VOL******/
function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;

}

//décrypte juste par 2
function cryptanalyseHill(texte, taille, alphabet,changeLetter){
	taille = parseInt(taille);
	alphabet = alphabet.split('');
	var frequenceMax = maxCharacterFrequence(texte,taille+taille,changeLetter);	
	var f = frequence(texte, 4);
	var motMaxFrance = arrayFreqApparition(taille*2)[0];
	var txt1 =	frequenceMax.substring(0,taille).toUpperCase();
	var txt2 = frequenceMax.substring(taille, taille+taille).toUpperCase();
	var crypt1 = motMaxFrance.substring(0,taille).toUpperCase();
	var crypt2 = motMaxFrance.substring(taille,taille*2).toUpperCase();
	var matrice = [];
	var matriceCrypter = [];
	for(var i = 0; i < 2; i++){
		matrice.push(alphabet.indexOf(txt1[i]));
		matrice.push(alphabet.indexOf(txt2[i]));
		matriceCrypter.push(alphabet.indexOf(crypt1[i]));
		matriceCrypter.push(alphabet.indexOf(crypt2[i]));
	}
	matriceCrypter = new Matrice(matriceCrypter);
	var matriceInverse = new Matrice(matrice).inverserMatrice(alphabet.length); 
	console.log(crypte_hill(texte, matriceCrypter.multiplicationMatrice(matriceInverse, alphabet.length),alphabet.length));
}

function histo(tab){
	console.log("Histo",tab);
    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
        text: "Top Oil Reserves"    
      },
      animationEnabled: true,
      axisY: {
        title: "Reserves(MMbbl)"
      },
      legend: {
        verticalAlign: "bottom",
        horizontalAlign: "center"
      },
      theme: "theme2",
      data: [

      {        
        type: "column",  
        showInLegend: true, 
        legendMarkerColor: "grey",
        legendText: "MMbbl = one million barrels",
        dataPoints: tab
      }   
      ]
    });

    chart.render();
  }

function maxCharacterFrequence(text,taille,changeLetter){
	
	var array=frequence(text, taille);
	console.log("TABLEAU DE FREQUENCE :",array);
	var key;
	tabKey=[];
	for (key in array)
    {
		tabKey.push(key);
    }
	var occurence = [];
	var tabHisto=[];
	var ii=0;
	for(var key in tabKey)
	{
		tabHisto[ii]=[];
		tabHisto[ii].y=array[tabKey[key]];
		tabHisto[ii].label=tabKey[key];
		ii++;
		occurence.push(array[tabKey[key]]);
	}
		
	var max = Math.max.apply(Math, occurence);
	var listeMax="";
	
	histo(tabHisto);
	
	for(var i=0;i<tabKey.length;i++)
	{
		if(max==array[tabKey[i]])
		{
			listeMax+=tabKey[i];
		}
	}
	console.log("Val de changeLetter :"+changeLetter);
	return listeMax[changeLetter].toUpperCase();
}

function decryptCesarAppel(key){
	$('.active .cle').val(key);
	$('#decrypterCesar').click();
}

function key_Cesar(text,alphabet,iteration,changeLetter){

		var array=arrayFreqApparition(1);
		
		var caraMaxOcurrence = alphabet.indexOf(maxCharacterFrequence(text,1,changeLetter));
		var letterMostUse = alphabet.indexOf(array[iteration].toUpperCase());
		console.log(maxCharacterFrequence(text,1,changeLetter),array[iteration].toUpperCase());
		var key =(caraMaxOcurrence-letterMostUse)%alphabet.length;
		if(key<0)
			key+=alphabet.length;
		
		console.log("Decrypt clé de césar : ",key);
	
		return key;
}

function vig_row_analyse(text,alphabet,iteration,changeLetter)
{
	return alphabet.charAt(key_Cesar(text,alphabet,iteration,changeLetter));
}

function key_Vigenere(alphabet,text,keyLength,iteration,changeLetter)
{
	if(keyLength==1)
	{
		var key =key_Cesar(text,alphabet,iteration,changeLetter);
		console.log(key);
		decryptCesarAppel(key);
		
	}
else{
	var row = "";
	
	for(var j=0;j<keyLength;j++)
	{
		for(var i=j;i<text.length;i+=keyLength)
		{
			row+=text[i];
		}
	}
	var key="";
	console.log(row);
	
	for(var i=0,j=0;j<keyLength;i+=keyLength,j++)
	{
		key+=vig_row_analyse(row.substring(i,i+keyLength),alphabet,iteration,changeLetter);
	}
	
	document.getElementById('keyVig').value=key;
	document.getElementById('keyCryptanalyse').value=key;
	vigenere_decrypt(text,key,alphabet,1);
	console.log("Decrypt clé de VIVI : "+key);
}
}

function showKeyLength(){
	var cryptage = recupererRadio2();
	if(cryptage==2)
		$("#keySize").css("display","block");
	else
		$("#keySize").css("display","none");
}

$(document).ready(function()
{ 
	var iteration =0;
	var changeLetter =0;
	$("#cryptanalyseDecrypt").mousedown(function()                //Foutre un reset en cas de changement du bouton radio/texte codé
	{
		var texte=document.getElementById('textecode').value;
		var keylength = parseInt(document.getElementById("keySize").value);
		var alphabet = document.getElementById('alphabet').value;
		var cryptage = recupererRadio2();
		if (cryptage ==1)
		{
			key_Vigenere(alphabet,texte,1,iteration%alphabet.length,changeLetter);
		}
		else if(cryptage == 2){
			key_Vigenere(alphabet,texte,keylength,iteration%alphabet.length,changeLetter);
		}
		else if(cryptage == 3){
			cryptanalyseHill(texte, keylength, alphabet,changeLetter);
		}
		else if(cryptage == 4){
			///afine
		}
		else if(cryptage == 5){
			//rsa
		}
		else{
			//nodef
		}
		
		iteration++;
		if(iteration%alphabet.length==0)
				changeLetter++;
	});
});
