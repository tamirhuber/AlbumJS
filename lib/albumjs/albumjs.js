(function ($) {
  $.fn.albumjs = function(options){
      var defualts = {
          //Defualts
          preview: "stack",
          viewnum: 3,
          theme: "dark",
          complete: null,
          albumwidth: "auto",
          grayscale: true,
          customize: false,
          general: false,
          duration: 3000,
          transition: 800
      };
      $("body").addClass("preload");
      var opts = $.extend({} , defualts, options);
      $(window).load(function() {
        $("body").removeClass("preload");
      });
      
      if(!errorCheck(opts))
      {
          console.error("Error in AlbumJS options");
          return null;
      }
      
      if( $("#albumjs-gallery").length ==0) //make sure not double execute
      {
          gallery = "<div id='albumjs-gallery' class='albumjs-gallery'></div>";
          close_button = "<button id='albumjs-gallery-close'> X </button>";
          main_pic = "<img id='albumjs-main-pic' class='albumjs-gallery-img'>";
          overlay = "<div id='albumjs-overlay' aria-hidden='true'> </div>";
          main_pic_cont = "<div id='albumjs-main-pic-cont'></div>";
          prev = "<span id='albumjs-main-pic-prev'><</span>";
          next = "<span id='albumjs-main-pic-next'>></span>";

          album_title = "<h1 id='albumjs-album-title'> </h1>"
          $("body").append(overlay);
          $("#albumjs-overlay").append(gallery);
          $("#albumjs-overlay").append(close_button);
          $("#albumjs-gallery-close").bind("click", function(){
              $('body').css("overflow", "auto");
              $("#albumjs-overlay").fadeOut();
          });
          $("#albumjs-gallery").append(album_title);
          $("#albumjs-gallery").append(main_pic_cont);
          $("#albumjs-main-pic-cont").append(prev);
          $("#albumjs-main-pic-cont").append(next);
          $("#albumjs-main-pic-cont").append(main_pic);
          thumbnail = "<div id='albumjs-gallery-thumbnail'> </div>";
          pic = "<img class='albumjs-thumbnail-pic' ";
          $("#albumjs-gallery").append(thumbnail);
      }
      
     
     return this.each( function(){
         album = $(this);
         pics_in_album = $(album).children().length;
        if(opts.viewnum>5) //make sure the max view num is 5!
            opts.viewnum=5;
        if(opts.viewnum>pics_in_album) //make sure the viewnum value is not greater than actual pics
            opts.viewnum = pics_in_album;
         $(this).children("img").bind("click", function(){             
             popUpGallery( $(this), opts.theme, $(this).attr("src"), $(this).index() + 1);
         });
         for(i=1; i<=opts.viewnum; i++) //sets preview pics
         {
             $(this).children("img:nth-child(" + i + ")").attr("title",     getPicName($(this).children("img:nth-child(" + i + ")").prop("src"))); //set title
            $(this).children("img:nth-child(" + i + ")").addClass("album-view");
            $(this).children("img:nth-child(" + i + ")").css("transition", opts.transition + "ms");
         }
         if(opts.albumwidth!="auto") //sets the width of the preview pics container
             $(this).css("width" , opts.albumwidth);
         if(opts.viewnum>1) // sets the preview by style and amount
             if(opts.general == true)
                 $(this).addClass( opts.preview );
            else
                $(this).addClass( opts.preview + "-"+opts.viewnum);
         else
            $(this).addClass("single-view"); 
         if(opts.grayscale) // sets the grayscale option
             $(this).children().addClass("preview-grayscale");
         if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
             ismobile =true;
             var f_child = $(album).children("img:nth-child(1)");
             var l_child = $(album).children("img:nth-child("+opts.viewnum+")");
             var child_height =( $(f_child).height() + $(l_child).height() ) /2;
             var f_offset = $(f_child).offset().top;
             var l_offset = $(l_child).offset().top;
             var offset = f_offset - l_offset;
             /*
             alert(f_offset);
             alert(l_offset);
             alert(child_height)
             */
             $(album).css("height", (child_height+offset+5) + "px");
}
         
    if(opts.preview="fader") // preview with jQuery
      {
          albumjsFader(null, $("." + opts.preview).children().first(), opts.viewnum, opts.duration, opts.transition); 
      }
    
         
      }); 

  };
    
    
    
}(jQuery));

function errorCheck(obj)
{

    if(!obj.customize)
    {
    preview = "stack.single.collage.fader.shutter";
        if(preview.indexOf(obj.preview)==-1)
        {
            console.error("Preview option is not suitable");
            return false;
        }
    }
    
    return true;
}

function getPicName(src)
{
    while(src.indexOf("/")!=-1)
    {
        src = src.slice(src.indexOf("/") + 1, src.length);
    }
    src = src.slice(0 , src.lastIndexOf("."));
    return src;
}
var albumjs_sources = [];
var albumjs_current_index;
var ismobile = false;

