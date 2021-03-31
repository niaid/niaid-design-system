-include env_make

S3_BUCKET_PATH=nds.niaid.nih.gov

# Cache clear parameters
paths?="/*"

buildStaging:
	gulp buildStaging

buildProd:
	gulp buildProd

deploy-staging: buildStaging
	aws s3 sync ./public_html s3://staging.nds.niaid.nih.gov --exclude ".git/*" --delete

deploy-prod: buildProd
	aws s3 sync ./public_html s3://nds.niaid.nih.gov --exclude ".git/*" --delete