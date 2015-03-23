$(document).ready(function()
{
   function caractereSpeciaux(ce)
    {
  if(ce==232 || ce==233 || ce==234 ||ce==255)
    ce=101;
  else if(ce==200|| ce==201 || ce==202 ||ce==203)
    ce=69;
  else if(ce==231)
    ce=99;
  else if(ce==199)
    ce=67;
  else if(ce==224 ||ce==225 ||ce==226|| ce==227 || ce==228 ||ce==229)
    ce=97;
  else if(ce==192 || ce==193 ||ce==194 ||ce==195 ||ce==196 ||ce==197)
    ce=65;
  else if(ce==249 || ce==250 || ce==251 || ce==252)
    ce=117;
  else if(ce==217 ||ce==218 ||ce==219 ||ce==220)
    ce=85;
  else if(ce==242 || ce==243 || ce==244 ||ce==255 ||ce==246)
    ce=111;
  else if(ce==210 || ce==211||ce==212||ce==213 ||ce==214)
    ce=79;
  else if(ce==236|| ce==237 || ce==238||ce==239)
    ce=105;
  else if(ce==241)
    ce=110;
  else if(ce==209)
    ce=78;
  else if(ce==253)
    ce=121;
  else if(ce==221)
    ce=89;
 
  return ce;
    }
    
    
  $('#crypterCesar').click(function()
  {
      var texteACrypter=document.getElementById('texteclair').value;
      var tab=[];
      var texteCrypter="";
      var check=$('input[type=radio][name=optradio]:checked').attr('value');
      if(check==0)
        {
         var cle=parseInt($('.active .cle').val())%26;
         for(var i=0;i<texteACrypter.length;i++){
          tab.push(texteACrypter.charCodeAt(i));
          tab[i]=caractereSpeciaux(tab[i]);
           if(tab[i]>64 && tab[i]<91)
           {
             tab[i]=(tab[i]+cle)%91;
             if(tab[i]<65)
             {
               tab[i]=tab[i]+65;
             }
           }
           else if(tab[i]>96 && tab[i]<123)
           {
             tab[i]=(tab[i]+cle)%123;
             if(tab[i]<97)
             {
               tab[i]=tab[i]+97;
             }
           }
           texteCrypter=texteCrypter+String.fromCharCode(tab[i]);
         }
    
        }
      else if(check==1)
      {
          var cle=parseInt($('.active .cle').val())%256; 
           for(var i=0;i<texteACrypter.length;i++){
          tab.push(texteACrypter.charCodeAt(i));
                tab[i]=tab[i]+cle;
                tab[i]=tab[i]%256;
           texteCrypter=texteCrypter+String.fromCharCode(tab[i]);
         }
      }
      $('#textecode').val(texteCrypter);
  });
  
  $('#decrypterCesar').click(function()
    {
        var texteADeCrypter=document.getElementById('textecode').value;
        var texteClaire="";
        var tab=[];
        var check=$('input[type=radio][name=optradio]:checked').attr('value');
      if(check==0)
      {
             var cle=parseInt($('.active .cle').val())%26;
             for(var i=0;i<texteADeCrypter.length;i++){
               tab.push(texteADeCrypter.charCodeAt(i));
               if(tab[i]>64 && tab[i]<91)
               {
                 tab[i]=tab[i]-cle;
                 if(tab[i]<65)
                 {
                   tab[i]=tab[i]-65+91;

                 }
               }
               else if(tab[i]>96 && tab[i]<123)
               {
                 tab[i]=tab[i]-cle;
                 if(tab[i]<97)
                 {
                   tab[i]=tab[i]-97+123;
                 }
               }
               texteClaire=texteClaire+String.fromCharCode(tab[i]);
             }
      }
      else if(check==1)
      {
          var cle=parseInt($('.active .cle').val())%256;
          for(var i=0;i<texteADeCrypter.length;i++){
               tab.push(texteADeCrypter.charCodeAt(i));
               tab[i]=tab[i]+256;
               tab[i]=tab[i]-cle;
               tab[i]=tab[i]%256;
               texteClaire=texteClaire+String.fromCharCode(tab[i]);
               }
        }
	console.log(cle,texteADeCrypter);
      $('#texteclair').val(texteClaire);
          
  });   
    


});

function genereKeyCesar(){
  $('#cesarKey').val(Math.floor(Math.random() * 26));
  disable();
}