function popUpGallery(obj, theme, main_src, index)
{
    $('body').css("overflow", "hidden");
    album = $(obj).parent();
    $(".albumjs-thumbnail-selected").removeClass("albumjs-thumbnail-selected");
    $("#albumjs-gallery-thumbnail").empty();
    albumjs_current_index = index;
    $("#albumjs-overlay").prop("class", "");
    $("#albumjs-overlay").addClass('albumjs-' + theme);
    $("#albumjs-overlay").fadeIn();

    $("#albumjs-main-pic").attr("src", main_src);
    
    //$("#albumjs-album-title").text("");
    $("#albumjs-album-title").text($(album).attr("albumname"));
    
    len = $(album).children().length;
    loop= len+1;
    var i = 1;
    if(index-3>0)
        i = index-3;
    for(i; i<=loop; i++)
    {
        if((i-1)%5==0)
        {
            $("#albumjs-gallery-thumbnail").append("</br>");
            loop++;
        }
        if(i<len+1)
        {
        src = $(album).children("img:nth-child(" + i + ")").prop("src");
        current_pic = pic;
        current_pic += " src='"+ src +"'>"
        $("#albumjs-gallery-thumbnail").append(current_pic);
        }
        $("#albumjs-gallery-thumbnail").children("img:nth-child(" + i + ")").bind("click", function(){
            
            if(! $(this).hasClass("albumjs-thumbnail-selected") )
            {
                $("#albumjs-overlay").animate({ scrollTop: 0 }, "slow");
                margin_move = 0;
                if(  $(this).index() >= 3)
                    margin_move ="-" + (($(this).index()-2) * 20).toString() + "%";
                if(  $(this).index() > len-3)
                    margin_move ="-" + ((len-5) * 20).toString() + "%";
                if(  $(this).index() < 3)
                    margin_move ="0%";

                $("#albumjs-main-pic").prop("src" , $(this).prop("src"));
                $("#albumjs-gallery-thumbnail").children("img:nth-child(1)").animate({marginLeft: margin_move}, 300, "linear");
                if(!ismobile)
                {
                    $(".albumjs-thumbnail-selected").animate(
                    {width: "13%"}, 300, "linear" , function(){});
                    $(this).animate(
                    {width: "14%"}, 300, "linear", function(){
                        $(".albumjs-thumbnail-selected").removeClass("albumjs-thumbnail-selected");
                        $(this).addClass("albumjs-thumbnail-selected");
                    });
                }
                else
                {
                    $(".albumjs-thumbnail-selected").animate(
                    {width: "17%"}, 300, "linear" , function(){});
                    $(this).animate(
                    {width: "18%"}, 300, "linear", function(){
                        $(".albumjs-thumbnail-selected").removeClass("albumjs-thumbnail-selected");
                    $(this).addClass("albumjs-thumbnail-selected");
                    });                
                }
            }
        });
            if(i==index)
            {
                $("#albumjs-gallery-thumbnail").children("img:nth-child(" + (i+1) + ")")
                .addClass("albumjs-thumbnail-selected");
            }
        albumjs_sources[i-1] = src;        
    }
    $("#albumjs-main-pic-prev").bind("click", function(){
        prevPic();
    });
    $("#albumjs-main-pic-next").bind("click", function(){
        nextPic();
    });
    
}

function thumbnail(obj)
{
    if(! $(obj).hasClass("albumjs-thumbnail-selected") )
            {
                margin_move = 0;
                if(  $(obj).index() >= 3)
                    margin_move ="-" + (($(obj).index()-2) * 20).toString() + "%";
                if(  $(obj).index() > len-3)
                    margin_move ="-" + ((len-5) * 20).toString() + "%";
                if(  $(obj).index() < 3)
                    margin_move ="0%";

                $("#albumjs-main-pic").prop("src" , $(obj).prop("src"));
                $("#albumjs-gallery-thumbnail").children("img:nth-child(1)").animate({marginLeft: margin_move}, 300, "linear");
                $(".albumjs-thumbnail-selected").animate(
                {width: "13%"}, 300, "linear" , function(){
                    //$(".albumjs-thumbnail-selected").removeClass("albumjs-thumbnail-selected");
                });
                $(obj).animate(
                {width: "14%"}, 300, "linear", function(){
                    $(".albumjs-thumbnail-selected").removeClass("albumjs-thumbnail-selected");
                    $(obj).addClass("albumjs-thumbnail-selected");
                });
                
                
                
            }
    
}

function prevPic()
{
current_img_index = $(".albumjs-thumbnail-selected").index();
        if(current_img_index>0)
            $("#albumjs-gallery-thumbnail").children("img:nth-child(" + current_img_index + ")").click();
}
function nextPic()
{
    current_img_index = $(".albumjs-thumbnail-selected").index();
        if(current_img_index<albumjs_sources.length)
            $("#albumjs-gallery-thumbnail").children("img:nth-child(" + (current_img_index +2) + ")").click();
}
 $(document).keyup(function(e) {
     
     if (e.keyCode == 27) { 
         e.preventDefault();
         e.stopImmediatePropagation();
         $("#albumjs-overlay").fadeOut();
    }
     if (e.keyCode == 37) { 
         e.preventDefault();
         e.stopImmediatePropagation();
         prevPic();
    }
     if (e.keyCode == 39) { 
         e.preventDefault();
         e.stopImmediatePropagation();
         nextPic();
    }
    if (e.keyCode == 65) { 
         vbvb.pause();
    }
     if (e.keyCode == 83) { 
         vbvb.resume();
    }
});

// Previews ///
function albumjsFader(from, to, amount, dur, tran) {
    
    
    
    function next() {
        var nextTo;
        if ( (to.index() +1 == amount)) {
            nextTo = to.closest(".fader").children("img").first();
        } else {
            nextTo = to.next();
        }
        
        to.fadeIn(tran, function () {
            to.addClass("fader-front");
            albumjs_timer = setTimeout(function () {
                albumjsFader(to, nextTo, amount, dur, tran);
            }, dur);
        }); 
    }
    if (from) {
        next();
        from.fadeOut(tran, function(){
            from.removeClass("fader-front");
        });
    } else {
        next();
    }
}


