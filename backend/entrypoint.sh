#!/bin/sh
alembic upgrade head
python -m classflow.presentation.api.main