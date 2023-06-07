from db import db

class ColaboradorObjetivo(db.Model):
    __tablename__ = 'ColaboradorObjetivo'
    
    id = db.Column('Id', db.Integer, primary_key=True)
    id_objetivo = db.Column('IdObjetivo', db.Integer, db.ForeignKey('PlanObjetivo.Id'), nullable=True)
    id_colaborador_onboarding = db.Column('IdColaboradorOnboarding', db.Integer, db.ForeignKey('ColaboradorOnboarding.Id'), nullable=True)
