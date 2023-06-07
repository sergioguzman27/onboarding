"""empty message

Revision ID: 478e3bcf7d11
Revises: 39279d2a13d6
Create Date: 2023-06-07 16:56:59.526843

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '478e3bcf7d11'
down_revision = '39279d2a13d6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('Colaborador', sa.Column('Puesto', sa.String(length=150), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('Colaborador', 'Puesto')
    # ### end Alembic commands ###