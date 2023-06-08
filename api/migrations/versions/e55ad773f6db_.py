"""empty message

Revision ID: e55ad773f6db
Revises: 478e3bcf7d11
Create Date: 2023-06-08 08:13:37.033295

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'e55ad773f6db'
down_revision = '478e3bcf7d11'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('ColaboradorOnboarding', sa.Column('ResultadoSkill1', sa.Float(), nullable=True))
    op.add_column('ColaboradorOnboarding', sa.Column('ResultadoSkill2', sa.Float(), nullable=True))
    op.add_column('ColaboradorOnboarding', sa.Column('ResultadoWill1', sa.Float(), nullable=True))
    op.add_column('ColaboradorOnboarding', sa.Column('ResultadoWill2', sa.Float(), nullable=True))
    op.drop_column('ColaboradorOnboarding', 'ResultadoEvaluacion2')
    op.drop_column('ColaboradorOnboarding', 'ResultadoEvaluacion1')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('ColaboradorOnboarding', sa.Column('ResultadoEvaluacion1', mysql.FLOAT(), nullable=True))
    op.add_column('ColaboradorOnboarding', sa.Column('ResultadoEvaluacion2', mysql.FLOAT(), nullable=True))
    op.drop_column('ColaboradorOnboarding', 'ResultadoWill2')
    op.drop_column('ColaboradorOnboarding', 'ResultadoWill1')
    op.drop_column('ColaboradorOnboarding', 'ResultadoSkill2')
    op.drop_column('ColaboradorOnboarding', 'ResultadoSkill1')
    # ### end Alembic commands ###
