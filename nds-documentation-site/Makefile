-include env_make

S3_BUCKET_PATH=nds.niaid.nih.gov

# Cache clear parameters
paths?="/*"

.PHONY: build deploy

default: build

build:
	gulp buildProd

deploy-staging: build
	aws s3 sync ./public_html s3://staging.nds.niaid.nih.gov --exclude ".git/*" --delete

deploy-prod: build
	aws s3 sync ./public_html s3://nds.niaid.nih.gov --exclude ".git/*" --delete

# THESE COMMANDS ARE NOT RECOMMENDED - USE CAREFULLY
deploy-all: build
	aws s3 sync ./public_html s3://staging.nds.niaid.nih.gov --exclude ".git/*" --delete
	aws s3 sync ./public_html s3://nds.niaid.nih.gov --exclude ".git/*" --delete

deploy-only:
	aws s3 sync ./public_html s3://staging.nds.niaid.nih.gov --exclude ".git/*" --delete
	aws s3 sync ./public_html s3://nds.niaid.nih.gov --exclude ".git/*" --delete