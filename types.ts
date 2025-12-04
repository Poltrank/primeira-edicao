
export interface Route {
  id: string;
  destination: string;
  price: number | 'Sob Consulta';
  note?: string;
}

export interface BookingFormData {
  name: string;
  needsTrunk: string;
  pickupTime: string;
  pickupStreet: string;
  pickupNumber: string;
  pickupDistrict: string;
  destStreet: string;
  destNumber: string;
  destDistrict: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface User {
  id: string;
  name: string;
  whatsapp: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userWhatsapp: string;
  date: string;
  details: BookingFormData;
  status: 'Pendente' | 'Realizada' | 'Cancelada';
}
