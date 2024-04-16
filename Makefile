init:
	# git flow init
	cp docker/config/python.example.env docker/config/python.env
	# ln -nfs $(PWD)/.githooks/pre-push.sh .git/hooks/pre-push
	# ln -nfs $(PWD)/.githooks/pre-commit.sh .git/hooks/pre-commit
	# ln -nfs $(PWD)/.githooks/bump-version.sh .git/hooks/post-flow-release-start
	# ln -nfs $(PWD)/.githooks/bump-version.sh .git/hooks/post-flow-hotfix-start
	mkdir -p src/media
	mkdir -p src/static
	docker-compose up -d
	cd frontend && npm install && npm run dev

test:
	docker-compose run --rm python test
	cd frontend && npm run test

fixcode:
	docker-compose exec python black --exclude "/(\.eggs|\.git|\.hg|\.mypy_cache|\.nox|\.tox|\.venv|_build|buck-out|build|dist|migrations)/" ./

fixtree:
	docker-compose exec python bash -c "python manage.py fixtree"

translate:
	docker-compose exec python bash -c "python manage.py makemessages -l sv_SE --ignore=venv"

migrations:
	docker-compose exec python bash -c "python manage.py makemigrations"

showmigrations:
	docker-compose exec python bash -c "python manage.py migrate --plan"

migrate:
	docker-compose exec python bash -c "python manage.py migrate"

coverage:
	docker-compose exec python coverage run -m pytest --ds=pipit.settings.test
	docker-compose exec python coverage html

typecheck:
	docker-compose run --rm python typecheck
