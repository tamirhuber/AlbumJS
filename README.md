# AlbumJS
AlbumJS is a free Javascript plugin created to create and organize the images on a webpage. The plugin allows the user to merge all the album images into a styled custom able preview setup, select preview method and auto creating a popup gallery.

The plugin requires jQuery.

The plugin is working with Bootstrap and other popular frameworks.

Mobile compatible and friendly.

# Setup:
Set up plugin files - 
```
<!-- JQuery 1.11 or higher -->
<script src="jquery-1.11.3.min.js"></script>

<!-- Albumjs CSS file -->
<link rel="stylesheet" href="albumjs.css">
<!-- Albumjs Javascript file -->
<script src="albumjs.js"></script>
<!-- Recommended - Bootstrap -->
<link rel="stylesheet" href="bootstrap.css">
<!-- Recommended - Bootstrap Javascript -->
<script src="bootstrap.min.js"></script>
```

Prepare the HTML-
```
<!-- Wrap the album images with a DIV-->
<div id="album">
<image src="images/image1.jpg">
<image src="images/image2.jpg">
<image src="images/image3.jpg">
<image src="images/image4.jpg">
</div>
```

Fire it up - 
```
<!-- Call the plugin via script -->
<script>
$(document).ready(function() {
$('#album').albumjs({ preview: "shutter"});
});
</script>
```

# Customization
| Variable | Defualt | Options | Description |
| -------- | ------- | ------- | ----------- |
| preview | stack | 	stack, collage, shutter, fade | Allow the user to set the preview presntaion of the specific album. Currently there are four differnt preview styles, and a custom option for creative users. |
| viewnum | 3 | int (Max. 5) | Sets how many images will appear in the preview. |
| theme | dark | dark, bright | Sets the theme of the pop up gallery. There is also a custom option for the user to create his/her own theme. Note: diffrent themes may be applied to diffrent albums. |
| albumwidth | auto | CSS width property. | Sets the preview width (total width, not single image). For most cases best use is auto and mix it up with Bootstrap. |
| grayscale | true | true / false |	Adds a low saturation effect to the preview presentation. While hovering image the effect is fading. |
| customize | false | true / false | Enable custom options, such as preview and theme made by the user. |
| general | false | true / false | 	For preview that has the same styles no matter viewnum, such as "fader". Adds the same class style to the album regardless to the viewnum option. |
| duration | 3000 | int (milisec) | Sets the duration time for album animations in mili seconds. |
| transition | 800 | int (milisec) | Sets the duration time for album transitions and effects in mili seconds. |
