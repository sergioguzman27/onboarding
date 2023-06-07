from db import db

class PlanObjetivo(db.Model):
    __tablename__ = 'PlanObjetivo'
    
    id = db.Column('Id', db.Integer, primary_key=True)
    id_plan = db.Column('IdPlan', db.Integer, db.ForeignKey('Plan.Id'), nullable=True)
    nombre = db.Column('Nombre', db.String(150), nullable=True)
