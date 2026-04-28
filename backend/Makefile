all: run

run:
	python -m app.presentation.api.main

test:
	python tests/test_main.py

lint:
	ruff format
	ruff check --fix
	ruff format
