include .env

dump-local-db:
	PGPASSWORD="strapi"
	echo "dumping local postgres db"
	pg_dump -Fc --no-acl --no-owner -h localhost -p 5433  -U strapi strapi > sbb.dump

db-to-bucket:
	echo "Exporting dump to bucket"
	aws s3 cp $(PWD)/sbb.dump s3://strapi-sbb/db-backups/sbb.dump --endpoint-url=https://$(SBB_BUCKET_URL)

presigned-url:
	echo "Making presigned URL"
	aws s3 presign s3://strapi-sbb/db-backups/sbb.dump --endpoint-url=https://$(SBB_BUCKET_URL)

db-to-heroku:
	$(eval PRESIGNED_URL=$(shell aws s3 presign s3://strapi-sbb/db-backups/sbb.dump --endpoint-url=https://$(SBB_BUCKET_URL)))
	heroku pg:backups:restore '$(PRESIGNED_URL)' DATABASE_URL -a strapi-sbb

db-to-heroku-prod:
	$(eval PRESIGNED_URL=$(shell aws s3 presign s3://strapi-sbb/db-backups/sbb.dump --endpoint-url=https://$(SBB_BUCKET_URL)))
	heroku pg:backups:restore '$(PRESIGNED_URL)' HEROKU_POSTGRESQL_COBALT_URL -a strapi-sbb-prod

heroku-staging-push:
	git push heroku-staging staging:master