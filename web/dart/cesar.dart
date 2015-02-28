import 'dart:html';
import 'dart:math';

void main(){
  querySelector('#crypterCesar').onClick.listen(cryptageCesar);
  querySelector('#decrypterCesar').onClick.listen(decryptageCesar);
}

void cryptageCesar(Event e){
 TextAreaElement cc=querySelector('#texteclair');
 InputElement cleElement=querySelector('.active .cle');
 int cle=int.parse(cleElement.value);
 String texteACrypter=cc.value;
 String texteCrypter="";
 var list=texteACrypter.runes.toList();
 for(int i=0;i<list.length;i++){
   if(list[i]>64 && list[i]<91)
   {
     list[i]=(list[i]+cle)%91;
     if(list[i]<65)
     {
       list[i]=list[i]%26+65;
     }
   }
   else if(list[i]>96 && list[i]<123)
   {
     list[i]=(list[i]+cle)%123;
     if(list[i]<97)
     {
       list[i]=list[i]%26+97;
     }
   }
   texteCrypter=texteCrypter+new String.fromCharCode(list[i]);
 }
 querySelector('#resultCryptage').text=texteCrypter;
}
void decryptageCesar(Event e){
 TextAreaElement cc=querySelector('#textecode');
 InputElement cleElement=querySelector('.active .cle');
 int cle=int.parse(cleElement.value);
 String texteADeCrypter=cc.value;
 String texteClaire="";
 var list=texteADeCrypter.runes.toList();
 for(int i=0;i<list.length;i++){
   if(list[i]>64 && list[i]<91)
   {
     list[i]=list[i]-cle;
     if(list[i]<65)
     {
       list[i]=list[i]-65+91;
       
     }
   }
   else if(list[i]>96 && list[i]<123)
   {
     list[i]=list[i]-cle;
     if(list[i]<97)
     {
       list[i]=list[i]-97+123;
     }
   }
   texteClaire=texteClaire+new String.fromCharCode(list[i]);
 }
 querySelector('#resultDeCryptage').text=texteClaire;
}