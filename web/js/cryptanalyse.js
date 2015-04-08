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
	//supprime les multiples valeurs de arrayTxt
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
function  arrayFreqApparition(n, alphabet){
	if(typeof(alphabet) === 'undefined')
		alphabet = false;
	if(!alphabet)
	switch(n){
	//Rajout des espaces c'est parfois le caractère qui revient le plus
		case 1:
			return " easintrluodcmpvgfqhbxjyzkw ".split('');
		case 2:
			return "es,le,de,re,en,on,nt,er,te,of,th,et,el,an,se,la,ai,ne,ou,qu,me,it,ie,em,ed,ur,is,ec,ue,ti,ra,ns,in,ta".split(',');
		case 3: 
			return "ent,que,les,ede,des,ela,ion,ait,res".split(',');
		case 4:
			return "tion,ment,ique,emen,dela,elle".split(',');
	}
			return "e , e,d ,s ,t ,of,th, d, t,en,l ,de,le,on,nt, s,ai".split(',');   //Bigramme alpha ettendu
	
	
}

function arrayFreqObject(n){
	return [ {y:14.71,lambda:'e'}, {y:7.95,lambda:'s'},{y:7.63,lambda:'a'},{y:7.53,lambda:'i'},{y:7.25,lambda:'t'},{y:7.10,lambda:'n'},{y:6.56,lambda:'r'},{y:5.32,lambda:'u'}];
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
	var matriceAInverser = [];
	var matriceCrypter = [];
	var f = frequence(texte, taille);
	var alphaAscii = (alphabet.length > 50) ? true:false;
	var tailleFr = arrayFreqApparition(taille, alphaAscii).length;
	var s ="";
	for(var z = 0; z < tailleFr;z++){   //bigramme 1
		txttmp[0] = arrayFreqApparition(taille, alphaAscii)[z];
		for(var l = 0; l < tailleFr;l++){ //bigramme 2
			if(l!=z){  
				txttmp[1] = arrayFreqApparition(taille,alphaAscii)[l];
				for(var i =0; i < 6; i ++){    //vecteur 1
					crypt[0] =maxFreqArray(f, i);
					for(var j =0; j<6;j++){	//vecteur 2
						if(j!=i){
							crypt[1] = maxFreqArray(f,j);
							matriceMotLangue = [];
							matriceAInverser = [];
							for(var m = 0; m < taille; m++){
								if(!alphaAscii){
								matriceMotLangue.push(txttmp[0][m].toUpperCase());
								matriceMotLangue.push(txttmp[1][m].toUpperCase());
								}
								else{
									matriceMotLangue.push(txttmp[0][m]);
									matriceMotLangue.push(txttmp[1][m]);
								}
								matriceAInverser.push(crypt[0][m]);
								matriceAInverser.push(crypt[1][m]);
							}
							for(k = 0; k < matriceAInverser.length; k++){
								matriceAInverser[k] = alphabet.indexOf(matriceAInverser[k]);
								matriceMotLangue[k] = alphabet.indexOf(matriceMotLangue[k]);
							}
							matriceCrypter = new Matrice(matriceMotLangue);
							var matriceInverse = new Matrice(matriceAInverser);
							if(matriceInverse.verifMatriceGen(alphabet.length) !==false){  //matrice inversible sinon inutile
								matriceInverse = matriceInverse.inverserMatrice(alphabet.length);
								matrice = matriceCrypter.multiplicationMatrice(matriceInverse);
								s += '<li class="list-group-item">' + crypte_hill(texte, matrice,alphabet.length) + matrice.toString() + '</li>';
							}
						}
					}
				}
			}
		}
	}
	$('#resultat').append(s);
}

function histo(tab){
	if(tab!==null){
		var min = tab.length-15;
		if(tab.length < 15)
			min = 0;
		tab = tab.slice(min, tab.length);
	}
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
				dataPoints: tab
			}   
			]
		});
	chart.render();
}

function histoPourcent(tab){
	tab=calculFrequencePourcentage(tab);
	var min = tab.length-15;
	if(tab.length < 15)
		min = 0;
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
			chain=substring(0,e.dataPoint.x);
			chain+='<span style="color:red">'+texte[e.dataPoint.x]+"</span>";
			chain+=substring(e.dataPoint.x,texte.length);
			$("#editableDiv").html(chain);			
		},
        /*showInLegend: true, 
        legendMarkerColor: "white",
        legendText: " ",*/
        dataPoints: tab.slice(min, tab.length)
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
	return array[array.length - (1 + changeLetter)].label;
}
function maxFreqArray(array, i){
	return array[array.length - (1+i)].label;
}
function decryptCesarAppel(key){
	$('.active .cle').val(key);
	$('#decrypterCesar').click();
}

