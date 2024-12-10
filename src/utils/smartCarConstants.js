//TODO: find a better way to manage VEHICLE_COMMANDS_OBJECT and VEHICLE_ACTIONS_OBJECT
// they have the same information but I create this two objects to make the code more easy to do validations
export const AVAILABLE_VEHICLES_IDS = ['1234', '1235']
export const VEHICLE_COMMANDS = ['START_VEHICLE', 'STOP_VEHICLE']
export const VEHICLE_COMMANDS_OBJECT = {
  START_VEHICLE: 'START_VEHICLE',
  STOP_VEHICLE: 'STOP_VEHICLE',
}
export const VEHICLE_ACTIONS = ['START', 'STOP']
export const VEHICLE_ACTIONS_OBJECT = {
  START: 'START',
  STOP: 'STOP',
}

export const VEHICLE_ACTIONS_RESULT = {
  EXECUTED: 'EXECUTED',
  FAILED: 'FAILED',
}
