from dataclasses import dataclass

@dataclass
class ApplicationConfig(object):
    # DATABASE
    DATABASE_URI:str= "postgresql://postgres:sujanix#123@localhost:5432/nlp"