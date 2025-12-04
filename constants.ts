import { Route } from './types';

export const WHATSAPP_NUMBER = "5547974008115";

const CONTACT_NOTE = 'Entre em contato para orçamento';

export const INITIAL_ROUTES: Route[] = [
  { id: '1', destination: 'Joinville - Aeroporto (JOI)', price: 180, note: CONTACT_NOTE },
  { id: '2', destination: 'Joinville - Cidade / Centro', price: 160, note: CONTACT_NOTE },
  { id: '3', destination: 'Corupá', price: 70, note: CONTACT_NOTE },
  { id: '4', destination: 'Guaramirim', price: 'Sob Consulta', note: CONTACT_NOTE },
  { id: '5', destination: 'Schroeder', price: 'Sob Consulta', note: CONTACT_NOTE },
  { id: '6', destination: 'Blumenau', price: 'Sob Consulta', note: CONTACT_NOTE },
  { id: '7', destination: 'Outras Cidades', price: 'Sob Consulta', note: CONTACT_NOTE },
];

export const AGENCY_NAME = "EcoDrive Agency";
export const LOCATION = "Jaraguá do Sul, SC";