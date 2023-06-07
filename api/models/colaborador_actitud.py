from db import db

class ColaboradorActitud(db.Model):
    __tablename__ = 'ColaboradorActitud'
    
    id = db.Column('Id', db.Integer, primary_key=True)
    id_actitud = db.Column('IdActitud', db.Integer, db.ForeignKey('PlanActitud.Id'), nullable=True)
    id_colaborador_onboarding = db.Column('IdColaboradorOnboarding', db.Integer, db.ForeignKey('ColaboradorOnboarding.Id'), nullable=True)
    resultado_evaluacion1 = db.Column('ResultadoEvaluacion1', db.Float, nullable=True)
    resultado_evaluacion2 = db.Column('ResultadoEvaluacion2', db.Float, nullable=True)
