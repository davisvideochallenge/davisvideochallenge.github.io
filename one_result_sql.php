<!doctype html>
<html lang="en">
<head>
    <!-- Global definitions -->
    <script src="json_data/global.js" type="text/javascript"></script>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400,300' rel='stylesheet' type='text/css'> -->
    <link href='https://fonts.googleapis.com/css?family=Raleway:100,300' rel='stylesheet' type='text/css'>
    <meta name="description" content="DAVIS, Densely Annotated VIdeo Segmentation">

    <title>DAVIS: Densely Annotated VIdeo Segmentation</title>
    <link rel="stylesheet" href="https://yui-s.yahooapis.com/pure/0.6.0/pure-min.css">
    <!--[if lte IE 8]>
        <link rel="stylesheet" href="css/layouts/side-menu-old-ie.css">
    <![endif]-->
    <!--[if gt IE 8]><!-->
        <link rel="stylesheet" href="css/layouts/side-menu.css">
    <!--<![endif]-->
    
    <!--Includes-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>


  <style type="text/css">

      .boxTitle {
        font-family: 'Raleway', sans-serif;
        font-size: 90%;
        margin-top: 2px;
        margin-bottom: 15px;
      }
    </style>
</head>


<body>
<div id="layout">
    <!-- Menu toggle -->
    <a href="#menu" id="menuLink" class="menu-link">
        <span></span>
    </a>

   <div id="menu">
        <div class="pure-menu">

            <ul class="pure-menu-list">
                <li><a href="index.html" class="pure-menu-link">Home</a></li>
                <li><a href="soa_compare.php" class="pure-menu-link">Benchmark SoA</a></li>
                <li><a class="pure-menu-link pure-menu-selected">Explore SoA</a></li>
                <li><a href="code.html" class="pure-menu-link">Downloads</a></li>
            </ul>
        </div>
    </div>

    <div id="main">
        <div class="header">
            <h1>Explore the State of the Art</h1>
            <h2>Browse all partitions from the studied techniques</h2>
        </div>

        <div class="pure-g">
            <div class="pure-u-1-1" style="font-family: 'Raleway', sans-serif; margin-top: 30px;">
              <center style="font-size: 120%;margin-bottom: 10px;">Sequence: <span id="seq_name"></span>.</center>
              <center style="margin-bottom: 20px;">Move to <a onclick="decrease()">previous</a> or <a onclick="increase()">next</a> frame (you can also use left and right arrows). <a href="browse.php">Back to sequence index</a>.</center>
            </div>
        </div>
        <div class="pure-g">
              <div class="pure-u-1-6">
              </div>
              <div class="pure-u-1-3">
                  <div style="padding:5px;text-align:center;">
                  <img id="im_container" style="width: 100%; outline: 2px solid black; outline-offset: -1px;"/>
                  <div class="boxTitle">Frame: <span id="im_text"></span></div>
                  </div>
              </div>
              <div class="pure-u-1-3" style="position: relative;">
                  <div style="padding:5px;text-align:center;">
                  <img id="im_gt" style="width: 100%;"/>
                  <canvas id="canv_gt" style="position: absolute; left: 5px; top: 5px; outline: 2px solid black; outline-offset: -1px;"></canvas>
                  <div class="boxTitle">Ground Truth</div>
                  </div>
              </div>
              <div class="pure-u-1-6">
              </div>
        </div>

        <div style="margin: auto;max-width: 1200px;">
             <div style="font-family: 'Raleway', sans-serif;margin-left:15px;margin-right:10px;">
             <div style="text-align: center;margin-top:20px;">
             <center style="font-size: 120%;margin-bottom:10px;">Segmentations obtained by state-of-the-art techniques</center>
             <center>Semi-supervised techniques are depicted in <span style="color:red">red</span>, unsupervised in <span style="color:green;">green</span>, and preprocessing methods in <span style="color:blue;">blue</span>.</center>
             </div>  
             </div> 
        </div> 
        <div id="res_container" class="pure-g" style="margin-bottom: 40px;margin-top: 10px;">
        
        </div>

        <div style="margin: auto;max-width: 1200px;">
             <div style="font-family: 'Raleway', sans-serif;margin-left:15px;margin-right:10px;margin-bottom:70px;">

                <h3 style="margin-top:30px;margin-bottom:1px;">Legend</h3>
                <ul id="legend_text">
                </ul>

                <i>Is your technique missing although it's published and the code is public? <a href='mailto:perazzif@inf.ethz.ch,jponttuset@vision.ee.ethz.ch'>Let us know</a>  and we'll add it.</i>                
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">

    // Global image
    var g_im = undefined;

    // Frame number
    var frame_num = 1;

    // Get a sequence id from the PHP url if set
    var seq_id = '<?php 
      if (isset($_GET['seq_id']))
      {
        $seq_id=$_GET['seq_id'];
        echo $seq_id;
      }
      else
      {
        echo "bear";
      }
      ?>';

    // Load images
    add_first_time();


    // Create the text of the legend
    var leg_text = "";
    for(var i = 0; i < techniques.length; i++)
    {
        tc = tech_props[techniques[i]].display_name.toLowerCase();
        leg_text = leg_text + "<li><b>" + tech_props[techniques[i]].display_name + "</b>: " + techn_papers[tc].title
        leg_text = leg_text + ". " + "<i>" + techn_papers[tc].authors[0] + "</i>"
        for(var j = 1; j < techn_papers[tc].authors.length; j++)
            leg_text = leg_text + ", <i>" + techn_papers[tc].authors[j] + "</i>"
        if ('conference' in techn_papers[tc])
            leg_text = leg_text + ", " + techn_papers[tc].conference + " " + techn_papers[tc].year.toString()
        leg_text = leg_text + ".</li>"

    }
    
    // Fill legend
    document.getElementById("legend_text").innerHTML = leg_text;

    // Set keydown functions
    $(document).keydown(function(e){
        if (e.which==37)
            decrease();
        else if (e.which==39)
            increase();
    });


    // Set responsive function
    $(window).resize(respond_canvas);

    //  Make sure canvas is responsive also when the menu animates
    $("#menu").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ 
        respond_canvas();
    });




    // ###########################################################################################
    //  Function implementations
    // ###########################################################################################
    function decrease() {
        if(frame_num>1)
            frame_num--;
        else
            frame_num=seq_nframes[seq_id.replace("-", "")]-2;  

        // Change main image, which fires changing the rest
        g_im.src = 'images/db/'+ seq_id +'/'+pad(frame_num)+'.jpg';
    }

    function increase() {
        if(frame_num<seq_nframes[seq_id.replace("-", "")]-2)
            frame_num++;
        else
            frame_num=1;

        // Change main image, which fires changing the rest
        g_im.src = 'images/db/'+ seq_id +'/'+pad(frame_num)+'.jpg';
    }

    function pad(num)
    {
        var s = "00000" + num;
        return s.substr(s.length-5);
    }

    function resize_canvas(canv_id, w, h)
    {
        // Retrieve canvas
        var cv   = document.getElementById(canv_id);

        // Canvas to the same size of the image
        cv.setAttribute('width', w);
        cv.setAttribute('height', h+1);  // I don't know why this +1 is needed but it is
    }

    function repaint(technique, w, h)
    {
        // Ids of the HTML elements
        var canv_id = 'canv_'+technique;
        var text_id = 'text_'+technique;

        // Retrieve canvas and context
        var cv  = document.getElementById(canv_id);
        var ctx = cv.getContext("2d")
        var c_mask = tech_props[technique].currmask;

        // Clear canvas
        ctx.clearRect(0, 0, cv.width, cv.height);

        // Paint
        ctx.lineWidth   = 1;
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.fillStyle   = 'rgba('+tech_props[technique].col_R+', '+tech_props[technique].col_G+', '+tech_props[technique].col_B+', 0.4)';        ctx.beginPath();

        for(var blob_id=0; blob_id<c_mask.x_coords.length; blob_id++)
        {
            ctx.moveTo(c_mask.x_coords[blob_id][0]/g_im.width*w,
                       c_mask.y_coords[blob_id][0]/g_im.height*h);
            for(var coord_id=0; coord_id<c_mask.x_coords[blob_id].length; coord_id++)
            {
                ctx.lineTo(c_mask.x_coords[blob_id][coord_id]/g_im.width*w,
                           c_mask.y_coords[blob_id][coord_id]/g_im.height*h);
            }
            ctx.closePath();
        }

        ctx.fill();
        ctx.stroke();

        // Update caption
        if (text_id!='text_gt')
            document.getElementById(text_id).innerHTML = "<div class=\"boxTitle\"><b>" + tech_props[technique].display_name + "</b>" + " - J=" + tech_props[technique].currmask.J + " - F=" + tech_props[technique].currmask.F + "</div>"; //" - T=" + tech_props[technique].currmask.T +
    }

    function respond_canvas()
    {
        // Do GT also
        plus_gt = techniques;
        plus_gt.push('gt');

        // Resize all techniques
        for(ii=0; ii<plus_gt.length; ii++)
        {
            // Retrieve image size
            var im_bbox   = document.getElementById('im_'+plus_gt[ii]).getBoundingClientRect();

            // Resize canvas
            resize_canvas('canv_'+plus_gt[ii], im_bbox.width, im_bbox.height);

            // Repaint
            repaint(plus_gt[ii], im_bbox.width, im_bbox.height);
        }
    }

    function add_first_time()
    {
        // Allocate all canvases and images
        for(ii=0; ii<techniques.length; ii++)
        {
          $.when($('#res_container').append('<div class="pure-u-1-3" style="position: relative;"><div style="padding:5px;text-align:center;"><img class="img" id="im_'+techniques[ii]+'" alt="" style="width: 100%;"/><canvas id="canv_'+techniques[ii]+'" style="position: absolute; left: 5px; top: 5px; outline: 2px solid black; outline-offset: -1px;"></canvas><span id="text_' + techniques[ii] + '"></span></div></div>'),
            {tec: techniques[ii]})
           .done(function(a,b)
           {
                // Repaint when the image is reloaded
                $('#im_'+b.tec).on('load',
                    function()
                    {
                        // Resize canvas only the first time
                        if (!tech_props[b.tec].canv_resized)
                        {
                            // Resize canvas
                            resize_canvas('canv_'+b.tec, this.getBoundingClientRect().width, this.getBoundingClientRect().height);

                            // Mark as changed
                            tech_props[b.tec].canv_resized = true;
                        }

                        // Get and store masks, and repaint
                        get_mask_and_repaint(b.tec);
                    }
                );
            });
        } 

        // Repaint GT when the image is reloaded
        $('#im_gt').on('load',
            function()
            {
                // Resize canvas only the first time
                if (!tech_props['gt'].canv_resized)
                {
                    // Resize canvas
                    resize_canvas('canv_gt', this.getBoundingClientRect().width, this.getBoundingClientRect().height);

                    // Mark as changed
                    tech_props['gt'].canv_resized = true;
                }

                // Get and store masks, and repaint
                get_mask_and_repaint('gt');
            }
        );

        // Read original image size
        g_im = new Image();

        // When it's read, then continue with code
        g_im.onload = function()
        {   
            // Set the main image
            document.getElementById('im_container').src=g_im.src;
            
            // Set the GT image
            document.getElementById('im_gt').src=g_im.src;

            // Set all subimages source
            for(ii=0; ii<techniques.length; ii++)
                document.getElementById('im_'+techniques[ii]).src=g_im.src;

            // Change frame number
            document.getElementById('im_text').innerHTML = pad(frame_num);
        }

        // Change sequence name in the title
        document.getElementById('seq_name').innerHTML = seq_id;

        // Actually set the image and fire everything
        g_im.src = 'images/db/'+ seq_id +'/'+pad(frame_num)+'.jpg';
    }


    function get_mask_and_repaint(technique)
    {
        $.when($.get('search.php',{ 'seq_id' : seq_id, 'fr_id' : pad(frame_num) , 'technique' : technique }))
         .done(function( data )
        {
            // Store the mask data
            tech_props[technique].currmask = mask_decode(technique, JSON.parse(data));

            // Repaint
            repaint(technique, document.getElementById('im_'+technique).offsetWidth, document.getElementById('im_'+technique).offsetHeight);
        });
    }


    function mask_decode(technique,mcode)
    {
        // Get the shape
        var all_x_coords = [];
        var all_y_coords = [];
           
        // Separate the object into blobs
        var blobs = mcode.Mask.split("/");
        for(blob_id=0;blob_id<blobs.length;blob_id++)
        {
            // Get the coordinates
            var coords = blobs[blob_id].split(",");

            var x_coords = [];
            var y_coords = [];
            for(coord_id=0;coord_id<coords.length;coord_id=coord_id+2)
            {
               x_coords.push(coords[coord_id]);
               y_coords.push(coords[coord_id+1]);

            }

            if (technique=='bvs')
            {
                all_x_coords.push(y_coords);
                all_y_coords.push(x_coords);
            }
            else
            {
                all_x_coords.push(x_coords);
                all_y_coords.push(y_coords);
            }
        }

        // Return mask and evaluation
        return {"x_coords": all_x_coords, "y_coords": all_y_coords, "J": mcode.J, "F": mcode.F, "T": mcode.T};
    }

</script>


<script src="js/ui.js"></script>


</body>

</html>


