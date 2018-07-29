var im_url  = 'https://graphics.ethz.ch/Downloads/Data/Davis/files/sequences/';
var res_url = 'https://data.vision.ee.ethz.ch/csergi/share/davis/overlays/';
// var im_url  = 'http://localhost/~jpont/davis/images/db/';
// var res_url = 'http://localhost/~jpont/davis/images/results-overlay/';

var all_seq    = ["bear", "car-shadow", "elephant", "lucia", "rollerblade", "blackswan", "car-turn", "flamingo", "mallard-fly","scooter-black", "bmx-bumps", "cows", "goat", "mallard-water", "scooter-gray", "bmx-trees", "dance-jump", "hike", "motocross-bumps", "soapbox", "boat", "dance-twirl", "hockey", "motocross-jump", "soccerball", "breakdance", "dog", "horsejump-high", "motorbike", "stroller", "breakdance-flare", "dog-agility", "horsejump-low", "paragliding", "surf", "bus", "drift-chicane", "kite-surf", "paragliding-launch", "swing", "camel", "drift-straight", "kite-walk", "parkour", "tennis", "car-roundabout", "drift-turn", "libby", "rhino", "train"];
var seq_lists = {'train_2016'     : ['bear', 'bmx-bumps', 'boat', 'breakdance-flare', 'bus', 'car-turn', 'dance-jump', 'dog-agility', 'drift-turn', 'elephant', 'flamingo', 'hike', 'hockey', 'horsejump-low', 'kite-walk', 'lucia', 'mallard-fly', 'mallard-water', 'motocross-bumps', 'motorbike', 'paragliding', 'rhino', 'rollerblade', 'scooter-gray', 'soccerball', 'stroller', 'surf', 'swing', 'tennis', 'train'],
                 'val_2016'       : ['blackswan', 'bmx-trees', 'breakdance', 'camel', 'car-roundabout', 'car-shadow', 'cows', 'dance-twirl', 'dog', 'drift-chicane', 'drift-straight', 'goat', 'horsejump-high', 'kite-surf', 'libby', 'motocross-jump', 'paragliding-launch', 'parkour', 'scooter-black', 'soapbox'],
                 'trainval_2016'  : all_seq.sort()};

var seq_nframes = {"bear"                 : 82,
                   "blackswan"            : 50,
                   "bmxbumps"             : 90,
                   "bmxtrees"             : 80,
                   "boat"                 : 75,
                   "breakdance"           : 84,
                   "breakdanceflare"      : 71,
                   "bus"                  : 80,
                   "camel"                : 90,
                   "carroundabout"        : 75,
                   "carshadow"            : 40,
                   "carturn"              : 80,
                   "cows"                 : 104,
                   "dancejump"            : 60,
                   "dancetwirl"           : 90,
                   "dog"                  : 60,
                   "dogagility"           : 25,
                   "driftchicane"         : 52,
                   "driftstraight"        : 50,
                   "driftturn"            : 64,
                   "elephant"             : 80,
                   "flamingo"             : 80,
                   "goat"                 : 90,
                   "hike"                 : 80,
                   "hockey"               : 75,
                   "horsejumphigh"        : 50,
                   "horsejumplow"         : 60,
                   "kitesurf"             : 50,
                   "kitewalk"             : 80,
                   "libby"                : 49,
                   "lucia"                : 70,
                   "mallardfly"           : 70,
                   "mallardwater"         : 80,
                   "motocrossbumps"       : 60,
                   "motocrossjump"        : 40,
                   "motorbike"            : 43,
                   "paragliding"          : 70,
                   "paraglidinglaunch"    : 80,
                   "parkour"              : 100,
                   "rhino"                : 90,
                   "rollerblade"          : 35,
                   "scooterblack"         : 43,
                   "scootergray"          : 75,
                   "soapbox"              : 99,
                   "soccerball"           : 48,
                   "stroller"             : 91,
                   "surf"                 : 55,
                   "swing"                : 60,
                   "tennis"               : 70,
                   "train"                : 80};

var techniques = ['osvoss','onavos', 'cinm', 'favos','osvos','msk', 'pml','sfls','ctn','vpn', 'plm','ofl','bvs','fcp','jmp','hvs','sea',
                  'arp','lvo','fseg','lmp','sflu','fst','cut','nlc','msg','key','cvos','trc'];

var shown_techniques_val = ['osvoss','onavos','favos', 'cinm', 'osvos'];

var shown_techniques_train = ['msk', 'ctn', 'vpn'];

var tech_types = ["unsup", "semisup"];

