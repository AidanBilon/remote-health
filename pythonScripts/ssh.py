import paramiko
from firebase import get_image_links


def run_remote_command(host, username, password, image_url):
    # Create an SSH client
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        # Connect to the host
        ssh.connect(host, username=username, password=password)
        
        # Change directory and run the command
        command = f'cd huggingface && python3 doctor_referral_run.py {image_url}'
        stdin, stdout, stderr = ssh.exec_command(command)
        
        # Print the output and errors
        print(stdout.read().decode())
        print(stderr.read().decode())

    #     # get txt file
    #     output = 'cat output.txt'
    #     stdin, stdout, stderr = ssh.exec_command(output)
    #     print(stdout.read().decode())
    # except Exception as e:
    #     print(f'An error occurred: {e}')
        
    finally:
        # Close the connection
        ssh.close()

# Usage
host = '195.242.13.73'
username = 'ubuntu'
password = 'dW7jg1BuyS'
image_url = get_image_links() # get_image_links() returns a list of image URLs from firebase.py

run_remote_command(host, username, password, image_url)