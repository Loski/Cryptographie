
$(document).ready(function(){


    // The link with ID "copy-description" will copy
    // the text of the paragraph with ID "description"


    $('#copy-dynamic').zclip({
        path:'js/ZeroClipboard.swf',
        copy:function(){return $('#texteclair').val();}
    });

    // The link with ID "copy-dynamic" will copy the current value
    // of a dynamically changing input with the ID "dynamic"
   /* $("a#copy-callbacks").zclip({
        path:'js/ZeroClipboard.swf',
        copy:$('#callback-paragraph').text(),
        beforeCopy:function(){
            $('#callback-paragraph').css('background','yellow');
            $(this).css('color','orange');
        },
        afterCopy:function(){
            $('#callback-paragraph').css('background','green');
            $(this).css('color','purple');
            $(this).next('.check').show();
        }
    });
    */
});