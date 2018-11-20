var im_url  = 'https://graphics.ethz.ch/Downloads/Data/Davis/files/sequences/';
var res_url = 'https://data.vision.ee.ethz.ch/jpont/davis/overlays/';
// var im_url  = 'http://localhost/~jpont/davis/images/db/';
// var res_url = 'http://localhost/~jpont/davis/images/results-overlay/';

var seq_lists = {'val_2017'       : ['bike-packing_1','bike-packing_2','blackswan_1','bmx-trees_1','bmx-trees_2','breakdance_1','camel_1','car-roundabout_1','car-shadow_1','cows_1','dance-twirl_1','dog_1','dogs-jump_1','dogs-jump_2','dogs-jump_3','drift-chicane_1','drift-straight_1','goat_1','gold-fish_1','gold-fish_2','gold-fish_3','gold-fish_4','gold-fish_5','horsejump-high_1','horsejump-high_2','india_1','india_2','india_3','judo_1','judo_2','kite-surf_1','kite-surf_2','kite-surf_3','lab-coat_1','lab-coat_2','lab-coat_3','lab-coat_4','lab-coat_5','libby_1','loading_1','loading_2','loading_3','mbike-trick_1','mbike-trick_2','motocross-jump_1','motocross-jump_2','paragliding-launch_1','paragliding-launch_2','paragliding-launch_3','parkour_1','pigs_1','pigs_2','pigs_3','scooter-black_1','scooter-black_2','shooting_1','shooting_2','shooting_3','soapbox_1','soapbox_2','soapbox_3'],
                 'test_dev_2017'  : ['aerobatics_1','aerobatics_2','aerobatics_3','car-race_1','car-race_2','car-race_3','car-race_4','carousel_1','carousel_2','carousel_3','carousel_4','cats-car_1','cats-car_2','cats-car_3','cats-car_4','chamaleon_1','deer_1','deer_2','giant-slalom_1','giant-slalom_2','giant-slalom_3','girl-dog_1','girl-dog_2','girl-dog_3','golf_1','golf_2','golf_3','guitar-violin_1','guitar-violin_2','guitar-violin_3','guitar-violin_4','gym_1','gym_2','gym_3','gym_4','helicopter_1','helicopter_2','horsejump-stick_1','horsejump-stick_2','horsejump-stick_3','hoverboard_1','hoverboard_2','lock_1','lock_2','lock_3','lock_4','man-bike_1','man-bike_2','monkeys-trees_1','monkeys-trees_2','mtb-race_1','mtb-race_2','mtb-race_3','mtb-race_4','orchid_1','orchid_2','people-sunset_1','people-sunset_2','people-sunset_3','people-sunset_4','planes-crossing_1','planes-crossing_2','rollercoaster_1','salsa_1','salsa_2','salsa_3','salsa_4','salsa_5','salsa_6','salsa_7','salsa_8','salsa_9','salsa_10','seasnake_1','skate-jump_1','skate-jump_2','slackline_1','subway_1','subway_2','subway_3','subway_4','tandem_1','tandem_2','tandem_3','tandem_4','tennis-vest_1','tennis-vest_2','tractor_1','tractor_2']};

var techniques = ['premvos', 'cinm', 'osvoss', 'onavos', 'osvos', 'favos', 'osmn'];

