import { Genero } from "@/@types";

export function formatGeneros(generos: Genero[]): string {
  return generos.toString().replaceAll(",", ", ");
}
