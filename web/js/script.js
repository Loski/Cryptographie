

function disableBouton(){
  if($('.active#affine').length)
      {
        if(document.getElementById('texteclair').value!=='' && $('#CA').val()!=='' && $('#CB').val()!=='')
          $('.crypter-button').attr("disabled", false);
        else
          $('.crypter-button').attr("disabled", true);
    
        if(document.getElementById('textecode').value!=='' && $('#CA').val()!=='' && $('#CB').val()!=='')
          $(".decrypter-button").attr("disabled", false);
        else
          $(".decrypter-button").attr("disabled", true);
       console.log("OK BUTTON DISA");
      }
  else
      {
        if(document.getElementById('texteclair').value!=='' && $('.active .cle').val()!=='')
		      $('.crypter-button').attr("disabled", false);
	      else
		      $('.crypter-button').attr("disabled", true);
		
	      if(document.getElementById('textecode').value!=='' && $('.active .cle').val()!=='')
		      $(".decrypter-button").attr("disabled", false);
	      else
		      $(".decrypter-button").attr("disabled", true);
	     console.log("OK BUTTON DISA");
	    }
	
}

function traitementTxt(str){
	str = str.trim();
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }
     
    return str;
}
function saveTextAsFile(id)
{
	var textToWrite;
	if(id===0)
		 textToWrite = document.getElementById("texteclair").value;
	else
		 textToWrite = document.getElementById("textecode").value;
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = "FILE";

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

$(document).ready(function()
{ 

	disableBouton();
	//A Virer Plus tard
	$("#LOL").mousedown(function()
	{
		$(this).replaceWith('<img src="http://www.asiteforthat.com/posts/nyan%20nyan%20Seo%20You%20Jin2.jpg" />');
		alert("Miaou");
	});
	////////
	
	
	$('#menu li').mousedown(function()
		{
			$('.active').removeClass('active');
			$(this).addClass('active');
			var i = $("#menu>li").index($(this));
			$("#contenu>div").eq(i).addClass('active');
			document.title=($("#menu>li").eq(i).text());
			disableBouton();
			$('#error').hide();

		});
	
	$('#textecode').change(function() //Changer Keyup 
	{
		console.log(document.getElementById('textecode').value);
		disableBouton();

	});
	 $('#texteclair').change(function() //Changer Keyup 
  {
    console.log(document.getElementById('textecode').value);
    disableBouton();

  });
     $('.active .cle').keyup(function() //Changer Keyup 
  {
    console.log(document.getElementById('textecode').value);
    disableBouton();

  });
      $('.cleAffine').keyup(function() //Changer Keyup 
  {
    console.log(document.getElementById('textecode').value);
    disableBouton();

  });
	
	$("#keyVig").keyup(function() //Permet de mettre la clé en MAJ
	{
		this.value=this.value.toUpperCase();
		disableBouton();
	});
	
	$("input[type=file]").change(function(event)
	{
		var file = this.files[0];
		if (file) 
		{
			var reader = new FileReader();
			reader.readAsText(file);
			var txt = $(this).parent().children('textarea').eq(0);
			reader.onload = function(e) 
			{
				$(txt).text(e.target.result);
				disableBouton();
			};
		}
	});
});