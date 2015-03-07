library affine;
import 'dart:html';
import 'dart:math';
import 'fonction.dart';

void cryptageAffine(Event e){
 TextAreaElement cc=querySelector('#texteclair');
 InputElement cAElement=querySelector('#CA');
 InputElement cBElement=querySelector('#CB');
 int cA=int.parse(cAElement.value)%26;
 int cB=int.parse(cBElement.value)%26;
 String texteACrypter=cc.value;
 String texteCrypter="";
 var list=texteACrypter.runes.toList();
 for(int i=0;i<list.length;i++){
   list[i]=caractereSpeciaux(list[i]);
   if(list[i]>64 && list[i]<91)
   {
     list[i]=(cA*(list[i]%65)+cB)%26;
     list[i]=list[i]+65;
   }
   else if(list[i]>96 && list[i]<123)
   {
     list[i]=(cA*(list[i]%97)+cB)%26;
     list[i]=list[i]+97;
   }
   texteCrypter=texteCrypter+new String.fromCharCode(list[i]);
 }
 querySelector('#textecode').text=texteCrypter;
}
void decryptageAffine(Event e){
 TextAreaElement cc=querySelector('#textecode');
 InputElement cAElement=querySelector('#CA');
 InputElement cBElement=querySelector('#CB');
 int cA=int.parse(cAElement.value)%26;
 int cB=int.parse(cBElement.value)%26;
 var A={'1':1,'3':9,'5':21,'7':15,'9':3,'11':19,'15':7,'17':23,'19':11,'21':5,'23':17,'25':25};
 String texteADeCrypter=cc.value;
 String texteClaire="";
 var list=texteADeCrypter.runes.toList();
 for(int i=0;i<list.length;i++){
   if(list[i]>64 && list[i]<91)
   {
     list[i]=(A['$cA']*(list[i]%65-cB))%26;
     list[i]=list[i]+65;
   }
   else if(list[i]>96 && list[i]<123)
   {
     list[i]=(A['$cA']*(list[i]%97-cB))%26;
     list[i]=list[i]+97;
   }
   texteClaire=texteClaire+new String.fromCharCode(list[i]);
 }
 querySelector('#texteclair').text=texteClaire;
}