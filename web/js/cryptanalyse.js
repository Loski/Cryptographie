function frequence(texte, taille){
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
	//supprimme les multiples valeurs de arrayTxt
	var arrayObject = [];
	var min = 0;
	for(i = 0; i < taille; i++)
		arrayTxt[i] = uniq_fast(arrayTxt[i]);
	for(i = 0; i < taille; i++){
		var arrayValue = [];
		arrayTxt[i].forEach(function(element2, index, array){
			for(var j = -1+min; j < arrayObject.length; j++){
				min = 1;
				if(!existe(arrayObject, element2)){
					arrayObject.push({"label" : element2, "y" : 0});   //Initialisation
				}
				else if(arrayObject[j].hasOwnProperty('label')){
					if(arrayObject[j].label == element2){
						arrayObject[j].y += arrayFreq[i][element2];
					}
				}
		}
		});
	}
	arrayObject.sort(function(a,b){
		if (a.y > b.y)
	      return 1;
	    if (a.y < b.y)
	      return -1;
	    return 0;
	});
	arrayObject.nombreElement = calculSommeLettre(arrayObject);
	return arrayObject;
}


function existe(array, data){
	for(var i = 0; i < array.length; i++){
		if(array[i].label == data)
			return true;
	}return false;
}

// créer les arrays des lettres les plus probable
function  arrayFreqApparition(n){
	switch(n){
	//Rajout des espaces c'est parfois le caractère qui revient le plus
		case 1:
			return " easintrluodcmpvgfqhbxjyzkw ".split('');
		case 2:
			return "es,le,de,re,en,on,nt,er,te,et,el,an,se,la,ai,ne,ou,qu,me,it,ie,em,ed,ur,is,ec,ue,ti,ra,ns,in,ta".split(',');
		case 3: 
			return "ent,que,les,ede,des,ela,ion,ait,res".split(',');
		case 4:
			return "tion,ment,ique,emen,dela,elle".split(',');
	} 
	
}

function arrayFreqObject(n){
	return [ {y:14.71,lambda:'e'}, {y:7.95,lambda:'s'},{y:7.63,lambda:'a'},{y:7.53,lambda:'i'},{y:7.25,lambda:'t'},{y:7.10,lambda:'n'},{y:6.56,lambda:'r'},{y,lambda:'u'}];
}

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
	var txttmp = [];
	var crypt = [];
	for(var i = 0; i<taille; i++){
		txttmp[i] = arrayFreqApparition(taille)[i];
	}
	var matriceAInverser = [];
	var matriceCrypter = [];
	var f = frequence(texte, taille);
	for(var i =0; i < 5; i ++){
		crypt[0] =maxFreqArray(f, i);
		for(var j =0; j<5;j++){
			crypt[1] = maxFreqArray(f,j);
			matriceMotLangue = txttmp.join('').toUpperCase().split('');
			matriceAInverser = crypt.join('').split('');
			for(k = 0; k < matriceAInverser.length; k++){
				matriceAInverser[k] = alphabet.indexOf(matriceAInverser[k]);
				matriceMotLangue[k] = alphabet.indexOf(matriceMotLangue[k]);
			}
			matriceCrypter = new Matrice(matriceMotLangue);
			var matriceInverse = new Matrice(matriceAInverser);
				matriceInverse = matriceInverse.inverserMatrice(alphabet.length);
			/*else{
				var tmp = matriceInverse.matrice[0];
				matriceInverse.matrice[0] = matriceInverse.matrice[1];
				matriceInverse.matrice[1] = tmp;
				if(matriceInverse.verifMatriceGen(alphabet.length) === false)
					cryptanalyseHill(texte, taille, alphabet.join(),changeLetter);
			}*/
				console.log(crypte_hill(texte, matriceCrypter.multiplicationMatrice(matriceInverse),alphabet.length));
			
		}
	}
}

function histo(tab){
	CanvasJS.addColorSet("greenShades",
                [//colorSet Array

                "#204D74"        
                ]);
    var chart = new CanvasJS.Chart("chartContainer",
    {
		colorSet: "greenShades",
	zoomEnabled: true,
	exportEnabled: true,
	exportFileName: "Analyse_Frequencielle",
      title:{
        text: "Analyse Fréquentielle",
		fontSize: 20,
		fontWeight: "bolder",		
      },
      animationEnabled: true,
      axisY: 	{
        title: "Occurence",
		titleFontColor: "black",
		labelFontColor: "black",
		labelFontSize: 20,
		valueFormatString: "################################",
		minimum:0
		
	},
	  
	  axisX: {
		labelFontColor: "black",
		labelFontSize: 20,
		labelAutoFit:true,
		interval: 1
      },
	  
      legend: {
        verticalAlign: "bottom",
        horizontalAlign: "center"
      },
      //theme: "theme2",
      data: 	[

      {    
		mouseover: function(e){
			var texte=document.getElementById('textecode').value;
			var chain = "";
			for(var i=0;i<texte.length;i++)
			{
				if(texte[i]==e.dataPoint.label)
					chain+='<span style="color:red">'+texte[i]+"</span>"
				else
					chain+=texte[i];
			}
			$("#editableDiv").html(chain);			
		},
        /*showInLegend: true, 
        legendMarkerColor: "white",
        legendText: " ",*/
        dataPoints: tab
      }   
     ]
    });

    chart.render();
  }
  
