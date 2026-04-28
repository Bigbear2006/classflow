all: run

run:
	python -m classflow.presentation.api.main

test:
	python tests/test_main.py

lint:
	ruff format
	ruff check --fix
	ruff format