var tech_props = {"nlc"    : {"type": "unsup"  , "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "NLC"   , "im_url": "nlc"   , "col_R" :   0, "col_G" : 255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "arp"    : {"type": "unsup"  , "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "ARP"   , "im_url": "arp"   , "col_R" :   0, "col_G" : 255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "lmp"    : {"type": "unsup"  , "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "LMP"   , "im_url": "lmp"   , "col_R" :   0, "col_G" : 255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "fseg"   : {"type": "unsup"  , "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "FSEG"  , "im_url": "fseg"  , "col_R" :   0, "col_G" : 255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "cut"    : {"type": "unsup"  , "sets": ['val_2016'                             ], "display_name": "CUT"   , "im_url": "cut"   , "col_R" :   0, "col_G" : 255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "lvo"    : {"type": "unsup"  , "sets": ['val_2016'                             ], "display_name": "LVO"   , "im_url": "lvo"   , "col_R" :   0, "col_G" : 255, "col_B" :   0, "currmask": undefined, "canv_resized": false},                 
                  "cvos"   : {"type": "unsup"  , "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "CVOS"  , "im_url": "cvos"  , "col_R" :   0, "col_G" : 255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "trc"    : {"type": "unsup"  , "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "TRC"   , "im_url": "trc"   , "col_R" :   0, "col_G" : 255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "msg"    : {"type": "unsup"  , "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "MSG"   , "im_url": "msg"   , "col_R" :   0, "col_G" : 255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "key"    : {"type": "unsup"  , "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "KEY"   , "im_url": "key"   , "col_R" :   0, "col_G" : 255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "sal"    : {"type": "unsup"  , "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "SAL"   , "im_url": "sal"   , "col_R" :   0, "col_G" : 255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "fst"    : {"type": "unsup"  , "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "FST"   , "im_url": "fst"   , "col_R" :   0, "col_G" : 255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "tsp"    : {"type": "semisup", "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "TSP"   , "im_url": "tsp"   , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "sfls"   : {"type": "semisup", "sets": ['val_2016'                             ], "display_name": "SFL"   , "im_url": "sfls"  , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "sflu"   : {"type": "unsup"  , "sets": ['val_2016'                             ], "display_name": "SFL"   , "im_url": "sflu"  , "col_R" :   0, "col_G" : 255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "sea"    : {"type": "semisup", "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "SEA"   , "im_url": "sea"   , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "hvs"    : {"type": "semisup", "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "HVS"   , "im_url": "hvs"   , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "jmp"    : {"type": "semisup", "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "JMP"   , "im_url": "jmp"   , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "fcp"    : {"type": "semisup", "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "FCP"   , "im_url": "fcp"   , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "bvs"    : {"type": "semisup", "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "BVS"   , "im_url": "bvs"   , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "ofl"    : {"type": "semisup", "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "OFL"   , "im_url": "obj"   , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "msk"    : {"type": "semisup", "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "MSK"   , "im_url": "msk"   , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "ctn"    : {"type": "semisup", "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "CTN"   , "im_url": "ctn"   , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "osvos"  : {"type": "semisup", "sets": ['val_2016']                             , "display_name": "OSVOS" , "im_url": "osvos" , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "onavos" : {"type": "semisup", "sets": ['val_2016']                             , "display_name": "OnAVOS", "im_url": "onavos", "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "plm"    : {"type": "semisup", "sets": ['val_2016']                             , "display_name": "PLM"   , "im_url": "plm"   , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "pml"    : {"type": "semisup", "sets": ['val_2016']                             , "display_name": "PML"   , "im_url": "pml"   , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "vpn"    : {"type": "semisup", "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "VPN"   , "im_url": "vpn"   , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "favos"  : {"type": "semisup", "sets": ['val_2016']                             , "display_name": "FAVOS" , "im_url": "favos" , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "cinm"   : {"type": "semisup", "sets": ['val_2016']                             , "display_name": "CINM" , "im_url": "cinm" , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "osvoss" : {"type": "semisup", "sets": ['val_2016']                             , "display_name": "OSVOS-S" , "im_url": "osvoss" , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false}};


var techn_papers ={
  "pml": {
    "conference": "CVPR",
    "authors": [
      "Y. Chen",
      "J. Pont-Tuset",
      "A. Montes",
      "L. Van Gool"
    ],
    "year": 2018,
    "url": "http://www.vision.ee.ethz.ch/~cvlsegmentation/blazingly/",
    "title": "Blazingly Fast Video Object Segmentation with Pixel-Wise Metric Learning\n"
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
  },
    "lvo": {
    "conference": "ICCV",
    "authors": [
      "P. Tokmakov",
      "K. Alahari",
      "C. Schmid"
    ],
    "year": 2017,
    "url": "http://lear.inrialpes.fr/research/lvo/",
    "title": "Learning Video Object Segmentation with Visual Memory"
  }, 
  "plm": {
    "conference": "ICCV",
    "authors": [
      "J. Shin Yoon",
      "F. Rameau", 
      "J. Kim", 
      "S. Lee", 
      "S. Shin",
      "I. So Kweon"
    ],
    "year": 2017,
    "url": "https://jsyoon4325.wixsite.com/pix-matching",
    "title": "Pixel-level Matching for Video Object Segmentation using Convolutional Neural Networks"
  }, 
  "sflu": {
    "conference": "ICCV",
    "authors": [
      "J. Cheng",
      "Y.-H. Tsai",
      "S. Wang",
      "M.-H. Yang"
    ],
    "year": 2017,
    "url": "https://sites.google.com/site/yihsuantsai/research/iccv17-segflow",
    "title": "SegFlow: Joint Learning for Video Object Segmentation and Optical Flow"
  },  
  "sfls": {
    "conference": "ICCV",
    "authors": [
      "J. Cheng",
      "Y.-H. Tsai",
      "S. Wang",
      "M.-H. Yang"
    ],
    "year": 2017,
    "url": "https://sites.google.com/site/yihsuantsai/research/iccv17-segflow",
    "title": "SegFlow: Joint Learning for Video Object Segmentation and Optical Flow"
  }, 
  "arp": {
    "conference": "CVPR",
    "authors": [
      "Y.J. Koh",
      "C.-S. Kim"
    ],
    "year": 2017,
    "url": "https://mcl.korea.ac.kr/yjkoh_cvpr2017/",
    "title": "Primary Object Segmentation in Videos Based on Region Augmentation and Reduction"
  }, 
    "ctn": {
    "conference": "CVPR",
    "authors": [
      "W.-D. Jang",
      "C.-S. Kim"
    ],
    "year": 2017,
    "url": "http://mcl.korea.ac.kr/~dotol1216/CVPR2017_CTN/index.html",
    "title": "Online Video Object Segmentation via Convolutional Trident Network"
  }, 
    "fseg": {
    "conference": "CVPR",
    "authors": [
      "S. Jain",
      "B. Xiong",
      "K. Grauman"
    ],
    "year": 2017,
    "url": "http://vision.cs.utexas.edu/projects/fusionseg/",
    "title": "FusionSeg: Learning to combine motion and appearance for fully automatic segmentation of generic objects in videos"
  }, 
  "lmp": {
    "conference": "CVPR",
    "authors": [
      "P. Tokmakov",
      "K. Alahari",
      "C. Schmid"
    ],
    "year": 2017,
    "url": "http://thoth.inrialpes.fr/research/mpnet/",
    "title": "Learning Motion Patterns in Videos"
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
  "msk": {
    "conference": "CVPR",
    "authors": [
      "F. Perazzi*",
      "A. Khoreva*",
      "R. Benenson",
      "B. Schiele",
      "A. Sorkine-Hornung"
    ],
    "year": 2017,
    "url": "https://graphics.ethz.ch/~perazzif/masktrack/index.html",
    "title": "Learning Video Object Segmentation from Static Images"
  },
  "vpn": {
    "conference": "CVPR",
    "authors": [
      "V. Jampani",
      "R. Gadde",
      "P. V. Gehler"
    ],
    "year": 2017,
    "url": "https://varunjampani.github.io/vpn/",
    "title": "Video Propagation Networks"
  },
  "ofl": {
    "conference": "CVPR",
    "authors": [
      "Y.-H. Tsai",
      "M.-H. Yang",
      "M. Black"
    ],
    "year": 2016,
    "url": "https://sites.google.com/site/yihsuantsai/research/cvpr16-segmentation",
    "title": "Video Segmentation via Object Flow"
  },
  "fcp": {
    "conference": "ICCV",
    "authors": [
      "F. Perazzi",
      "O. Wang",
      "M. Gross",
      "A. Sorkine-Hornung"
    ],
    "year": 2015,
    "url": "https://graphics.ethz.ch/~perazzif/fcop/index.html",
    "title": "Fully Connected Object Proposals for Video Segmentation"
  },
  "cvos": {
    "conference": "CVPR",
    "authors": [
      "B. Taylor",
      "V. Karasev",
      "S. Soatto"
    ],
    "year": 2015,
    "url": "http://vision.ucla.edu/cvos/",
    "title": "Causal Video Object Segmentation from Persistence of Occlusions"
  },
  "sea": {
    "conference": "CVPR",
    "authors": [
      "S. Avinash Ramakanth",
      "R. Venkatesh Babu"
    ],
    "year": 2014,
    "url": "http://www.cv-foundation.org/openaccess/content_cvpr_2014/papers/Ramakanth_SeamSeg_Video_Object_2014_CVPR_paper.pdf",
    "title": "SeamSeg: Video Object Segmentation Using Patch Seams"
  },
    "bvs": {
    "conference": "CVPR",
    "authors": [
      "N. Marki",
      "F. Perazzi",
      "O. Wang",
      "A. Sorkine-Hornung"
    ],
    "year": 2016,
    "url": "https://graphics.ethz.ch/~perazzif/bvs/index.html",
    "title": "Bilateral Space Video Segmentation"
  },
  "sal": {
    "conference": "CVPR",
    "authors": [
      "W. Wang",
      "J. Shen",
      "F. Porikli"
    ],
    "year": 2015,
    "url": "https://github.com/shenjianbing/SaliencySeg",
    "title": "Saliency-Aware Geodesic Video Object Segmentation"
  },
  "mcg": {
    "conference": "CVPR",
    "authors": [
      "P. Arbelaez",
      "J. Pont-Tuset",
      "J. T. Barron",
      "F. Marques",
      "J. Malik"
    ],
    "year": 2014,
    "url": "http://www.eecs.berkeley.edu/Research/Projects/CS/vision/grouping/mcg/",
    "title": "Multiscale Combinatorial Grouping"
  },
  "trc": {
    "conference": "CVPR",
    "authors": [
      "K. Fragkiadaki",
      "G. Zhang",
      "J. Shi"
    ],
    "year": 2012,
    "url": "http://people.eecs.berkeley.edu/~katef/videoseg.html",
    "title": "Video segmentation by tracing discontinuities in a trajectory embedding"
  },
  "nlc": {
    "conference": "BMVC",
    "authors": [
      "A. Faktor",
      "M. Irani"
    ],
    "year": 2014,
    "url": "http://www.wisdom.weizmann.ac.il/~vision/NonLocalVideoSegmentation.html",
    "title": "Video Segmentation by Non-Local Consensus voting"
  },
  "fst": {
    "conference": "ICCV",
    "authors": [
      "A. Papazoglou",
      "V. Ferrari"
    ],
    "year": 2013,
    "url": "http://groups.inf.ed.ac.uk/calvin/FastVideoSegmentation/",
    "title": "Fast Object Segmentation in Unconstrained Video"
  },
  "key": {
    "conference": "ICCV",
    "authors": [
      "Y. Lee",
      "J. Kim",
      "K. Grauman"
    ],
    "year": 2011,
    "url": "http://vision.cs.utexas.edu/projects/keysegments/keysegments.html",
    "title": "Key-segments for video object segmentation"
  },
  "msg": {
    "conference": "ICCV",
    "authors": [
      "P. Ochs",
      "T. Brox"
    ],
    "year": 2011,
    "url": "http://lmb.informatik.uni-freiburg.de/Publications/2011/OB11/",
    "title": "Object segmentation in video: A hierarchical variational approach for turning point trajectories into dense regions"
  },
  "sfmot": {
    "conference": "CVPR",
    "authors": [
      "F. Perazzi",
      "P. Krahenbuhl",
      "Y. Pritch",
      "A. Hornung"
    ],
    "year": 2012,
    "url": "https://graphics.ethz.ch/~perazzif/saliency_filters/",
    "title": "Saliency filters: Contrast based filtering for salient region detection"
  },
  "sflab": {
    "conference": "CVPR",
    "authors": [
      "F. Perazzi",
      "P. Krahenbuhl",
      "Y. Pritch",
      "A. Hornung"
    ],
    "year": 2012,
    "url": "https://graphics.ethz.ch/~perazzif/saliency_filters/",
    "title": "Saliency filters: Contrast based filtering for salient region detection"
  },
  "jmp": {
    "conference": "SIGGRAPH",
    "authors": [
      "Q. Fan",
      "F. Zhong",
      "D. Lischinski",
      "D. Cohen-Or",
      "B. Chen"
    ],
    "year": 2015,
    "url": "http://irc.cs.sdu.edu.cn/JumpCut/",
    "title": "JumpCut: Non-Successive Mask Transfer and Interpolation for Video Cutout"
  },
  "cut": {
    "conference": "ICCV",
    "authors": [
      "M. Keuper",
      "B. Andres",
      "T. Brox"
    ],
    "year": 2015,
    "url": "https://lmb.informatik.uni-freiburg.de/Publications/2015/KB15b/",
    "title": "Motion Trajectory Segmentation via Minimum Cost Multicuts"
  },
  "hvs": {
    "conference": "CVPR",
    "authors": [
      "M. Grundmann",
      "V. Kwatra",
      "M. Han",
      "I. A. Essa"
    ],
    "year": 2010,
    "url": "http://www.cc.gatech.edu/cpl/projects/videosegmentation/",
    "title": "Efficient hierarchical graph-based video segmentation"
  },
  "tsp": {
    "conference": "CVPR",
    "authors": [
      "J. Chang",
      "D. Wei",
      "J. W. Fisher III"
    ],
    "year": 2013,
    "url": "http://groups.csail.mit.edu/vision/sli/projects.php?name=temporal_superpixels",
    "title": "A Video Representation Using Temporal Superpixels"
  }
};



