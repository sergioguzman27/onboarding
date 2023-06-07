from db import db

class ColaboradorActividad(db.Model):
    __tablename__ = 'ColaboradorActividad'
    
    id = db.Column('Id', db.Integer, primary_key=True)
    id_actividad = db.Column('IdActividad', db.Integer, db.ForeignKey('PlanActividad.Id'), nullable=True)
    id_colaborador_onboarding = db.Column('IdColaboradorOnboarding', db.Integer, db.ForeignKey('ColaboradorOnboarding.Id'), nullable=True)
    resultado_evaluacion1 = db.Column('ResultadoEvaluacion1', db.Float, nullable=True)
    resultado_evaluacion2 = db.Column('ResultadoEvaluacion2', db.Float, nullable=True)
