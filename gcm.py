#!/user/bin/python

__author__ = 'alisonbnt'

import os
import urllib
import ConfigParser

def setup():
    print('-- GCM REPOSITORY SETUP --')
    print('Checking setup')
    already_installed_hook = False
    git_hook_path = '.git/hooks/commit-msg'
    cfg_file_path = '.git/hooks/gcm.cfg'

    if os.path.isfile(git_hook_path):
        already_installed_hook = True

    already_installed_config = False
    if os.path.isfile(cfg_file_path):
        already_installed_config = True

    if already_installed_hook and already_installed_config:
        print('Hook and Config files already exists.')
        rerun = yes_no_dialog('Would you like to replace then?')

        if not rerun:
            print('Quitting...')
            exit()
        else:
            print('Removing old files... '),
            os.remove(git_hook_path)
            os.remove(cfg_file_path)
            already_installed_config = False
            already_installed_hook = False
            print('DONE')
            print('Running script... ')

    print('Current directory')
    print(os.getcwd())
    print('Make sure this script is running at the repository root')
    running_root_dir = yes_no_dialog('Running in root dir?')
    if running_root_dir:
        print('Running setup')
        if not already_installed_hook:
            print('Downloading hook script... '),

            testfile = urllib.URLopener()
            testfile.retrieve(
                "https://raw.githubusercontent.com/alisonbnt/gcm-commit-msg-hook/master/commit-msg",
                ".git/hooks/commit-msg"
            )
            print('DONE')
            print('Hook retrieved successfully')
        else:
            print('Git hook already downloaded.. skipping')

        if not already_installed_config:
            correct_config = False
            config = ConfigParser.RawConfigParser()
            config.add_section('GCM')
            owner = None
            repository = None
            print('Creating config file')
            while not correct_config:
                print('Repository access details')
                owner = raw_input('Enter the repository owner: ')
                repository = raw_input('Enter the repository name: ')
                print('')
                print('Please verify the given data')
                print('Repository owner: ' + owner)
                print('Repository name: ' + repository)

                correct_config = yes_no_dialog('Is this correct?')

            config.set('GCM', 'repo', repository)
            config.set('GCM', 'owner', owner)

            with open(cfg_file_path, 'wb') as configfile:
                print('Writing data to file... '),
                config.write(configfile)
                print('DONE')

        else:
            print('Config file already set... Skipping')

        print('')
        print('Setup complete')

        print('Remember to give execution rights for downloaded hook (Use the command below)')
        print('chmod +x .git/hooks/commit-msg')
    else:
        print('Quitting...')
        exit()

def yes_no_dialog(prompt):
    answer = raw_input(prompt + ' (Y/n) ')
    if answer.lower() == "n":
        return False

    elif answer is True and answer.lower() != "y":
        print('Invalid option - quitting')
        exit()

    return True


if __name__ == '__main__':
    setup()
