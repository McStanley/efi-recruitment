variable "region" {
    description = "Enter your desired AWS region (eu-central-1)"
}

variable "key_name" {
    description = "Enter the name of your AWS key pair (efi-recruitment-key)"
}

variable "instance_name" {
    description = "Choose a name of the EC2 instance (efi-recruitment-instance)"
}

variable "sg_name" {
    description = "Choose a name of the security group (efi-recruitment-sg)"
}

provider "aws" {
    region = var.region
}

resource "aws_security_group" "efi-sg" {
  name = var.sg_name

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9000
    to_port     = 9000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "efi-instance" {
    ami = "ami-01e444924a2233b07"
    instance_type = "t2.micro"
    key_name = var.key_name
    security_groups = [ var.sg_name ]

    tags = {
            Name = var.instance_name
    }
}
