from db import db

class PlanRecurso(db.Model):
    __tablename__ = 'PlanRecurso'
    
    id = db.Column('Id', db.Integer, primary_key=True)
    id_plan = db.Column('IdPlan', db.Integer, db.ForeignKey('Plan.Id'), nullable=True)
    id_recurso = db.Column('IdRecurso', db.Integer, db.ForeignKey('Recurso.Id'), nullable=True)
    responsable = db.Column('Responsable', db.String(150), nullable=True)
