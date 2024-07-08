import { Suspense } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { multiLazy } from '../utils/multyLazy'
import RoutePaths from './Routes'
import { DraggableTopBar } from '@renderer/components/DraggableTopBar'

const AppRouter = () => {
  const [HomePage, CreateConversionPage] = multiLazy([
    () => import('../pages/HomePage'),
    () => import('../pages/CreateConversionPage')
  ])

  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <DraggableTopBar />
              <Outlet />
            </>
          }
        >
          <Route path={RoutePaths.HOME} element={<HomePage />} />
          <Route path={RoutePaths.CREATE} element={<CreateConversionPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRouter
