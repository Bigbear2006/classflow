all: run

run:
	python -m src.app.presentation.api.main

test:
	python tests/test_main.py

lint:
	ruff format
	ruff check --fix
	ruff format
