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
	
	$('#texteclair').keyup(function() //Changer Keyup
	{
		console.log(document.getElementById('texteclair').value);
		disableBouton()
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
			};
		}
	});
});