function histoPourcent(tab){
	tab=calculFrequencePourcentage(tab);
	CanvasJS.addColorSet("greenShades",
                [//colorSet Array

                "#204D74"        
                ]);
	
    var chart = new CanvasJS.Chart("chartContainer",
    {
		colorSet: "greenShades",
	zoomEnabled: true,
	exportEnabled: true,
	exportFileName: "Analyse_Frequencielle",
      title:{
        text: "Analyse Fréquentielle (%)",
		fontSize: 20,		
      },
      animationEnabled: true,
      axisY: 	{
        title: "Occurence",
		titleFontColor: "black",
		labelFontColor: "black",
		labelFontSize: 20,
		valueFormatString: "##",
		maximum:100
	},
	  
	  axisX: {
		labelFontColor: "black",
		labelFontSize: 20,
		labelAutoFit:true,
		interval: 1
      },
	  
      legend: {
        verticalAlign: "bottom",
        horizontalAlign: "center"
      },
      //theme: "theme2",
      data: 	[

      {     indexLabelWrap: true,
		indexLabel: "{y} %",
		yValueFormatString: "##,##",
        indexLabelPlacement: "outside",  
        indexLabelOrientation: "horizontal",
		indexLabelFontColor: "red",
        type: "column",  
		mouseover: function(e){
			var texte=document.getElementById('textecode').value;
			var chain = "";
			for(var i=0;i<texte.length;i++)
			{
				if(texte[i]==e.dataPoint.label)
					chain+='<span style="color:red">'+texte[i]+"</span>"
				else
					chain+=texte[i];
			}
			$("#editableDiv").html(chain);			
		},
        /*showInLegend: true, 
        legendMarkerColor: "white",
        legendText: " ",*/
        dataPoints: tab
      }   
     ]
    });

    chart.render();
  }
  
 function triInverse(array){
 	var j = 0;
 	var arrayInverse = [];
 	for(var i = array.length-1; i >=0; i--){
 		arrayInverse[j] = array[i];
 		j++;
 	}
 	return arrayInverse;
 }
function maxFreq(texte, taille, changeLetter){
	var array = frequence(texte, taille);
	return array[array.length - (1 + changeLetter)];
}
function maxFreqArray(array, i){
	return array[array.length - (1+i)].label;
}
function decryptCesarAppel(key){
	$('.active .cle').val(key);
	$('#decrypterCesar').click();
}

function key_Cesar(text,alphabet,iteration,changeLetter){

		var array=arrayFreqApparition(1);
		var caraMaxOcurrence = alphabet.indexOf(maxFreq(text,1,changeLetter).label);
		var letterMostUse = alphabet.indexOf(array[iteration].toUpperCase());
		//console.log(maxCharacterFrequence(text,1,changeLetter),array[iteration].toUpperCase());
		var key =(caraMaxOcurrence-letterMostUse)%alphabet.length;
		if(key<0)
			key+=alphabet.length;
	
		console.log(maxFreq(text,1,changeLetter).label,array[iteration].toUpperCase());
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
	
	for(var i=0,j=0;j<keyLength;i+=text.length/keyLength,j++)
	{
		key+=vig_row_analyse(row.substring(i,i+text.length/keyLength),alphabet,iteration,changeLetter);
	}
	
	document.getElementById('keyVig').value=key;
	document.getElementById('keyCryptanalyse').value=key;
	vigenere_decrypt(text,key,alphabet,1);
	console.log("Decrypt clé de VIVI : "+key);
}
}

function showKeyLength(){
	var cryptage = recupererRadio2();
	
	if(cryptage==2 || cryptage == 3)
		$("#keySize").show();
	else
		$("#keySize").hide();
}
function indiceCoincidence(array){
	var somme = 0;
	var n = calculSommeLettre(array);
	for(var i = 0; i < array.length; i++){
		somme += (array[i].y*(array[i].y-1))/(n*(n-1));
	}
	console.log(somme);
	return somme;
}
function calculSommeLettre(array){
	var somme = 0;
	for(var i =0; i < array.length; i++){
		somme+=array[i].y;
	}
	return somme;
}
function calculFrequencePourcentage(array){
	for(var i =0; i < array.length; i++)
		array[i].y = parseFloat((array[i].y / array.nombreElement * 100).toFixed(2)); 
	return array;
}
$(document).ready(function()
{ 
	$("#changeHisto").mousedown(function()
	{	var texte=document.getElementById('textecode').value;
		histoPourcent(frequence(texte,1));
	});

	var iteration =0;
	var changeLetter =0;
	$("#cryptanalyseDecrypt").mousedown(function()                //Foutre un reset en cas de changement du bouton radio/texte codé
	{
		var texte=document.getElementById('textecode').value;
		var keylength = parseInt(document.getElementById('keySize').value);
		var alphabet = document.getElementById('alphabet').value;
		var cryptage = recupererRadio2();
		
		if (cryptage ==1)
		{
			if(iteration==0)
				histo(frequence(texte,1),false);
			key_Vigenere(alphabet,texte,1,iteration%alphabet.length,changeLetter);
		}
		else if(cryptage == 2){
			if(iteration==0)
				histo(frequence(texte,1),false);
			key_Vigenere(alphabet,texte,keylength,iteration%alphabet.length,changeLetter);
		}
		else if(cryptage == 3){
			if(iteration==0)
				histo(frequence(texte,keylength),false);
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
	$('#reset').mousedown(function(event) {
		iteration = 0;
		changeLetter = 0;
	});
});

