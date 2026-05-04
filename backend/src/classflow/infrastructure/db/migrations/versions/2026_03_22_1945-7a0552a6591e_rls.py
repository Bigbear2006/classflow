"""RLS

Revision ID: 7a0552a6591e
Revises: 22c75be5848e
Create Date: 2026-03-22 19:45:37.621461

"""

from collections.abc import Sequence

from alembic import context, op

# revision identifiers, used by Alembic.
revision: str = '7a0552a6591e'
down_revision: str | Sequence[str] | None = '22c75be5848e'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


# Alembic don't provide context.config when generating new migration
if hasattr(context, 'config'):
    section = context.config.config_ini_section
    DB_NAME = context.config.get_section_option(section, 'DB_NAME')
    APP_USER = context.config.get_section_option(section, 'APP_USER')
    APP_PASSWORD = context.config.get_section_option(section, 'APP_PASSWORD')
else:
    DB_NAME = ''
    DB_USER = ''
    DB_PASSWORD = ''


RLS_TABLES = [
    # 'organizations',
    # 'users',
    # 'organization_members',
    'subjects',
    'courses',
    'course_teachers',
    'course_teacher_students',
    'addresses',
    'cabinets',
    'groups',
    'student_groups',
    'lessons',
    'attendance',
    'feedback',
    'payments',
]


def upgrade() -> None:
    op.execute(
        'DO $$ BEGIN '
        f"IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '{APP_USER}') THEN "
        f"CREATE USER {APP_USER} WITH PASSWORD '{APP_PASSWORD}'; "
        'END IF; '
        'END $$',
    )

    op.execute(f'GRANT CONNECT ON DATABASE {DB_NAME} TO {APP_USER}')
    op.execute(f'GRANT USAGE ON SCHEMA public TO {APP_USER}')
    op.execute(
        f'GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO {APP_USER}',
    )
    op.execute(
        f'GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO {APP_USER}',
    )

    policy = (
        "organization_id = current_setting('app.current_org_id', true)::bigint"
    )
    for table in RLS_TABLES:
        op.execute(f'ALTER TABLE {table} ENABLE ROW LEVEL SECURITY')
        op.execute(
            f'CREATE POLICY {table}_{APP_USER}_policy ON {table} '
            f'AS PERMISSIVE FOR ALL TO {APP_USER} '
            f'USING ({policy})',
        )


def downgrade() -> None:
    for table in reversed(RLS_TABLES):
        op.execute(
            f'DROP POLICY IF EXISTS {table}_{APP_USER}_policy ON {table}',
        )
        op.execute(f'ALTER TABLE {table} DISABLE ROW LEVEL SECURITY')

    op.execute(
        f'REVOKE SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public FROM {APP_USER}',
    )
    op.execute(
        f'REVOKE USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public FROM {APP_USER}',
    )
    op.execute(f'REVOKE USAGE ON SCHEMA public FROM {APP_USER}')
    op.execute(f'REVOKE CONNECT ON DATABASE {DB_NAME} FROM {APP_USER}')
    op.execute(f'DROP USER IF EXISTS {APP_USER}')
