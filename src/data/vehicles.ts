export interface Vehicle {
  type: string;
  brand: string;
  model: string;
  mileage: number
  year: number
  plate: string;
  id: number;
}

const vehicles: Vehicle[] = [
  {
    type: 'car',
    brand: 'Peugeot',
    model: '206',
    mileage: 150000,
    year: 2006,
    plate: 'AAA-0000',
    id: 0
  },
  {
    type: 'motorcycle',
    brand: 'Honda',
    model: 'CG',
    mileage: 82000,
    year: 2012,
    plate: 'BBB-1111',
    id: 1
  },
];

export const getVehicles = () => vehicles;

export const getVehicle = (id: number) => vehicles.find(m => m.id === id);
