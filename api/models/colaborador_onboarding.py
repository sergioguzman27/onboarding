from db import db

class ColaboradorOnboarding(db.Model):
    __tablename__ = 'ColaboradorOnboarding'
    
    id = db.Column('Id', db.Integer, primary_key=True)
    id_plan = db.Column('IdPlan', db.Integer, db.ForeignKey('Plan.Id'), nullable=True)
    id_colaborador = db.Column('IdColaborador', db.Integer, db.ForeignKey('Colaborador.Id'), nullable=True)
    resultado_skill1 = db.Column('ResultadoSkill1', db.Float, nullable=True)
    resultado_skill2 = db.Column('ResultadoSkill2', db.Float, nullable=True)
    resultado_will1 = db.Column('ResultadoWill1', db.Float, nullable=True)
    resultado_will2 = db.Column('ResultadoWill2', db.Float, nullable=True)
    fecha_evaluacion1 = db.Column('FechaEvaluacion1', db.DateTime, nullable=True)
    fecha_evaluacion2 = db.Column('FechaEvaluacion2', db.DateTime, nullable=True)
    comentario_puntos_fuertes1 = db.Column('ComentarioPuntosFuertes1', db.String(300), nullable=True)
    comentario_puntos_fuertes2 = db.Column('ComentarioPuntosFuertes2', db.String(300), nullable=True)
    comentario_puntos_desarrollar1 = db.Column('ComentarioPuntosDesarrollar1', db.String(300), nullable=True)
    comentario_puntos_desarrollar2 = db.Column('ComentarioPuntosDesarrollar2', db.String(300), nullable=True)
    comentario_evaluador1 = db.Column('ComentarioEvaluador1', db.String(300), nullable=True)
    comentario_evaluador2 = db.Column('ComentarioEvaluador2', db.String(300), nullable=True)
    comentario_evaluado1 = db.Column('ComentarioEvaluado1', db.String(300), nullable=True)
    comentario_evaluado2 = db.Column('ComentarioEvaluado2', db.String(300), nullable=True)
    