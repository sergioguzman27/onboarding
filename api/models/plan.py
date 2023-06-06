from db import db

class Plan(db.Model):
    __tablename__ = 'Plan'
    
    id = db.Column('Id', db.Integer, primary_key=True)
    puesto = db.Column('Puesto', db.String(150), nullable=True)
    fecha = db.Column('Fecha', db.DateTime, nullable=True)
    peso_skill = db.Column('PesoSkill', db.Float, nullable=True)
    peso_will = db.Column('PesoWill', db.Float, nullable=True)