function key_Cesar(text,alphabet,iteration,changeLetter){

		var array=frequence(text, 1);
		var arrayAppar = arrayFreqApparition(1);
		//console.log(array);
		var caraMaxOcurrence = alphabet.indexOf(maxFreq(text,1,changeLetter));
		if(caraMaxOcurrence==-1)
			caraMaxOcurrence = alphabet.indexOf(maxFreq(text,1,changeLetter+1));
		var letterMostUse = alphabet.indexOf(arrayAppar[iteration].toUpperCase());
		var key =(caraMaxOcurrence-letterMostUse)%alphabet.length;
		console.log(caraMaxOcurrence,letterMostUse,"Key ces :",key);
		if(key<0)
			key+=alphabet.length;
	
		console.log(maxFreq(text,1,changeLetter),arrayAppar[iteration].toUpperCase());
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

	text=text.replace(/\s/gi,'');
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
	if(document.getElementById('keyCryptanalyse').value=='')
	{
	for(var i=0,j=0;j<keyLength;i+=text.length/keyLength,j++)
	{
			key+=vig_row_analyse(row.substring(i,parseInt(i+text.length/keyLength)),alphabet,iteration,changeLetter);
	}
	}
	else
	{
		key=document.getElementById('keyCryptanalyse').value;
		var pos=(keyLength-(iteration-1)%keyLength);
		console.log(pos,key.slice(0,pos-1),key.slice(pos),parseInt((pos-1) * text.length/keyLength),parseInt((pos-1) * text.length/keyLength+text.length/keyLength));
		if(pos-1<0)
			pos=2;
		key=key.slice(0,pos-1) +vig_row_analyse(row.substring( parseInt((pos-1) * text.length/keyLength) ,parseInt((pos-1) * text.length/keyLength+text.length/keyLength)),alphabet,parseInt(iteration/keyLength),changeLetter) + key.slice(pos);
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

function nombrePremierJusqua(n){
	var nbPremier = [1,2,3];
	for(var i = 5; i < n;i+=2){
		if(isPrime(i))
			nbPremier.push(i);
	}
	return nbPremier;
}

$(document).ready(function()
{ 	
	$('#CryptanalyseDiv label input[type=radio]').click(function(e){
	if(e.target.value == 5){
		$('#cryRSA').show();
		$('#chartContainer').hide();
		$('#changeHisto').hide();
		$('#keyCryptanalyse').hide();
	}
	else{
		$('#cryRSA').hide();
		$('#chartContainer').show();
		$('#changeHisto').show();
		$('#keyCryptanalyse').show();
	}
});
	var histoF = false;
	$("#changeHisto").mousedown(function()
	{	var texte=document.getElementById('textecode').value;
		if(histoF){
			histo(frequence(texte,keylength),false);
			$("#changeHisto").val("Afficher en pourcentage");
		}
		else{
			histoPourcent(frequence(texte,keylength));
			$("#changeHisto").val("Afficher en fréquence");
		}
		histoF = !histoF;
	});

	var iteration =0;
	var changeLetter =0;
	$("#cryptanalyseDecrypt").mousedown(function()                //Foutre un reset en cas de changement du bouton radio/texte codé
	{
		var texte=document.getElementById('textecode').value;
		keylength = parseInt(document.getElementById('keySize').value); // personne ne met de var devant je la veut en global
		var alphabet = document.getElementById('alphabet').value;
		var cryptage = recupererRadio2();
		
		if (cryptage ==1)
		{
			keylength = 1;
			if(iteration==0)
				histo(frequence(texte,keylength),false);
			key_Vigenere(alphabet,texte,keylength,iteration%alphabet.length,changeLetter);
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
            var freq=frequence(texte,1);
			if(iteration==0)
                histo(freq,false);
            analyseAffine(texte,freq,iteration);
		}
		else if(cryptage == 5){
			var p = factoriser($('#n_pu').val());
			var q = new bigInt($('#n_pu').val()).divide(p);
			var pAffichage = "<p class='bg-success'>"+p.toString()+"</p>";
			var qAffichage = "<p class='bg-success'>"+q.toString()+"</p>";
			$('#cryRSA').after(pAffichage);
			$('#cryRSA').after(qAffichage);
			retrouverCle(new bigInt($('#e_pu').val()), p, q);
		}
		else{
			$('#CryptanalyseDiv').after('<p>L\'indice de coincidence est : ' +indiceCoincidence(frequence(texte, 1))+ '</p>');
		}
		
		iteration++;
		if(iteration%alphabet.length==0)
				changeLetter++;
	});
	$('#reset').mousedown(function(event) {
		iteration = 0;
		changeLetter = 0;
		histo(null);
	});
});


function factoriser(n){
	n = new bigInt(n);
	var y = new bigInt(2);
	var x = new bigInt(2);
	var d = new bigInt(1);
 
	while (d.equals(1) || d.equals(n)) {
		x = g(x,n);
		y = g(y,n);
		y = g(y,n);
		d = bigInt.gcd(new bigInt(x.minus(y).abs()),n);

	}
	return d;
}


function g(x,n){
	return x.multiply(x).add(1).mod(n);
}


function retrouverCle(e, p, q){
	var ind_euler = (p.minus(1).multiply(q.minus(1)));
	var d = new bigInt(euclideEtenduBI(e,ind_euler)).mod(ind_euler);
	$('#cryRSA').after("<br /><p>La clé privée est : ("+p.multiply(q).toString()+",    "+d.toString()+")</p>");
}

function analyseAffine(texte,freq,iteration)
{
 var A=[1,9,21,15,3,19,7,23,11,5,17,25];
   var tabCoef=[];
   var tabTexte=[];
   var equation={a:4,y:(freq[freq.length-1].label.charCodeAt(0)-97)};
    
    for(var i=2;i<freq.length+1;i++)
    {
        var x=((freq[freq.length-i].label.charCodeAt(0)-97-equation.y)+26)%26;
        var a=(18-equation.a+26)%26;
        var j=0;
        while(j<A.length && (a*A[j]%26)!=x)
        {
            j++;
        }
        if(j!=A.length)
           {
           a=A[j];
           b=equation.y-((a*4)%26);
           tabCoef.push({a:a,b:b});
           }
        j=0;
    }
        if(iteration<tabCoef.length)
            tabTexte.push(decryptAffine(tabCoef[iteration].a,tabCoef[iteration].b));

}