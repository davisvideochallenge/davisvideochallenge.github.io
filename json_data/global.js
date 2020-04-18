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

var techniques = ['ranet', 'premvos', 'osvoss', 'onavos', 'mhpvos', 'cinm', 'voswl', 'lucid', 'agame', 'rgmp', 'feelvos', 'favos', 'osvos',
  'msk', 'pml', 'sfls', 'matnet', 'andiff', 'cosnet', 'ags', 'epo+', 'motadapt', 'lsmo', 'pdb','osmn','ctn','siammask', 'vpn', 'plm', 'ofl', 'mugs', 'bvs',
  'fcp', 'jmp', 'hvs', 'sea', 'arp', 'lvo', 'uovos', 'fseg','lmp', 'sflu', 'tis', 'elm', 'mugu', 'fst', 'cut', 'nlc', 'msg', 'key',
  'cvos', 'trc'];

var shown_techniques_val = ['ranet', 'premvos', 'osvoss','onavos', 'mhpvos','voswl', 'matnet', 'andiff', 'cosnet'];

var shown_techniques_train = ['lucid', 'msk', 'ctn'];

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
                  "cinm"   : {"type": "semisup", "sets": ['val_2016']                             , "display_name": "CINM"  , "im_url": "cinm"  , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "osmn"   : {"type": "semisup", "sets": ['val_2016']                             , "display_name": "OSMN"  , "im_url": "osmn"  , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "pdb"    : {"type": "unsup"  , "sets": ['val_2016']                             , "display_name": "PDB"   , "im_url": "pdb"   , "col_R" : 0, "col_G" :   255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "rgmp"   : {"type": "semisup", "sets": ['val_2016']                             , "display_name": "RGMP"  , "im_url": "rgmp"  , "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "osvoss" : {"type": "semisup", "sets": ['val_2016']                             , "display_name": "OSVOS-S","im_url": "osvoss", "col_R" : 255, "col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "elm"    : {"type": "unsup"  , "sets": ['train_2016','val_2016','trainval_2016'], "display_name": "ELM"    ,"im_url": "elm"   , "col_R" : 0, "col_G" :   255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "premvos": {"type": "semisup" , "sets": ['val_2016'],                            "display_name": "PReMVOS", "im_url": "premvos", "col_R" : 255,"col_G" :   0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "motadapt":{"type": "unsup"   , "sets": ['val_2016'],                            "display_name": "MotAdapt","im_url": "motadapt", "col_R" : 0,"col_G" :  255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "voswl"   :{"type": "semisup", "sets": ['val_2016'],                            "display_name": "VOSwL",  "im_url": "voswl", "col_R" : 255,"col_G" :  0,   "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "lucid"   :{"type": "semisup", "sets": ['train_2016','val_2016','trainval_2016'],"display_name": "Lucid",   "im_url": "lucid", "col_R" : 255,"col_G" :  0,   "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "tis":     {"type": "unsup"   , "sets": ['train_2016','val_2016','trainval_2016'],"display_name": "TIS",    "im_url": "tis",     "col_R" : 0,"col_G" :  255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "feelvos"   :{"type": "semisup", "sets": ['val_2016'],                            "display_name": "FEELVOS",  "im_url": "feelvos", "col_R" : 255,"col_G" :  0,   "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "ags":     {"type": "unsup"   , "sets": ['val_2016'],                            "display_name": "AGS","im_url": "ags", "col_R" : 0,"col_G" :  255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "lsmo":   {"type": "unsup" ,    "sets": ['val_2016'],                            "display_name": "LSMO","im_url": "lsmo", "col_R" : 0,"col_G" :  255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "siammask"   :{"type": "semisup", "sets": ['val_2016'],                            "display_name": "SIAMMASK",  "im_url": "siammask", "col_R" : 255,"col_G" :  0,   "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "agame"   :{"type": "semisup", "sets": ['val_2016'],                            "display_name": "AGAME",  "im_url": "agame", "col_R" : 255,"col_G" :  0,   "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "uovos":     {"type": "unsup"   , "sets": ['train_2016','val_2016','trainval_2016'],"display_name": "UOVOS","im_url": "uovos", "col_R" : 0,"col_G" :  255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "ranet"   :{"type": "semisup", "sets": ['val_2016'],                            "display_name": "RANet",  "im_url": "ranet", "col_R" : 255,"col_G" :  0,   "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "cosnet":  {"type": "unsup"   , "sets": ['val_2016'],"display_name": "COSNet","im_url": "cosnet", "col_R" : 0,"col_G" :  255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "epo+":  {"type": "unsup"   , "sets": ['val_2016'],"display_name": "EpO+","im_url": "epo+", "col_R" : 0,"col_G" :  255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "andiff":  {"type": "unsup"   , "sets": ['val_2016'],"display_name": "AnDiff","im_url": "andiff", "col_R" : 0,"col_G" :  255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "matnet":  {"type": "unsup"   , "sets": ['val_2016'],"display_name": "MATNet","im_url": "matnet", "col_R" : 0,"col_G" :  255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "mugu":  {"type": "unsup"   , "sets": ['val_2016'],"display_name": "MuG-W","im_url": "mugu", "col_R" : 0,"col_G" :  255, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "mugs":  {"type": "semisup"   , "sets": ['val_2016'],"display_name": "MuG-W","im_url": "mugs", "col_R" : 255,"col_G" :  0, "col_B" :   0, "currmask": undefined, "canv_resized": false},
                  "mhpvos":  {"type": "semisup"   , "sets": ['val_2016'],"display_name": "MHP-VOS","im_url": "mhpvos", "col_R" : 255,"col_G" :  0, "col_B" :   0, "currmask": undefined, "canv_resized": false}
                };

var techn_papers ={
  "mugu":{},
  "mugs":{
    "conference": "CVPR",
    "authors": [
      "Xiankai Lu",
      "Wenguan Wang",
      "Jianbing Shen",
      "Yu-Wing Tai",
      "David Crandall",
      "Steven C. H. Hoi"
    ],
    "year": 2020,
    "url": "https://github.com/carrierlxk/MuG",
    "title": "Learning Video Object Segmentation from Unlabeled Videos\n",
    "extra_result": "mugu"
  },
  "mhpvos":{
    "conference": "CVPR",
    "authors": [
      "Shuangjie Xu",
      "Daizong Liu",
      "Linchao Bao",
      "Wei Liu",
      "Pan Zhou"
    ],
    "year": 2019,
    "url": "https://github.com/shuangjiexu/MHP-VOS",
    "title": "MHP-VOS: Multiple Hypotheses Propagation for Video Object Segmentation\n"
  },
  "matnet":{
    "conference": "AAAI",
    "authors": [
      "Tianfei Zhou",
      "Shunzhou Wang",
      "Yi Zhou",
      "Yazhou Yao",
      "Jianwu Li",
      "Ling Shao"
    ],
    "year": 2020,
    "url": "https://github.com/tfzhou/MATNet",
    "title": "Motion-Attentive Transition for Zero-Shot Video Object Segmentation\n"
  },
  "andiff":{
    "conference": "ICCV",
    "authors": [
      "Zhao Yang",
      "Qiang Wang",
      "Luca Bertinetto",
      "Weiming Hu",
      "Song Bai",
      "Philip H.S. Torr"
    ],
    "year": 2019,
    "url": "https://github.com/yz93/anchor-diff-VOS",
    "title": "Anchor Diffusion for Unsupervised Video Object Segmentation\n"
  },
  "epo+":{
    "conference": "WACV",
    "authors": [
      "Muhammad Faisal",
      "Ijaz Akhter",
      "Mohsen Ali",
      "Richard I. Hartley"
    ],
    "year": 2020,
    "url": "http://im.itu.edu.pk/video-object-segmentation/",
    "title": "Exploiting Geometric Constraints on Dense Trajectories for Motion Saliency\n"
  },
  "cosnet":{
    "conference": "CVPR",
    "authors": [
      "Xiankai Lu",
      "Wenguan Wang",
      "Chao Ma",
      "Jianbing Shen",
      "Ling Shao",
      "Fatih Porikli"
    ],
    "year": 2019,
    "url": "https://github.com/carrierlxk/COSNet",
    "title": "See More, Know More: Unsupervised Video Object Segmentation with Co-Attention Siamese Networks\n"
  },
  "ranet":{
    "conference": "ICCV",
    "authors": [
      "Ziqin Wang",
      "Jun Xu",
      "Li Liu",
      "Fan Zhu",
      "Ling Shao"
    ],
    "year": 2019,
    "url": "https://github.com/Storife/RANet/",
    "title": "RANet: Ranking Attention Network for Fast Video Object Segmentation\n"
  },
  "uovos":{
    "conference": "TIP",
    "authors": [
      "Tao Zhuo",
      "Zhiyong Cheng",
      "Peng Zhang",
      "Yongkang Wong",
      "Mohan Kankanhalli"
    ],
    "year": 2019,
    "url": "https://github.com/visiontao/uovos",
    "title": "Unsupervised Online Video Object Segmentation with Motion Property Understanding\n"
  },
  "agame":{
    "conference": "CVPR",
    "authors": [
      "Joakim Johnander",
      "Martin Danelljan",
      "Emil Brissman",
      "Fahad Shahbaz Khan",
      "Michael Felsberg"
    ],
    "year": 2019,
    "url": "https://github.com/joakimjohnander/agame-vos",
    "title": "A Generative Appearance Model for End-to-end Video Object Segmentation\n"
  },
  "siammask":{
    "conference": "CVPR",
    "authors": [
      "Qiang Wang",
      "Li Zhang",
      "Luca Bertinetto",
      "Weiming Hu",
      "Philip H.S. Torr"
    ],
    "year": 2019,
    "url": "http://www.robots.ox.ac.uk/~qwang/SiamMask/",
    "title": "Fast Online Object Tracking and Segmentation: A Unifying Approach\n"
  },
  "lsmo":{
    "conference": "IJCV",
    "authors": [
      "Pavel Tokmakov",
      "Cordelia Schmid",
      "Karteek Alahari"
    ],
    "year": 2019,
    "url": "https://link.springer.com/content/pdf/10.1007%2Fs11263-018-1122-2.pdf",
    "title": "Learning to Segment Moving Objects\n"
  },
  "feelvos":{
    "conference": "CVPR",
    "authors": [
      "Paul Voigtlaender",
      "Yuning Chai",
      "Florian Schroff",
      "Hartwig Adam",
      "Bastian Leibe",
      "Liang-Chieh Chen",
    ],
    "year": 2019,
    "url": "https://github.com/tensorflow/models/tree/master/research/feelvos",
    "title": "FEELVOS: Fast End-to-End Embedding Learning for Video Object Segmentation\n"
  },
  "ags":{
    "conference": "CVPR",
    "authors": [
      "Wenguan Wang",
      "Hongmei Song",
      "Shuyang Zhao",
      "Jianbing Shen",
      "Sanyuan Zhao",
      "Steven Chu Hong Hoi",
      "Haibin Ling"
    ],
    "year": 2019,
    "url": "https://github.com/wenguanwang/AGS",
    "title": "Learning Unsupervised Video Object Segmentation through Visual Attention\n"
  },
  "tis":{
    "conference": "WACV",
    "authors": [
      "B. Griffin",
      "J. Corso"
    ],
    "year": 2019,
    "url": "https://github.com/griffbr/TIS",
    "title": "Tukey-Inspired Video Object Segmentation\n"
  },
  "lucid":{
    "conference": "IJCV",
    "authors": [
      "A. Khoreva",
      "R. Benenson",
      "E. Ilg",
      "T. Brox",
      "B. Schiele"
    ],
    "year": 2019,
    "url": "https://www.mpi-inf.mpg.de/departments/computer-vision-and-multimodal-computing/research/weakly-supervised-learning/lucid-data-dreaming-for-object-tracking/",
    "title": "Lucid Data Dreaming for Video Object Segmentation\n"
  },

  "voswl":{
    "conference": "ACCV",
    "authors": [
      "A. Khoreva",
      "A. Rohrbach",
      "B. Schiele"
    ],
    "year": 2018,
    "url": "https://www.mpi-inf.mpg.de/departments/computer-vision-and-multimodal-computing/research/video-segmentation/video-object-segmentation-with-language-referring-expressions/",
    "title": "Video Object Segmentation with Language Referring Expressions"
  },
  "motadapt":{
    "conference": "ICRA",
    "authors": [
      "M. Siam",
      "C. Jiang",
      "S. Lu",
      "L. Petrich",
      "M. Gamal",
      "M Elhoseiny",
      "M Jagersand"
    ],
    "year": 2019,
    "url": "https://msiam.github.io/ivos/",
    "title": "Video Object Segmentation using Teacher-Student Adaptation in a Human Robot Interaction (HRI) Setting"
  },
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
  "elm": {
    "conference": "ECCV",
    "authors": [
      "D. Lao",
      "G. Sundaramoorthi"
    ],
    "year": 2018,
    "url": "https://github.com/donglao/layers3Dmotion",
    "title": "Extending Layered Models to 3D Motion"
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
  "pdb": {
    "conference": "ECCV",
    "authors": [
      "H. Song",
      "W. Wang",
      "J. Shen",
      "S. Zhao",
      "K. M. Lam"
    ],
    "year": 2018,
    "url": "https://github.com/shenjianbing/PDB-ConvLSTM",
    "title": "Pyramid Dilated Deeper ConvLSTM for Video Salient Object Detection"
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



