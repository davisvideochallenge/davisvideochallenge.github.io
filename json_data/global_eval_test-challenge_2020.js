var tech_props_semisup = {
    "AMIND": {
        "type": "over",
        "display_name": "Alibaba-Vision",
        "sets": [
            "test-challenge-2020"
        ]
    },
    "Bytedance": {
        "type": "over",
        "display_name": "Bytedance",
        "sets": [
            "test-challenge-2020"
        ]
    },
    "DSVOS": {
        "type": "over",
        "display_name": "DSVOS",
        "sets": [
            "test-challenge-2020"
        ]
    },
    "DeepDream": {
        "type": "over",
        "display_name": "DeepDream",
        "sets": [
            "test-challenge-2020"
        ]
    },
    "HCMUS-UD-NII-UIUC": {
        "type": "over",
        "display_name": "HCMUS-UD-NII-UIUC",
        "sets": [
            "test-challenge-2020"
        ]
    },
    "ReLER": {
        "type": "over",
        "display_name": "ReLER",
        "sets": [
            "test-challenge-2020"
        ]
    },
    "hongje": {
        "type": "over",
        "display_name": "hongje",
        "sets": [
            "test-challenge-2020"
        ]
    },
    "vltanh": {
        "type": "over",
        "display_name": "vltanh",
        "sets": [
            "test-challenge-2020"
        ]
    }
};

var tech_props_unsup = {
    "BLIIT": {
        "type": "over",
        "display_name": "BLIIT",
        "sets": [
            "test-challenge-2020"
        ]
    },
    "HCMUS": {
        "type": "over",
        "display_name": "HCMUS",
        "sets": [
            "test-challenge-2020"
        ]
    },
    "IIAI": {
        "type": "over",
        "display_name": "IIAI",
        "sets": [
            "test-challenge-2020"
        ]
    },
    "TeamPhoenix": {
        "type": "over",
        "display_name": "Team Phoenix",
        "sets": [
            "test-challenge-2020"
        ]
    }
};

var global_eval_test_challenge_2020_semisupervised = {
    "AMIND": {
        "Fdecay": 0.16147,
        "Fmean": 0.867468,
        "Frecall": 0.928956,
        "J_F": 0.841457,
        "Jdecay": 0.142017,
        "Jmean": 0.815445,
        "Jrecall": 0.891436,
    },
    "Bytedance": {
        "Fdecay": 0.230104,
        "Fmean": 0.746388,
        "Frecall": 0.830257,
        "J_F": 0.722208,
        "Jdecay": 0.207408,
        "Jmean": 0.698027,
        "Jrecall": 0.767164,
    },
    "DSVOS": {
        "Fdecay": 0.236336,
        "Fmean": 0.794557,
        "Frecall": 0.869277,
        "J_F": 0.769156,
        "Jdecay": 0.20528,
        "Jmean": 0.743755,
        "Jrecall": 0.827098,
    },
    "DeepDream": {
        "Fdecay": 0.277077,
        "Fmean": 0.672795,
        "Frecall": 0.767079,
        "J_F": 0.648735,
        "Jdecay": 0.242424,
        "Jmean": 0.624675,
        "Jrecall": 0.721383,
    },
    "HCMUS-UD-NII-UIUC": {
        "Fdecay": 0.119599,
        "Fmean": 0.821309,
        "Frecall": 0.906766,
        "J_F": 0.793182,
        "Jdecay": 0.101339,
        "Jmean": 0.765055,
        "Jrecall": 0.85077,
    },
    "ReLER": {
        "Fdecay": 0.178403,
        "Fmean": 0.865164,
        "Frecall": 0.933476,
        "J_F": 0.838023,
        "Jdecay": 0.181176,
        "Jmean": 0.810881,
        "Jrecall": 0.884445,
    },
    "hongje": {
        "Fdecay": 0.171354,
        "Fmean": 0.820722,
        "Frecall": 0.89591,
        "J_F": 0.795414,
        "Jdecay": 0.149486,
        "Jmean": 0.770105,
        "Jrecall": 0.85698,
    },
    "vltanh": {
        "Fdecay": 0.196327,
        "Fmean": 0.787282,
        "Frecall": 0.871671,
        "J_F": 0.760021,
        "Jdecay": 0.16634,
        "Jmean": 0.73276,
        "Jrecall": 0.819294,
    },
    "techniques": [
        "AMIND",
        "ReLER",
        "hongje",
        "HCMUS-UD-NII-UIUC",
        "DSVOS",
        "vltanh",
        "Bytedance",
        "DeepDream",
    ],
};

var global_eval_test_challenge_2020_unsupervised = {
    "BLIIT": {
        "Fdecay": -0.024749,
        "Fmean": 0.544221,
        "Frecall": 0.588724,
        "J_F": 0.523116,
        "Jdecay": -0.049773,
        "Jmean": 0.502012,
        "Jrecall": 0.57478,
    },
    "HCMUS": {
        "Fdecay": 0.039929,
        "Fmean": 0.474902,
        "Frecall": 0.501235,
        "J_F": 0.438682,
        "Jdecay": -0.006141,
        "Jmean": 0.402462,
        "Jrecall": 0.456719,
    },
    "IIAI": {
        "Fdecay": 0.016268,
        "Fmean": 0.581626,
        "Frecall": 0.624854,
        "J_F": 0.556379,
        "Jdecay": -0.005156,
        "Jmean": 0.531132,
        "Jrecall": 0.599502,
    },
    "TeamPhoenix": {
        "Fdecay": 0.005174,
        "Fmean": 0.647319,
        "Frecall": 0.710833,
        "J_F": 0.615665,
        "Jdecay": -0.016285,
        "Jmean": 0.584012,
        "Jrecall": 0.650016,
    },
    "techniques": [
        "TeamPhoenix",
        "IIAI",
        "BLIIT",
        "HCMUS"
    ]
};
