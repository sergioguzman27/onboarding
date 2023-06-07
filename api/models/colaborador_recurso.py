from db import db

class ColaboradorRecurso(db.Model):
    __tablename__ = 'ColaboradorRecurso'
    
    id = db.Column('Id', db.Integer, primary_key=True)
    id_recurso = db.Column('IdRecurso', db.Integer, db.ForeignKey('Recurso.Id'), nullable=True)
    id_colaborador_onboarding = db.Column('IdColaboradorOnboarding', db.Integer, db.ForeignKey('ColaboradorOnboarding.Id'), nullable=True)
    entregado = db.Column('Entregado', db.Integer, default=0)
    fecha_entregado = db.Column('FechaEntregado', db.DateTime, nullable=True)
