$(document).ready(function()
{
	document.getElementById("crypter-button").disabled = true;
	document.getElementById("decrypter-button").disabled = true;

	$('#menu li').mousedown(function()
		{
			$('.active').removeClass('active');
			$(this).addClass('active');
			var i = $("#menu>li").index($(this));
			$("#contenu>div").eq(i).addClass('active');
			document.title=($("#menu>li").eq(i).text());
		});
	
	$('#texteclair').keyup(function() //Changer Keyup
	{
		console.log(document.getElementById('texteclair').value);
		if(document.getElementById('texteclair').value!='')
			document.getElementById("crypter-button").disabled = false;
		else
			document.getElementById("crypter-button").disabled = true;
	});
	
	$('#textecode').keyup(function() //Changer Keyup 
	{
		console.log(document.getElementById('textecode').value);
		if(document.getElementById('textecode').value!='')
			document.getElementById("decrypter-button").disabled = false;
		else
			document.getElementById("decrypter-button").disabled = true;
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
				$(txt).text("");
				$(txt).append(e.target.result);
			};
		}
	});
});