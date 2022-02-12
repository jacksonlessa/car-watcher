import React from 'react';
import { render } from '@testing-library/react';
import ListVehicles from './ListVehicles';
import { Vehicle } from '../../data/vehicles';


function mockFetch(data: any) {
  return jest.spyOn(window, 'fetch').mockResolvedValue(new Response(JSON.stringify(data)));
}

beforeEach(() => mockFetch([]));


test('page should have a title of Vehicles List', async () => {
  const { findByText } = render(<ListVehicles />);
  await findByText('Vehicles List');
});

test('when there are no vehicles, a no vehicles message should show', async () => {
  const { findByText } = render(<ListVehicles />);
  await findByText('No vehicles, add your first vehicle!')
});


test('when vehicles is loaded with vehicle, then the vehicle should be in the list', async () => {
  const vehiclesList: Vehicle[] = [
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
  ]
  mockFetch(vehiclesList);
  
  const { findByText } = render(<ListVehicles />);
  findByText(vehiclesList[0].brand+" - "+vehiclesList[0].model);
  findByText(vehiclesList[1].brand+" - "+vehiclesList[1].model);
});