var tech_props = {
"osvos"  : {"type": "semi2017", "sets": ['val_2017', 'test_dev_2017'], "display_name": "OSVOS" , "im_url": "osvos" , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
"onavos" : {"type": "semi2017", "sets": ['val_2017', 'test_dev_2017'], "display_name": "OnAVOS", "im_url": "onavos", "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
"osvoss" : {"type": "semi2017", "sets": ['val_2017', 'test_dev_2017'], "display_name": "OSVOS-S", "im_url": "osvoss", "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
"cinm" : {"type": "semi2017", "sets": ['val_2017', 'test_dev_2017'], "display_name": "CINM", "im_url": "cinm", "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
"favos" : {"type": "semi2017", "sets": ['val_2017', 'test_dev_2017'], "display_name": "FAVOS", "im_url": "favos", "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
"osmn" : {"type": "semi2017", "sets": ['val_2017', 'test_dev_2017'], "display_name": "OSMN", "im_url": "osmn", "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
"rgmp" : {"type": "semi2017", "sets": ['val_2017', 'test_dev_2017'], "display_name": "RGMP", "im_url": "rgmp", "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
"premvos" : {"type": "semi2017", "sets": ['val_2017', 'test_dev_2017'], "display_name": "PReMVOS", "im_url": "premvos", "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false}
};

var tech_types = ["semi2017"];

var techn_papers ={
  "premvos":{
    "conference": "ACCV",
    "authors": [
      "J. Luiten",
      "P. Voigtlaender",
      "B. Leibe"
    ],
    "year": 2018,
    "url": "https://github.com/JonathonLuiten/PReMVOS",
    "title": "PReMVOS: Proposal-generation, Refinement and Merging for Video Object Segmentation"
  },
  "rgmp": {
    "conference": "CVPR",
    "authors": [
      "S. Wug Oh",
      "J. Lee",
      "K. Sunkavalli",
      "S. Joo Kim"
    ],
    "year": 2018,
    "url": "https://github.com/seoungwugoh/RGMP",
    "title": "Fast Video Object Segmentation by Reference-Guided Mask Propagation"
  },
  "osmn": {
    "conference": "CVPR",
    "authors": [
      "L. Yang",
      "Y. Wang",
      "X. Xiong",
      "J. Yang",
      "A. K. Katsaggelos"
    ],
    "year": 2018,
    "url": "https://github.com/linjieyangsc/video_seg",
    "title": "Efficient Video Object Segmentation via Network Modulation"
  },
  "cinm": {
    "conference": "CVPR",
    "authors": [
      "L. Bao",
      "B. Wu",
      "W. Liu"
    ],
    "year": 2018,
    "url": "https://arxiv.org/abs/1803.09453",
    "title": "CNN in MRF: Video Object Segmentation via Inference in a CNN-Based Higher-Order Spatio-Temporal MRF"
  },
    "favos": {
    "conference": "CVPR",
    "authors": [
      "J. Cheng",
      "Y.-H. Tsai",
      "W.-C. Hung",
      "S. Wang",
      "M.-H. Yang"
    ],
    "year": 2018,
    "url": "https://github.com/JingchunCheng/FAVOS",
    "title": "Fast and Accurate Online Video Object Segmentation via Tracking Parts"
  },
    "osvos": {
    "conference": "CVPR",
    "authors": [
      "S. Caelles*",
      "K.K. Maninis*",
      "J. Pont-Tuset",
      "L. Leal-Taixé",
      "D. Cremers",
      "L. Van Gool"
    ],
    "year": 2017,
    "url": "http://www.vision.ee.ethz.ch/~cvlsegmentation/osvos",
    "title": "One-Shot Video Object Segmentation"
  },
    "onavos": {
    "conference": "BMVC",
    "authors": [
      "P. Voigtlaender",
      "B. Leibe"
    ],
    "year": 2017,
    "url": "https://www.vision.rwth-aachen.de/publication/00158/",
    "title": "Online Adaptation of Convolutional Neural Networks for Video Object Segmentation"
  },
    "osvoss": {
    "conference": "PAMI",
    "authors": [
      "K.K. Maninis*",
      "S. Caelles*",
      "Y. Chen",
      "J. Pont-Tuset",
      "L. Leal-Taixé",
      "D. Cremers",
      "L. Van Gool"
    ],
    "year": 2018,
    "url": "http://www.vision.ee.ethz.ch/~cvlsegmentation/osvos-s",
    "title": "Video Object Segmentation Without Temporal Information"
  }
};



