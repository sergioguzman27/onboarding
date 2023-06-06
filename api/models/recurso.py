from db import db

class Recurso(db.Model):
    __tablename__ = 'Recurso'
    
    id = db.Column('Id', db.Integer, primary_key=True)
    descripcion = db.Column('Descripcion', db.String(150), nullable=True)
    tipo = db.Column('Tipo', db.Integer, default=1)
