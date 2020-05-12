#!/bin/bash
mode=$1
competition_id=$2
phase_id=$3
cookies_path="/home/csergi/scratch/DAVIS_challenge/davischallenge.github.io/scripts/my-cookies.txt"
output_path="/home/csergi/scratch/DAVIS_challenge/tmp_${mode}/"

while :
do
    # Obtain the cookies with the chrome extension cookies.txt
    python parse_codalab_table.py $competition_id $phase_id $cookies_path $output_path $mode
    cp $output_path/${mode}_challenge_2020.js /home/csergi/public_data/share/davis/tmp_leaderboards/
    chmod 755 /home/csergi/public_data/share/davis/tmp_leaderboards/${mode}_challenge_2020.js
    echo 'Update:'
    date
    sleep 10m
done
