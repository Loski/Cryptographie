﻿$(document).ready(function()
{
	$('#menu li').mousedown(function()
		{
			$('.actif').removeClass('actif');
			$(this).addClass('actif');
			var i = $("#menu>li").index($(this));
			console.log(this);
			console.log(i);
			$("#contenu>div").eq(i).addClass('actif');
		});	
	
	$("#fichier").change(function()
	{
		var file = document.getElementById('fichier').files[0];
		if (file) 
		{
			var reader = new FileReader();
			reader.readAsText(file);
			reader.onload = function(e) 
			{
				$("#texte").text("");
				$("#texte").append(e.target.result);
			}
		}
	});
});