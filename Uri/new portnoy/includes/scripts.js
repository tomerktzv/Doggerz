
$(document).ready(function(){
    function resize()
    {

        $(".box").each(function(){
            var $parent = $(this).parent();
            var $image = $parent.find("img");
            $(this).css("min-height",$image.height() * 0.8);
            $(this).css("top",($image.height() - $(this).height()) / 2);
            var $header = $parent.find("h1");
            $header.css("font-size",$image.height() * 0.2);
            $header.css("margin-left",$parent.height()/3);
            $header.css("margin-top",$parent.height()/4);

            var $mainHeader = $parent.find("h3.boxKM");
            $mainHeader.css("font-size",$parent.width()/25);
        });
        $(".container").each(function(){
            var $parent = $(this).parent();
            var $mainHeader = $parent.find("#howmany");
            $mainHeader.css("font-size",$parent.width()/20);
        });
//
    }
    resize();       // for the first time loading without window resize
    $(window).resize(resize);
});

$(document).ready(function(){
    $(".row").click(function(){

        // var currentIMG = '#11';
        // $( "img" ).not( currentIMG ).hide();
        // $( ".box" ).hide();
        // $( ".Mheader" ).hide();
        // $('img').css('border-radius', '40px');
        // $('img').css('margin-top', '15%');
        //
        // $(".doggerDetails").show();
        // $('.dogPIC').show();
        // $('.dogPIC').css('margin-top', '5%');
        // $('.dogPIC').css('margin-left', '35%');
        //
        // $('#dog').css('margin-top','1%');
        // $('#dog').css('margin-left','10px');
        //
        // $(".doggerDetails").css('margin-top', '-48%');
        // //$(".doggerDetails").css('text-align', 'center');
        // $(".doggerDetails").css('font-size', $parent.width()/22);
        //
        //
        //
        // $(currentIMG).animate({
        //     left: '15%',
        //     top: '-60px',
        //     height: '+=100px',
        //     width: '+=100px'});
    });
});
