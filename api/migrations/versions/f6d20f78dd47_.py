"""empty message

Revision ID: f6d20f78dd47
Revises: 4614dcf64fdc
Create Date: 2023-06-06 17:01:17.718732

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f6d20f78dd47'
down_revision = '4614dcf64fdc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Actitud',
    sa.Column('Id', sa.Integer(), nullable=False),
    sa.Column('Nombre', sa.String(length=150), nullable=True),
    sa.Column('Descripcion', sa.String(length=150), nullable=True),
    sa.Column('Peso', sa.Float(), nullable=True),
    sa.PrimaryKeyConstraint('Id')
    )
    op.create_table('Colaborador',
    sa.Column('Id', sa.Integer(), nullable=False),
    sa.Column('Codigo', sa.Integer(), nullable=True),
    sa.Column('Nombre', sa.String(length=150), nullable=True),
    sa.Column('FechaAlta', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('Id')
    )
    op.create_table('Nivel',
    sa.Column('Id', sa.Integer(), nullable=False),
    sa.Column('Etiqueta', sa.String(length=150), nullable=True),
    sa.Column('Porcentaje', sa.Float(), nullable=True),
    sa.Column('Tipo', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('Id')
    )
    op.create_table('Objetivo',
    sa.Column('Id', sa.Integer(), nullable=False),
    sa.Column('Nombre', sa.String(length=150), nullable=True),
    sa.PrimaryKeyConstraint('Id')
    )
    op.create_table('Plan',
    sa.Column('Id', sa.Integer(), nullable=False),
    sa.Column('Puesto', sa.String(length=150), nullable=True),
    sa.Column('Fecha', sa.DateTime(), nullable=True),
    sa.Column('PesoSkill', sa.Float(), nullable=True),
    sa.Column('PesoWill', sa.Float(), nullable=True),
    sa.PrimaryKeyConstraint('Id')
    )
    op.create_table('Actividad',
    sa.Column('Id', sa.Integer(), nullable=False),
    sa.Column('Nombre', sa.String(length=150), nullable=True),
    sa.Column('IdObjetivo', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['IdObjetivo'], ['Objetivo.Id'], ),
    sa.PrimaryKeyConstraint('Id')
    )
    op.create_table('PlanActitud',
    sa.Column('Id', sa.Integer(), nullable=False),
    sa.Column('IdPlan', sa.Integer(), nullable=True),
    sa.Column('IdActitud', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['IdActitud'], ['Actitud.Id'], ),
    sa.ForeignKeyConstraint(['IdPlan'], ['Plan.Id'], ),
    sa.PrimaryKeyConstraint('Id')
    )
    op.create_table('PlanObjetivo',
    sa.Column('Id', sa.Integer(), nullable=False),
    sa.Column('IdPlan', sa.Integer(), nullable=True),
    sa.Column('IdObjetivo', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['IdObjetivo'], ['Objetivo.Id'], ),
    sa.ForeignKeyConstraint(['IdPlan'], ['Plan.Id'], ),
    sa.PrimaryKeyConstraint('Id')
    )
    op.create_table('PlanRecurso',
    sa.Column('Id', sa.Integer(), nullable=False),
    sa.Column('IdPlan', sa.Integer(), nullable=True),
    sa.Column('IdRecurso', sa.Integer(), nullable=True),
    sa.Column('Responsable', sa.String(length=150), nullable=True),
    sa.ForeignKeyConstraint(['IdPlan'], ['Plan.Id'], ),
    sa.ForeignKeyConstraint(['IdRecurso'], ['Recurso.Id'], ),
    sa.PrimaryKeyConstraint('Id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('PlanRecurso')
    op.drop_table('PlanObjetivo')
    op.drop_table('PlanActitud')
    op.drop_table('Actividad')
    op.drop_table('Plan')
    op.drop_table('Objetivo')
    op.drop_table('Nivel')
    op.drop_table('Colaborador')
    op.drop_table('Actitud')
    # ### end Alembic commands ###
