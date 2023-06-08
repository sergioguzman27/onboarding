# Onboarding

[![PyPI version](https://badge.fury.io/py/pandas.svg)](https://badge.fury.io/py/pandas)
[![npm version](https://badge.fury.io/js/graphql.svg)](https://badge.fury.io/js/graphql)

Este repositorio contiene el backend y frontend para el proyecto de Onboarding en ILU.

## Librerías y dependencias utilizadas
- [Serverless Framework](https://www.serverless.com/framework/docs) - Framework para integrar arquitecturas Serverless con AWS.
- [Python 3.9](https://www.python.org/downloads/release/python-390/) - Lenguaje utilizado para el backend.
- [Conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/windows.html) - Herramienta utilizada para manejar ambientes virtuales de python e instalar dependencias de python con mayor facilidad, no es necesario tenerlo.
- [React](https://es.legacy.reactjs.org/docs/getting-started.html) - Librería para frontend.
- [Material UI](https://v4.mui.com/getting-started/installation/) - Librería para UI.

## Estructura del proyecto

El proyecto tiene la siguiente estructura de carpetas:

```bash
.
    ├── .github                 # Carpeta de configuración de CI/CD con Github.
    ├── api                     # Backend en python.
    │   ├── controllers         # Carpeta con los controllers de la api
    │   ├── migrations          # Carpeta con las migraciones hacia la base de datos.
    │   ├── models              # Modelos
    │   └── app.py              # Archivo principal donde se configura la api.
    ├── frontend                # Frontend en React
    │   ├── public              # Carpeta con los recursos publicos
    │   ├── src                 # Carpeta con el codigo principal del frontend
    │   └── package.json        # Archivo de dependencias
    ├── .gitignore
    └── README.md
```

## Comandos para levantar el backend

```sh
python manage.py db init
python manage.py db migrate # crear la migracion
python manage.py db upgrade # ejecutar la ultima migracion en la base de datos
python app.py               #para correr el proyecto
```
## Deploy del backend hacia AWS
```sh
npx serverless deploy --aws-profile OB
```

## Comandos para levantar el frontend
```sh
npm install
npm start
```

## Conductas utilizadas

- Clean Code: Se uso un estandar de carpetas tipo pages, components, controllers y models tanto para el backend como para el frontend con el objetivo de mantener el codigo ordenado. Además del uso de variables correctamente nombradas y entendibles a otro programador.

- Construcción de prototipos: Se realizó un prototipo en Figma [https://www.figma.com/proto/OKP1hNJmpOuiBBq0b6kS7M/Onboarding?type=design&node-id=1-2&scaling=min-zoom&page-id=0%3A1](https://www.figma.com/proto/OKP1hNJmpOuiBBq0b6kS7M/Onboarding?type=design&node-id=1-2&scaling=min-zoom&page-id=0%3A1). 

- Patrones de diseño: Al hacer uso de frameworks para backend y frontend. Se usaron patrones de diseño como, singleton para la conexión hacia la base de datos y la instancia de axios en el frontend.

- Python: El backend está construido en python.

- Html, javacript, React: El frontend está construido con estas herramientas.

- Serverless: Tanto backend como frontend están 100% serverless con AWS Lambda y S3.

- DevOps: Se implementó CI/CD para realizar despliegues automaticos tanto para el frontend como para el backend. Para el frontend se usó Github Actions y para el backend se uso Serverless Framework.

- Design Thinking: Se aplicó a través de diagramas, ver presentación adjunta en el repositorio.

- Self service: Se le dió importancia en la creación de maestros y mantenimientos para estos maestros.

- Inglés: Presentación en inglés y código escrito en su mayoría en inlés.

## URL de la aplicación

- Para la parte del frontend, la aplicación web está alojada en: http://onboarding-sg-ilu.s3-website-us-east-1.amazonaws.com/#/colaboradores

- La api está alojada en: https://20pkzn9ebg.execute-api.us-east-1.amazonaws.com/dev/api

## License

MIT
