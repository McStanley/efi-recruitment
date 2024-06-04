# EFI DevOps Recruitment Task

This project is a solution to the Eficode DevOps [challenge task](https://github.com/mf-efi/recruitment-2024).

## Environment Variables

To run this project, you will need to add the following environment variables to your **.env** file:

- `ENDPOINT`

- `APPID`

- `TARGET_CITY` (optional)

Refer to **.env.example** for more information.

## Deployment

To deploy this project follow below instructions:

### Prerequisites

- Create AWS account
- Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [AWS Vault](https://github.com/99designs/aws-vault#readme)
- Install [Docker](https://docs.docker.com/engine/install/)
- Install [Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- Install [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/installation_distros.html)

### Configure AWS CLI and AWS Vault

1. In AWS Console: **Services > IAM > Users > Create user**
2. User name: **efi-recruitment-user**, then next.
3. Create group **efi-recruitment-group** with **AdministratorAccess** permission policy, then select it from the list and click next.
4. Review user details, then **Create user**.
5. Click on newly created user to open it.
6. In summary section click **Create access key**.
7. Select **Command Line Interface (CLI)** as use case and check the confirmation box, then next.
8. Set description tag to **efi-recruitment-key**, then create access key.
9. Open the terminal and run the following command:

   ```bash
   aws configure
   --------------
   AWS Access Key ID: # paste from AWS console
   AWS Secret Access Key: # paste from AWS console
   Default region name: # eu-central-1
   Default output format: # yaml
   ```

10. Run the following command:

    ```bash
    aws-vault add efi-recruitment-user
    --------------
    Enter Access Key ID: # paste from AWS console
    Enter Secret Access Key: # paste from AWS console
    ```

11. Run the following command:

    ```bash
    aws-vault exec efi-recruitment-user
    ```

### Create a key pair

1. In AWS Console: **Services > EC2 > Key pairs > Create key pair**
2. Set name to **efi-recruitment-key** and leave default settings (RSA, .pem), then **Create key pair**.
3. Download the key and note its location for later use.

### Provision EC2 instance with Terraform

1. Open the terminal and `cd` into `./terraform`.
2. Make sure you are authenticated by running the command:

   ```bash
   aws-vault exec efi-recruitment-user
   ```

3. Run the following command to initialize:

   ```bash
   terraform init
   ```

4. Run the following command to set up infrastructure:

   ```bash
   terraform apply
   ```

   ... then specify values of the required variables (region, key_name, instance_name, sg_name). You may follow the given suggestions for each of them.

5. Enter `yes` to confirm the operation.

### Configure environment with Ansible

1. Update `ENDPOINT` environment variable in `.env` to reflect your instance's public IPv4 address.
2. Create `hosts.ini`inside `./ansible`. Refer to `hosts.ini.example` and remember to replace placeholder values with your EC2 instance's public IPv4 address and a path to your key.
3. Run the following command inside `./ansible` to execute the playbook:

   ```bash
   sudo ansible-playbook provision_efi.yaml -i hosts.ini
   ```

4. Specify path to local project directory when prompted.

### Enjoy your deployment

To see your deployment live, copy the public IPv4 address of your EC2 instance and open it in the browser.

## Run locally

1. Install and start [Docker Desktop](https://docs.docker.com/desktop/).
2. From project root directory run:

   ```bash
   docker compose up --build
   ```

3. Open <http://localhost:8000> to see it live.

## Inspect my deployment

1. Find the current IP address of my deployment inside the _About_ section at the top of this repository.
2. Execute the following command:

   ```bash
   ssh -i /path/to/id_rsa_internship.pem ubuntu@<IPv4>
   ```

   ... replacing the placeholder with the appropriate IP address.
