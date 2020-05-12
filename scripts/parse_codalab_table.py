import os
import datetime
import sys
import collections
import glob
from bs4 import BeautifulSoup
import zipfile
import numpy as np
import json

competition_id = sys.argv[1]
phase_id = sys.argv[2]
cookies_file = sys.argv[3]
output_path = sys.argv[4]
mode = sys.argv[5]


def clean_directory(path):
    path = path[:-1] if path[-1] == '/' else path
    files = glob.glob(f'{path}/*')
    for f in files:
        try:
            os.unlink(f)
        except OSError as e:
            print("Error: %s : %s" % (f, e.strerror))


def download_table_from_url(url, table_id=0):
    row_list = []
    cmd = f'wget --cookies=on --keep-session-cookies --load-cookies={cookies_file} -O {output_path}/website.txt "{url}"'
    os.system(cmd)
    with open(f'{output_path}/website.txt', 'r') as f:
        website = f.read()
    clean_directory(output_path)
    if website == '':
        return row_list
    soup = BeautifulSoup(website, 'lxml')
    pages_table = soup.find_all('table')[table_id]
    for i, row in enumerate(pages_table.find_all('tr')):
        if i == 0:
            continue
        column_list = []
        for j, column in enumerate(row.find_all('td')):
            if j == 4:
                break
            column_list.append(column.get_text().replace('\n', '').replace(' ', ''))
        row_list.append(column_list)
    return row_list


def get_participants_team():
    codalab_url = f'https://competitions.codalab.org/my/competition/{competition_id}/participants'
    row_list = download_table_from_url(codalab_url, 1)
    participant_teams = {}
    for participant in row_list:
        participant_teams[participant[1]] = participant[3]

    return participant_teams


def get_table():
    table = []
    page_num = 1
    while True:
        codalab_url = f'https://competitions.codalab.org/my/competition/{competition_id}/submissions/?page={page_num}&phase={phase_id}'
        row_list = download_table_from_url(codalab_url)
        if len(row_list) == 0:
            break
        page_num += 1
        table.extend(row_list)
    return table


def get_participants_submissions(table):
    participants = collections.defaultdict(list)
    for row in table:
        participants[row[2]].append(row[3])
    return participants


def aggregate_participants_submissions(participants_submissions, participants_teams):
    teams_submissions = collections.defaultdict(list)
    for participant, submissions in participants_submissions.items():
        if participants_teams[participant] != '':
            teams_submissions[participants_teams[participant]].extend(submissions)
        else:
            teams_submissions[participant].extend(submissions)
    return teams_submissions


def get_participant_best_result(download_ids):
    max_metric = 0
    best_metric = []
    for download_id in download_ids:
        codalab_url = f'https://competitions.codalab.org/my/competition/submission/{download_id}/output.zip'
        cmd = f'wget --cookies=on --keep-session-cookies --load-cookies={cookies_file} -P {output_path} "{codalab_url}"'
        os.system(cmd)
        file = os.path.join(output_path, 'output.zip')
        zip_ref = zipfile.ZipFile(file, 'r')
        zip_ref.extractall(output_path)
        zip_ref.close()
        if not os.path.isfile(os.path.join(output_path, 'scores.txt')):
            clean_directory(output_path)
            continue
        with open(os.path.join(output_path, 'scores.txt')) as f:
            lines = f.readlines()
        metrics = []
        for line in lines:
            metrics.append(float(line.strip().split(':')[-1]))
        if metrics[0] > max_metric:
            max_metric = metrics[0]
            best_metric = metrics
        clean_directory(output_path)
    return best_metric


def save_json(usernames, results):
    results_np = np.array(results)
    ind_pos = np.argsort(-results_np[:, 0])
    username_sorted = []
    for ii in range(len(usernames)):
        username_sorted.append(usernames[ind_pos[ii]])

    dict_js = {}
    dict_js["techniques"] = username_sorted
    dict_js["date"] = datetime.datetime.now().strftime("%b-%d-%Y %H:%M:%S")
    for ii in range(len(usernames)):
        tmp_dic = {'J_F': f'{results_np[ii, 0]}',
                   'Jmean': f'{results_np[ii, 1]}',
                   'Jrecall': f'{results_np[ii, 2]}',
                   'Jdecay': f'{results_np[ii, 3]}',
                   'Fmean': f'{results_np[ii, 4]}',
                   'Frecall': f'{results_np[ii, 5]}',
                   'Fdecay': f'{results_np[ii, 6]}',
                   }
        dict_js[usernames[ii]] = tmp_dic

    with open(os.path.join(output_path, 'leaderboard.json'), 'w') as fp:
        json.dump(dict_js, fp, indent=4, sort_keys=True)

    with open(os.path.join(output_path, 'leaderboard.json')) as f:
        lines = f.readlines()
    lines[0] = 'var ' + mode + '_challenge_2020 = {\n'
    lines[-1] = '};'
    with open(os.path.join(output_path, f'{mode}_challenge_2020.js'), "w") as f:
        f.writelines(lines)


if __name__ == '__main__':
    clean_directory(output_path)
    participants_teams = get_participants_team()

    submissions_table = get_table()
    if len(submissions_table) == 0:
        print('No table data found!')
        exit(0)

    participants_submissions = get_participants_submissions(submissions_table)
    teams_submissions = aggregate_participants_submissions(participants_submissions, participants_teams)
    participants, metrics = [], []
    for participant, submission_ids in teams_submissions.items():
        best_metric = get_participant_best_result(submission_ids)
        if len(best_metric) > 0:
            participants.append(participant)
            metrics.append(best_metric)

    save_json(participants, metrics)
