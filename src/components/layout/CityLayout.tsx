import { Outlet } from 'react-router-dom'
import Espen from '../ui/Espen'

export default function CityLayout() {
  return (
    <>
      <Outlet />
      <Espen />
    </>
  )
}
