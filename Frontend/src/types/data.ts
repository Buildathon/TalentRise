// src/types/types.ts
export interface Dev {
  herramientas_tecnologias: any;
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
  experiencia_areas?: string[]; // Propiedad opcional
  deseos_aprendizaje?: string[]; // Propiedad opcional
  experiencia_eventos?: string[]; // Propiedad opcional
  fortaleza?: string[]; // Propiedad opcional
  links?: string[]; // Propiedad opcional
  fotografia?: string; // Propiedad opcional
  area_colaboracion?: string[]; // Propiedad opcional
  habilidades_blandas?: string[]; // Propiedad opcional
  motivacion?: string[]; // Propiedad opcional
}