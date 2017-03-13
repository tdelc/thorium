export default `
type Navigation {
  id: ID
  simulatorId: ID
  type: String
  power: Power
  destination: Location
  calculated: Location
  damage: Damage 
}

type Location {
  name: String
  xCoord: Float
  yCoord: Float
  zCoord: Float
}
`;
