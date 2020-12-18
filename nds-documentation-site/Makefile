-include env_make

S3_BUCKET_PATH=ids-theme-builder.niaid.nih.gov

# Cache clear parameters
paths?="/*"

.PHONY: build deploy

default: build

build:
	gulp buildProd

deploy: build
	aws s3 sync ./public_html s3://$(S3_BUCKET_PATH) --exclude ".git/*" --delete

# aws s3 sync ./public_html s3://ids-theme-builder.niaid.nih.gov --exclude ".git/*" --delete