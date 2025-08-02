// src/types.ts

export interface Dev {
  id: number;
  nombre_completo: string;
  correo_electronico: string;
  numero_contacto: string;
  sobre_ti: string;
  ocupacion_actual: string;
  estudios: {
    carrera: string;
    universidad: string;
  };
  trabajo: {
    cargo: string;
    empresa: string;
  };
  links: {
    instagram: string;
    linkedin: string;
    facebook: string;
    x: string;
  };
  fotografia: string;
  area_colaboracion: string;
  experiencia_areas: string[];
  deseos_aprendizaje: string | string[];
  habilidades_blandas: string[];
  herramientas_tecnologias: string[];
  experiencia_eventos: string;
  fortaleza: string;
  taller_charla: string[];  
  dias_disponibles: string[];
  horarios_disponibles: string;
  asistido_eventos: string;
  conocimiento_comunidad: string;
  motivacion: string[];
}
