from db import db

class PlanActividad(db.Model):
    __tablename__ = 'PlanActividad'
    
    id = db.Column('Id', db.Integer, primary_key=True)
    id_plan = db.Column('IdPlan', db.Integer, db.ForeignKey('Plan.Id'), nullable=True)
    id_objetivo = db.Column('IdObjetivo', db.Integer, db.ForeignKey('PlanObjetivo.Id'), nullable=True)
    nombre = db.Column('Nombre', db.String(150), nullable=True)
