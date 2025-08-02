// src/types/test.ts
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
  experiencia_areas: string[];
  deseos_aprendizaje: string[];
  experiencia_eventos: string[];
  fortaleza: string[];
  links: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    x?: string;
  };
  fotografia?: string;
  area_colaboracion: string[];
  habilidades_blandas: string[];
  motivacion: string[];
  taller_charla: string[];
  herramientas_tecnologias: string[];
  dias_disponibles: string[];
  horarios_disponibles: string;
}