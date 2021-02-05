-include env_make

S3_BUCKET_PATH=nds.niaid.nih.gov

# Cache clear parameters
paths?="/*"

.PHONY: build deploy

default: build

build:
	gulp buildProd

deploy-staging: build
	aws s3 sync ./public_html s3://$(S3_BUCKET_PATH)/staging --exclude ".git/*" --delete

deploy-prod: build
	aws s3 sync ./public_html s3://$(S3_BUCKET_PATH)/prod --exclude ".git/*" --delete

# THIS COMMAND IS NOT RECOMMENDED - USE CAREFULLY
deploy-all: build
	aws s3 sync ./public_html s3://$(S3_BUCKET_PATH)/staging --exclude ".git/*" --delete
	aws s3 sync ./public_html s3://$(S3_BUCKET_PATH)/prod --exclude ".git/*" --delete