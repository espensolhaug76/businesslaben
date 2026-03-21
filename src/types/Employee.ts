// --- Employee types ---

export const EmployeeRole = {
  Sales: 'sales',
  Marketing: 'marketing',
  Finance: 'finance',
  Manager: 'manager',
  Support: 'support',
} as const
export type EmployeeRole = (typeof EmployeeRole)[keyof typeof EmployeeRole]

export const EmployeeLevel = {
  Junior: 'junior',
  Senior: 'senior',
  Expert: 'expert',
} as const
export type EmployeeLevel = (typeof EmployeeLevel)[keyof typeof EmployeeLevel]

export interface Employee {
  id: string
  name: string
  role: EmployeeRole
  level: EmployeeLevel
  salary: number
  efficiency: number
  active: boolean
}
