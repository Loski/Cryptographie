import 'dart:html';
import 'dart:math';

void main(){
  querySelector('#crypterCesar').onClick.listen(cesar);
}

void cesar(Event e){
 var cc=querySelector('#texteclair').text;
 querySelector('#resultCryptage').text=cc;
}