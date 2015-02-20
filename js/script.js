$(document).ready(function()
{
	$('#menu li').mousedown(function()
		{
			$('.active').removeClass('active');
			$(this).addClass('active');
			var i = $("#menu>li").index($(this));
			$("#contenu>div").eq(i).addClass('active');
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