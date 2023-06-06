from db import db

class Actitud(db.Model):
    __tablename__ = 'Actitud'
    
    id = db.Column('Id', db.Integer, primary_key=True)
    nombre = db.Column('Nombre', db.String(150), nullable=True)
    descripcion = db.Column('Descripcion', db.String(150), nullable=True)
    peso = db.Column('Peso', db.Float, nullable=True)
