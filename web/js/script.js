function disableBouton(){
	if(document.getElementById('texteclair').value!='')
		$('.crypter-button').attr("disabled", false);
	else
		$('.crypter-button').attr("disabled", true);
		
	if(document.getElementById('textecode').value!='')
		$(".decrypter-button").attr("disabled", false);
	else
		$(".decrypter-button").attr("disabled", true);
	console.log("OK BUTTON DISA");
}

function saveTextAsFile(id)
{
	if(id==0)
		var textToWrite = document.getElementById("texteclair").value;
	else
		var textToWrite = document.getElementById("textecode").value;
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
		});
	
	$('#textecode').keyup(function() //Changer Keyup 
	{
		console.log(document.getElementById('textecode').value);
		disableBouton()

	});
	
	$("#keyVig").keyup(function() //Permet de mettre la clé en MAJ
	{
		this.value=this.value.toUpperCase();
	});
	
	$("input[type=file]").change(function(event)
	{
		var file = this.files[0];
		if (file) 
		{
			var reader = new FileReader();
			reader.readAsText(file);
			var txt = $(this).siblings('textarea');
			reader.onload = function(e) 
			{
				$(txt).text(e.target.result);
				disableBouton();
			};
		}
	});
});